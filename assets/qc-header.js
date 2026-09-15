/* QuillCommerce header behavior (SPEC-007): disclosure-nav coordination
   (sibling close, Escape, outside click) and sticky scroll-up mode.
   Everything degrades to native <details> without this file. */

if (!customElements.get('qc-header')) {
  customElements.define(
    'qc-header',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.header = this.querySelector('.qc-header');

        /* --- disclosure coordination --- */
        this.addEventListener(
          'toggle',
          (e) => {
            const opened = e.target;
            if (!(opened instanceof HTMLDetailsElement) || !opened.open) return;
            /* close sibling disclosures at the same level */
            const parent = opened.parentElement?.parentElement;
            parent?.querySelectorAll(':scope > * > details[open]').forEach((d) => {
              if (d !== opened) d.open = false;
            });
          },
          { capture: true, signal }
        );

        this.addEventListener(
          'keydown',
          (e) => {
            if (e.key !== 'Escape') return;
            const open = e.target.closest('details[open]');
            if (open && this.contains(open)) {
              open.open = false;
              open.querySelector('summary')?.focus();
              e.stopPropagation();
            }
          },
          { signal }
        );

        document.addEventListener(
          'click',
          (e) => {
            if (this.contains(e.target)) return;
            this.querySelectorAll('details[open]').forEach((d) => (d.open = false));
          },
          { signal }
        );

        /* --- sticky scroll-up --- */
        if (this.dataset.sticky === 'scroll-up' && this.header) {
          this.lastY = window.scrollY;
          window.addEventListener(
            'scroll',
            () => {
              const y = window.scrollY;
              const goingDown = y > this.lastY;
              this.lastY = y;
              this.header.classList.toggle('qc-header--stuck', y > this.header.offsetHeight);
              if (goingDown && y > this.header.offsetHeight * 2) {
                /* never tuck while focus or an open disclosure (menu,
                   nested nav) lives in the header */
                if (
                  !this.header.contains(document.activeElement) &&
                  !this.querySelector('details[open]')
                ) {
                  this.header.classList.add('qc-header--tucked');
                }
              } else if (!goingDown) {
                this.header.classList.remove('qc-header--tucked');
              }
            },
            { passive: true, signal }
          );
          /* focusing anything in the header always reveals it */
          this.addEventListener(
            'focusin',
            () => this.header.classList.remove('qc-header--tucked'),
            { signal }
          );
        }
      }

      disconnectedCallback() {
        this.abort.abort();
      }
    }
  );
}
