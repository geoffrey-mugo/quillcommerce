/* QuillCommerce guided loadout (SPEC-028).
   A use-case selector (tablist) swaps ordered role panels; "Add loadout"
   resolves each item's variant and adds the whole set in one /cart/add
   request, then reuses the SPEC-005 cart contract:
     qc:cart-updated  detail: { cart, source: 'loadout' }
     qc:announce      detail: { message }
     qc:toast         detail: { message }
   Progressive enhancement: with no JS the panels stay browsable (every item
   links to its product) and the multi-add button stays hidden. */

if (!customElements.get('qc-loadout')) {
  customElements.define(
    'qc-loadout',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;

        this.tabs = [...this.querySelectorAll('[data-qc-loadout-tab]')];
        this.panels = [...this.querySelectorAll('[data-qc-loadout-panel]')];
        this.addButtons = [...this.querySelectorAll('[data-qc-loadout-add]')];

        /* reveal the multi-add action now that scripting is available */
        this.addButtons.forEach((btn) => {
          btn.hidden = false;
          btn.addEventListener(
            'click',
            () => this.add(btn.closest('[data-qc-loadout-panel]'), btn),
            { signal }
          );
        });

        this.tabs.forEach((tab, i) => {
          tab.addEventListener('click', () => this.select(i), { signal });
          tab.addEventListener('keydown', (e) => this.onKey(e, i), { signal });
        });
      }

      disconnectedCallback() {
        this.abort.abort();
        this.inflight?.abort();
      }

      select(index) {
        this.tabs.forEach((tab, i) => {
          const active = i === index;
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
          tab.tabIndex = active ? 0 : -1;
        });
        this.panels.forEach((panel, i) => {
          panel.hidden = i !== index;
        });
        this.tabs[index].focus();
      }

      onKey(event, index) {
        const last = this.tabs.length - 1;
        let next = null;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = last;
        if (next === null) return;
        event.preventDefault();
        this.select(next);
      }

      route(name, fallback) {
        return (window.qcRoutes && window.qcRoutes[name]) || fallback;
      }

      items(panel) {
        return [...panel.querySelectorAll('[data-qc-loadout-variant]')]
          .map((el) => parseInt(el.value, 10))
          .filter((id) => Number.isFinite(id))
          .map((id) => ({ id, quantity: 1 }));
      }

      clearError(panel) {
        panel.querySelector('[data-qc-loadout-error]')?.remove();
      }

      showError(panel, message) {
        this.clearError(panel);
        const p = document.createElement('p');
        p.className = 'qc-loadout__error';
        p.setAttribute('role', 'alert');
        p.dataset.qcLoadoutError = '';
        p.textContent = message;
        panel.querySelector('.qc-loadout__summary').append(p);
        document.dispatchEvent(new CustomEvent('qc:announce', { detail: { message } }));
      }

      setBusy(btn, busy) {
        btn.toggleAttribute('disabled', busy);
        btn.setAttribute('aria-busy', busy ? 'true' : 'false');
        if (busy) {
          this.idleLabel = btn.textContent;
          if (this.dataset.addingLabel) btn.textContent = this.dataset.addingLabel;
        } else if (this.idleLabel) {
          btn.textContent = this.idleLabel;
        }
      }

      async add(panel, btn) {
        if (!panel || btn.getAttribute('aria-busy') === 'true') return;
        const items = this.items(panel);
        if (!items.length) return;

        this.inflight?.abort();
        this.inflight = new AbortController();
        this.clearError(panel);
        this.setBusy(btn, true);

        try {
          const addRes = await fetch(`${this.dataset.addUrl || this.route('cart_add', '/cart/add')}.js`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ items }),
            signal: this.inflight.signal,
          });
          const payload = await addRes.json().catch(() => ({}));
          if (!addRes.ok) {
            throw new Error(payload.description || payload.message || this.dataset.errorLabel);
          }

          const cartRes = await fetch(`${this.route('cart', '/cart')}.js`, {
            headers: { Accept: 'application/json' },
            cache: 'no-store',
          });
          const cart = cartRes.ok ? await cartRes.json() : null;

          document.dispatchEvent(
            new CustomEvent('qc:cart-updated', { detail: { cart, source: 'loadout' } })
          );
          const done = this.dataset.addedLabel || '';
          document.dispatchEvent(new CustomEvent('qc:announce', { detail: { message: done } }));
          document.dispatchEvent(new CustomEvent('qc:toast', { detail: { message: done } }));
        } catch (err) {
          if (err.name !== 'AbortError') {
            const message = (err instanceof TypeError ? '' : err.message) || this.dataset.errorLabel || '';
            this.showError(panel, message);
          }
        } finally {
          this.setBusy(btn, false);
        }
      }
    }
  );
}
