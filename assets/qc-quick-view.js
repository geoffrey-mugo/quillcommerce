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

/* The section render is the whole cost of opening a quick view, so it
   is warmed the moment the shopper shows intent (hover / focus / first
   touch) and memoised for the session — reopening is instant. */
const qvCache = new Map();

function fetchQuickView(href) {
  const url = new URL(href, location.origin);
  url.searchParams.set('section_id', 'qc-quick-view');
  const key = url.toString();
  if (!qvCache.has(key)) {
    const promise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.text();
      })
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const inner = doc.querySelector('.qc-quick-view__inner');
        if (!inner) throw new Error();
        return inner.outerHTML;
      })
      .catch((err) => {
        qvCache.delete(key); /* never memoise a failure */
        throw err;
      });
    qvCache.set(key, promise);
  }
  return qvCache.get(key);
}

if (!customElements.get('qc-quick-view')) {
  customElements.define(
    'qc-quick-view',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.link = this.querySelector('a[href]');
        if (!this.link) return;
        const warm = () => {
          fetchQuickView(this.link.href).catch(() => {});
        };
        this.link.addEventListener('pointerenter', warm, { once: true, signal });
        this.link.addEventListener('focus', warm, { once: true, signal });
        this.link.addEventListener('touchstart', warm, { once: true, passive: true, signal });
        this.link.addEventListener('click', (e) => this.open(e), { signal });
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      async open(event) {
        event.preventDefault();
        const dialog = getDialog();
        const closeBtn = dialog.querySelector('.qc-quick-view__close');
        closeBtn.setAttribute('aria-label', this.dataset.closeLabel || 'Close');
        const content = dialog.querySelector('.qc-quick-view__content');

        dialog.opener = this.link;
        const requested = this.link.href;
        dialog.dataset.qcFor = requested;
        content.textContent = this.dataset.loadingLabel || '';
        if (!dialog.open) dialog.showModal();
        announce(this.dataset.loadingLabel || '');

        try {
          const html = await fetchQuickView(requested);
          /* the shopper may have opened a different card meanwhile */
          if (dialog.dataset.qcFor !== requested) return;
          content.innerHTML = html;
        } catch {
          if (dialog.dataset.qcFor !== requested) return;
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
