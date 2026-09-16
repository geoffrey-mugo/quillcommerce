/* Back to top (SPEC-010 F): appears after ~2 viewports of scroll; returns
   focus to the main landmark. Instant scroll under reduced motion. */

if (!customElements.get('qc-back-to-top')) {
  customElements.define(
    'qc-back-to-top',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.btn = this.querySelector('button');
        if (!this.btn) return;

        window.addEventListener(
          'scroll',
          () => this.toggleAttribute('data-visible', window.scrollY > window.innerHeight * 2),
          { passive: true, signal }
        );

        this.btn.addEventListener(
          'click',
          () => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
            document.getElementById('qc-main')?.focus({ preventScroll: true });
          },
          { signal }
        );
      }

      disconnectedCallback() {
        this.abort.abort();
      }
    }
  );
}
