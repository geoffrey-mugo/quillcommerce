/* QuillCommerce predictive search (SPEC-008). Upgrades the header search
   link to a dialog backed by /search/suggest.json. Without this file the
   link navigates to the search page. */

function announce(message) {
  document.dispatchEvent(new CustomEvent('qc:announce', { detail: { message } }));
}

if (!customElements.get('qc-search')) {
  customElements.define(
    'qc-search',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.trigger = this.querySelector('a[href]');
        this.dialog = this.querySelector('dialog');
        this.input = this.querySelector('input[type="search"]');
        this.results = this.querySelector('[data-qc-search-results]');
        this.idleHint = this.results?.innerHTML || '';
        if (!this.trigger || !this.dialog || !this.input) return;

        this.trigger.addEventListener(
          'click',
          (e) => {
            e.preventDefault();
            this.dialog.showModal();
            this.input.focus();
          },
          { signal }
        );

        this.dialog.addEventListener(
          'close',
          () => this.trigger.focus(),
          { signal }
        );

        this.dialog.addEventListener(
          'click',
          (e) => {
            if (e.target === this.dialog) this.dialog.close();
          },
          { signal }
        );

        this.querySelector('[data-qc-search-close]')?.addEventListener(
          'click',
          () => this.dialog.close(),
          { signal }
        );

        this.input.addEventListener(
          'input',
          () => {
            clearTimeout(this.debounce);
            this.debounce = setTimeout(() => this.suggest(), 200);
          },
          { signal }
        );
      }

      disconnectedCallback() {
        this.abort.abort();
        this.inflight?.abort();
        clearTimeout(this.debounce);
      }

      async suggest() {
        const q = this.input.value.trim();
        this.inflight?.abort();
        if (q.length < 2) {
          this.results.innerHTML = this.idleHint;
          return;
        }
        this.inflight = new AbortController();
        this.results.textContent = this.dataset.loadingLabel || '';

        const suggestBase = (window.qcRoutes && window.qcRoutes.predictiveSearch) || '/search/suggest';
        const url = new URL(`${suggestBase}.json`, location.origin);
        url.searchParams.set('q', q);
        url.searchParams.set('resources[type]', 'product,page,article');
        url.searchParams.set('resources[limit]', '4');

        try {
          const res = await fetch(url, { signal: this.inflight.signal });
          if (!res.ok) throw new Error();
          const data = (await res.json()).resources.results;
          if (this.input.value.trim() !== q) return; /* superseded */
          this.render(q, data);
        } catch (err) {
          if (err.name === 'AbortError') return;
          this.results.textContent = this.dataset.errorLabel || '';
          this.appendSeeAll(q);
        }
      }

      render(q, data) {
        const groups = [
          ['products', this.dataset.productsLabel],
          ['pages', this.dataset.pagesLabel],
          ['articles', this.dataset.articlesLabel],
        ];
        this.results.replaceChildren();
        let count = 0;

        for (const [key, label] of groups) {
          const items = data[key] || [];
          if (items.length === 0) continue;
          count += items.length;

          const h = document.createElement('h3');
          h.className = 'qc-search-suggest__group';
          h.textContent = label;
          const ul = document.createElement('ul');
          ul.className = 'qc-search-suggest__list';
          ul.setAttribute('role', 'list');

          for (const item of items) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'qc-search-suggest__item';
            a.href = item.url;
            if (key === 'products' && item.image) {
              const img = document.createElement('img');
              img.src = item.image;
              img.alt = '';
              img.width = 40;
              img.height = 40;
              img.loading = 'lazy';
              a.append(img);
            }
            const span = document.createElement('span');
            span.textContent = item.title;
            a.append(span);
            if (key === 'products' && item.price) {
              const price = document.createElement('span');
              price.className = 'qc-search-suggest__price';
              const fmt = this.dataset.moneyFormat;
              price.textContent = fmt ? fmt.replace(/\{\{\s*amount[^}]*\}\}/, item.price) : item.price;
              a.append(price);
            }
            li.append(a);
            ul.append(li);
          }
          this.results.append(h, ul);
        }

        if (count === 0) {
          this.results.textContent = this.dataset.emptyLabel || '';
        } else {
          const template = count === 1 ? this.dataset.countOneLabel : this.dataset.countOtherLabel;
          announce((template || '').replace('[count]', count));
        }
        this.appendSeeAll(q);
      }

      appendSeeAll(q) {
        const a = document.createElement('a');
        a.className = 'qc-btn qc-btn--quiet qc-search-suggest__all';
        const searchBase = this.dataset.searchUrl
          || (window.qcRoutes && window.qcRoutes.search)
          || '/search';
        const url = new URL(searchBase, location.origin);
        url.searchParams.set('q', q);
        a.href = url;
        a.textContent = (this.dataset.seeAllLabel || '').replace('[terms]', q);
        this.results.append(a);
      }
    }
  );
}
