/* QuillCommerce slideshow (SPEC-024 §2). The scroll-snap track works
   on its own; this element adds arrows, dot state, loop, and optional
   autoplay that pauses on hover/focus and never runs under
   prefers-reduced-motion. */

if (!customElements.get('qc-slideshow')) {
  customElements.define(
    'qc-slideshow',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;

        this.track = this.querySelector('[data-qc-track]');
        this.slides = [...this.querySelectorAll('[data-qc-slide]')];
        this.dots = [...this.querySelectorAll('[data-qc-dot]')];
        if (!this.track || this.slides.length < 2) return;

        this.querySelector('[data-qc-controls]')?.removeAttribute('hidden');

        this.querySelector('[data-qc-prev]')?.addEventListener(
          'click',
          () => this.go(this.index() - 1),
          { signal }
        );
        this.querySelector('[data-qc-next]')?.addEventListener(
          'click',
          () => this.go(this.index() + 1),
          { signal }
        );
        this.dots.forEach((dot) =>
          dot.addEventListener('click', () => this.go(Number(dot.dataset.qcDot)), { signal })
        );

        this.track.addEventListener(
          'scroll',
          () => {
            if (this.raf) return;
            this.raf = requestAnimationFrame(() => {
              this.raf = null;
              this.markCurrent();
            });
          },
          { passive: true, signal }
        );

        const seconds = Number(this.dataset.autoplay) || 0;
        const stillness = matchMedia('(prefers-reduced-motion: reduce)');
        if (seconds > 0 && !stillness.matches) {
          const start = () => {
            this.timer ??= setInterval(() => this.go(this.index() + 1), seconds * 1000);
          };
          const stop = () => {
            clearInterval(this.timer);
            this.timer = null;
          };
          start();
          this.addEventListener('pointerenter', stop, { signal });
          this.addEventListener('pointerleave', start, { signal });
          this.addEventListener('focusin', stop, { signal });
          this.addEventListener('focusout', start, { signal });
          document.addEventListener(
            'visibilitychange',
            () => (document.hidden ? stop() : start()),
            { signal }
          );
        }
      }

      disconnectedCallback() {
        this.abort.abort();
        clearInterval(this.timer);
        if (this.raf) cancelAnimationFrame(this.raf);
      }

      index() {
        return Math.round(this.track.scrollLeft / this.track.clientWidth);
      }

      go(target) {
        const count = this.slides.length;
        const next = ((target % count) + count) % count; /* loop both ways */
        this.track.scrollTo({ left: next * this.track.clientWidth, behavior: 'smooth' });
      }

      markCurrent() {
        const current = this.index();
        this.dots.forEach((dot, i) => {
          if (i === current) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
      }
    }
  );
}
