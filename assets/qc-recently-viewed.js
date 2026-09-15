/* QuillCommerce recently viewed (SPEC-018): reads the local view history
   and swaps itself for a search-driven section render of those products.
   Without this file (or without history/storage): nothing renders. */

const STORE_KEY = 'qc:recently-viewed';

function readHistory() {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

if (!customElements.get('qc-recently-viewed')) {
  customElements.define(
    'qc-recently-viewed',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const exclude = Number(this.dataset.exclude || 0);
        const limit = Number(this.dataset.limit) || 4;
        const list = readHistory()
          .filter((entry) => entry && entry.id && entry.id !== exclude)
          .slice(0, limit);
        if (list.length === 0) {
          this.remove();
          return;
        }
        const query = list.map((entry) => `id:${entry.id}`).join(' OR ');
        const url =
          `${this.dataset.searchUrl}?section_id=${this.dataset.sectionId}` +
          `&type=product&q=${encodeURIComponent(query)}`;
        fetch(url, { signal: this.abort.signal })
          .then((res) => (res.ok ? res.text() : ''))
          .then((text) => {
            const inner = new DOMParser()
              .parseFromString(text, 'text/html')
              .querySelector('.shopify-section')?.innerHTML;
            if (!inner || inner.trim() === '') {
              this.remove();
              return;
            }
            const fragment = document
              .createRange()
              .createContextualFragment(inner);
            /* restore most-recent-first order (search returns relevance) */
            const grid = fragment.querySelector('.qc-product-grid');
            if (grid) {
              const byHandle = new Map(
                [...grid.children].map((li) => [
                  li.querySelector('[data-qc-product-card]')?.dataset.qcProductCard,
                  li,
                ])
              );
              list.forEach((entry) => {
                const li = byHandle.get(entry.handle);
                if (li) grid.append(li);
              });
            }
            this.replaceWith(fragment);
          })
          .catch(() => {
            if (this.isConnected) this.remove();
          });
      }

      disconnectedCallback() {
        this.abort.abort();
      }
    }
  );
}
