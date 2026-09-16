/* QuillCommerce facets (SPEC-009): submit-on-change enhancement only.
   Filter/sort state is URL-first; without this file the Apply button
   performs the identical navigation. */

if (!customElements.get('qc-facets')) {
  customElements.define(
    'qc-facets',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.form = this.querySelector('form');
        this.form?.addEventListener(
          'change',
          () => this.form.requestSubmit(),
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
