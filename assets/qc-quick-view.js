/* QuillCommerce quick view (SPEC-006). Upgrades card "Choose options"
   links to open a shared native <dialog> filled via the Section
   Rendering API. No-JS baseline: the link navigates to the product. */

function announce(message) {
  document.dispatchEvent(new CustomEvent('qc:announce', { detail: { message } }));
}

function getDialog() {
  let dialog = document.getElementById('qc-quick-view-dialog');
  if (dialog) return dialog;

  dialog = document.createElement('dialog');
  dialog.id = 'qc-quick-view-dialog';
  dialog.className = 'qc-quick-view';
  dialog.setAttribute('scroll-lock', '');
  dialog.setAttribute('aria-labelledby', 'qc-quick-view-title');

  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'qc-btn qc-quick-view__close';
  close.setAttribute('aria-label', dialog.dataset.closeLabel || 'Close');
  close.addEventListener('click', () => dialog.close());

  const content = document.createElement('div');
  content.className = 'qc-quick-view__content';

  dialog.append(close, content);
  dialog.addEventListener('close', () => {
    dialog.opener?.focus();
    dialog.opener = null;
  });
  /* backdrop click closes */
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  document.body.append(dialog);
  return dialog;
}

if (!customElements.get('qc-quick-view')) {
  customElements.define(
    'qc-quick-view',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        this.link = this.querySelector('a[href]');
        if (!this.link) return;
        this.link.addEventListener('click', (e) => this.open(e), {
          signal: this.abort.signal,
        });
      }

      disconnectedCallback() {
        this.abort.abort();
        this.inflight?.abort();
      }

      async open(event) {
        event.preventDefault();
        const dialog = getDialog();
        const closeBtn = dialog.querySelector('.qc-quick-view__close');
        closeBtn.setAttribute('aria-label', this.dataset.closeLabel || 'Close');
        const content = dialog.querySelector('.qc-quick-view__content');

        dialog.opener = this.link;
        content.textContent = this.dataset.loadingLabel || '';
        if (!dialog.open) dialog.showModal();
        announce(this.dataset.loadingLabel || '');

        this.inflight?.abort();
        this.inflight = new AbortController();

        const url = new URL(this.link.href, location.origin);
        url.searchParams.set('section_id', 'qc-quick-view');

        try {
          const res = await fetch(url, { signal: this.inflight.signal });
          if (!res.ok) throw new Error();
          const html = await res.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const inner = doc.querySelector('.qc-quick-view__inner');
          if (!inner) throw new Error();
          content.replaceChildren(inner);
        } catch (err) {
          if (err.name === 'AbortError') return;
          const p = document.createElement('p');
          p.className = 'qc-field__error';
          p.setAttribute('role', 'alert');
          p.textContent = this.dataset.errorLabel || '';
          const fallback = document.createElement('a');
          fallback.className = 'qc-btn qc-btn--quiet';
          fallback.href = this.link.href;
          fallback.textContent = this.dataset.detailsLabel || this.link.textContent;
          content.replaceChildren(p, fallback);
          announce(this.dataset.errorLabel || '');
        }
      }
    }
  );
}
