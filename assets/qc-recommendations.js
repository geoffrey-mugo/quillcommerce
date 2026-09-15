/* QuillCommerce recommendations loader (SPEC-016): fetches the section
   through the Product Recommendations route and swaps itself for the
   result. Without this file: no recommendations (supplementary content). */

if (!customElements.get('qc-recommendations')) {
  customElements.define(
    'qc-recommendations',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const url = this.dataset.url;
        if (!url) return;
        fetch(url, { signal: this.abort.signal })
          .then((res) => (res.ok ? res.text() : ''))
          .then((text) => {
            const inner = new DOMParser()
              .parseFromString(text, 'text/html')
              .querySelector('.shopify-section')?.innerHTML;
            if (inner && inner.trim() !== '') {
              const range = document.createRange();
              range.selectNode(this.parentElement || document.body);
              this.replaceWith(range.createContextualFragment(inner));
            } else {
              this.remove();
            }
          })
          .catch(() => {
            /* aborted or offline — leave nothing behind */
            if (this.isConnected) this.remove();
          });
      }

      disconnectedCallback() {
        this.abort.abort();
      }
    }
  );
}
