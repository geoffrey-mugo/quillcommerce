/* QuillCommerce cart coordinator & quick add (SPEC-005).
   Events:
     qc:cart-updated  detail: { cart }   — after any successful cart mutation
     qc:announce      detail: { message } — polite live-region announcement
*/

const EVT_UPDATED = 'qc:cart-updated';
const EVT_ANNOUNCE = 'qc:announce';

function announce(message) {
  document.dispatchEvent(new CustomEvent(EVT_ANNOUNCE, { detail: { message } }));
}

async function readCart() {
  const res = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error('cart read failed');
  return res.json();
}

if (!customElements.get('qc-live-region')) {
  customElements.define(
    'qc-live-region',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        this.region = document.createElement('div');
        this.region.className = 'qc-visually-hidden';
        this.region.setAttribute('aria-live', 'polite');
        this.append(this.region);
        document.addEventListener(
          EVT_ANNOUNCE,
          (e) => {
            /* alternate a zero-width suffix so identical messages re-announce;
               no rAF/timers — they stall in hidden or prerendered tabs */
            const next = e.detail.message;
            this.region.textContent =
              this.region.textContent === next ? next + '​' : next;
          },
          { signal: this.abort.signal }
        );
      }

      disconnectedCallback() {
        this.abort.abort();
      }
    }
  );
}

if (!customElements.get('qc-cart-count')) {
  customElements.define(
    'qc-cart-count',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        document.addEventListener(
          EVT_UPDATED,
          (e) => this.render(e.detail.cart.item_count),
          { signal: this.abort.signal }
        );
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      render(count) {
        this.textContent = count > 0 ? count : '';
        this.toggleAttribute('hidden', count === 0);
      }
    }
  );
}

if (!customElements.get('qc-product-form')) {
  customElements.define(
    'qc-product-form',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        this.form = this.querySelector('form');
        if (!this.form) return;
        this.form.addEventListener('submit', (e) => this.onSubmit(e), {
          signal: this.abort.signal,
        });
      }

      disconnectedCallback() {
        this.abort.abort();
        this.inflight?.abort();
      }

      get button() {
        return this.form.querySelector('[type="submit"]');
      }

      setBusy(busy) {
        const btn = this.button;
        if (!btn) return;
        btn.toggleAttribute('disabled', busy);
        btn.setAttribute('aria-busy', busy ? 'true' : 'false');
        if (busy) {
          this.idleLabel = btn.textContent;
          btn.textContent = this.dataset.addingLabel || btn.textContent;
        } else if (this.idleLabel) {
          btn.textContent = this.idleLabel;
        }
      }

      showError(message) {
        this.clearError();
        const p = document.createElement('p');
        p.className = 'qc-field__error';
        p.setAttribute('role', 'alert');
        p.dataset.qcFormError = '';
        p.textContent = message;
        this.form.append(p);
      }

      clearError() {
        this.querySelector('[data-qc-form-error]')?.remove();
      }

      async onSubmit(event) {
        event.preventDefault();
        if (this.form.getAttribute('aria-busy') === 'true') return;
        this.inflight?.abort();
        this.inflight = new AbortController();
        this.form.setAttribute('aria-busy', 'true');
        this.setBusy(true);
        this.clearError();

        try {
          const res = await fetch(this.form.action, {
            method: 'POST',
            headers: { Accept: 'application/json' },
            body: new FormData(this.form),
            signal: this.inflight.signal,
          });
          const payload = await res.json();
          if (!res.ok) {
            throw new Error(payload.description || payload.message || this.dataset.errorLabel);
          }
          const cart = await readCart();
          document.dispatchEvent(new CustomEvent(EVT_UPDATED, { detail: { cart } }));
          announce(this.dataset.addedLabel || '');
        } catch (err) {
          if (err.name !== 'AbortError') {
            const message = err.message || this.dataset.errorLabel || '';
            this.showError(message);
            announce(message);
          }
        } finally {
          this.form.setAttribute('aria-busy', 'false');
          this.setBusy(false);
        }
      }
    }
  );
}
