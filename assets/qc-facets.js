/* QuillCommerce facets (SPEC-009): apply-on-change enhancement.
   Filter/sort state is URL-first; without this file the Apply button
   performs the identical navigation. With it, changes fetch the same
   URL and swap the results in place — no full page reload. */

let qcFacetsPushed = false;
window.addEventListener('popstate', () => {
  if (qcFacetsPushed) location.reload();
});

if (!customElements.get('qc-facets')) {
  customElements.define(
    'qc-facets',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        /* every change auto-applies below, so the Apply fallback button
           is redundant noise once JS is running — CSS hides it */
        this.classList.add('qc-facets--enhanced');
        this.form = this.querySelector('form');
        this.form?.addEventListener(
          'change',
          () => this.apply(),
          { signal }
        );

        /* desktop sidebar: the outer panel disclosure stays open (its
           summary is inert via CSS at this width) */
        this.panel = this.querySelector('.qc-facets__panel');
        if (this.panel) {
          this.mq = window.matchMedia('(min-width: 990px)');
          const sync = () => {
            if (this.mq.matches) this.panel.open = true;
          };
          sync();
          this.mq.addEventListener('change', sync, { signal });
          this.panel.addEventListener('toggle', sync, { signal });
        }
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      async apply() {
        const url = `${location.pathname}?${new URLSearchParams(new FormData(this.form))}`;
        const container = this.closest('.qc-collection, .qc-search');
        if (!container) {
          this.form.requestSubmit();
          return;
        }
        /* refocus the control the shopper just used after the swap */
        const active = document.activeElement;
        const refocus =
          active?.name != null && container.contains(active)
            ? `[name="${CSS.escape(active.name)}"][value="${CSS.escape(active.value || '')}"]`
            : null;

        container.setAttribute('aria-busy', 'true');
        this.swapAbort?.abort();
        this.swapAbort = new AbortController();
        try {
          const res = await fetch(url, { signal: this.swapAbort.signal });
          if (!res.ok) throw new Error();
          const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
          const marker = container.classList.contains('qc-search') ? '.qc-search' : '.qc-collection';
          const next = doc.querySelector(marker);
          if (!next) throw new Error();
          container.replaceWith(next);
          history.pushState({ qcFacets: true }, '', url);
          qcFacetsPushed = true;
          if (refocus) next.querySelector(refocus)?.focus({ preventScroll: true });
        } catch (err) {
          if (err.name === 'AbortError') return;
          /* the URL is the source of truth — fall back to navigating */
          location.assign(url);
        }
      }
    }
  );
}

/* Generic submit-on-change wrapper (utility bar localization forms). */
if (!customElements.get('qc-auto-form')) {
  customElements.define(
    'qc-auto-form',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        this.querySelector('form')?.addEventListener(
          'change',
          (e) => e.currentTarget.submit(),
          { signal: this.abort.signal }
        );
      }

      disconnectedCallback() {
        this.abort.abort();
      }
    }
  );
}
