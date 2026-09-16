/* QuillCommerce cart coordinator & quick add (SPEC-005).
   Events:
     qc:cart-updated  detail: { cart }   — after any successful cart mutation
     qc:announce      detail: { message } — polite live-region announcement
*/

const EVT_UPDATED = 'qc:cart-updated';
const EVT_ANNOUNCE = 'qc:announce';

/* Locale-aware endpoints (window.qcRoutes is emitted by layout/theme.liquid) */
function qcRoute(name, fallback) {
  return (window.qcRoutes && window.qcRoutes[name]) || fallback;
}

function announce(message) {
  document.dispatchEvent(new CustomEvent(EVT_ANNOUNCE, { detail: { message } }));
}

/* A page restored from the back/forward cache shows the cart as it was
   when the shopper left it; re-sync count and lines from the server. */
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;
  readCart()
    .then((cart) => {
      document.dispatchEvent(
        new CustomEvent(EVT_UPDATED, { detail: { cart, source: 'restore' } })
      );
    })
    .catch(() => {
      /* offline restore — leave the cached view in place */
    });
});

async function readCart() {
  const res = await fetch(`${qcRoute('cart', '/cart')}.js`, { headers: { Accept: 'application/json' } });
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
          /* innerHTML round-trip: textContent restore would flatten the
             visually-hidden product-name suffix into visible text */
          this.idleHTML = btn.innerHTML;
          btn.textContent = this.dataset.addingLabel || btn.textContent;
        } else if (this.idleHTML) {
          btn.innerHTML = this.idleHTML;
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
          document.dispatchEvent(
            new CustomEvent(EVT_UPDATED, { detail: { cart, source: 'add' } })
          );
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

/* SPEC-017: unified Ajax line editing for cart page and drawer. Wraps a
   qc-cart-line list; quantity changes and removals post /cart/change.js,
   the note saves via /cart/update.js, and every qc:cart-updated re-syncs
   this surface from its own section render. */
if (!customElements.get('qc-cart-lines')) {
  customElements.define(
    'qc-cart-lines',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;

        /* immediate edits — hide the manual Update button */
        this.querySelector('[data-qc-cart-update]')?.setAttribute('hidden', '');

        this.addEventListener(
          'change',
          (e) => {
            const input = e.target;
            if (input.matches('[data-qc-cart-note]')) {
              this.saveNote(input.value);
              return;
            }
            const line = input.closest('[data-qc-cart-line]');
            if (line && input.name === 'updates[]') {
              this.changeLine(line.dataset.qcCartLine, Number(input.value));
            }
          },
          { signal }
        );

        this.addEventListener(
          'click',
          (e) => {
            const remove = e.target.closest('.qc-cart-line__remove');
            const line = remove?.closest('[data-qc-cart-line]');
            if (remove && line) {
              e.preventDefault();
              this.changeLine(line.dataset.qcCartLine, 0);
            }
          },
          { signal }
        );

        document.addEventListener(EVT_UPDATED, () => this.refresh(), { signal });
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      async changeLine(key, quantity) {
        if (this.busy || !key || Number.isNaN(quantity) || quantity < 0) return;
        this.busy = true;
        this.setAttribute('aria-busy', 'true');
        try {
          const res = await fetch(`${qcRoute('cartChange', '/cart/change')}.js`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ id: key, quantity }),
          });
          const cart = await res.json();
          if (!res.ok) {
            throw new Error(cart.description || cart.message || this.dataset.errorLabel);
          }
          document.dispatchEvent(
            new CustomEvent(EVT_UPDATED, { detail: { cart, source: 'line' } })
          );
          announce(this.dataset.updatedLabel || '');
        } catch (err) {
          announce(err.message || this.dataset.errorLabel || '');
          this.refresh(); /* re-sync to server truth after a failure */
        } finally {
          this.busy = false;
          this.setAttribute('aria-busy', 'false');
        }
      }

      async saveNote(note) {
        try {
          const res = await fetch(`${qcRoute('cartUpdate', '/cart/update')}.js`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ note }),
          });
          if (res.ok) announce(this.dataset.noteSavedLabel || '');
        } catch {
          /* offline — the no-JS update path still exists */
        }
      }

      async refresh() {
        const id = this.dataset.sectionId;
        if (!id) return;
        this.inflight?.abort();
        this.inflight = new AbortController();
        try {
          const res = await fetch(`${location.pathname}?section_id=${id}`, {
            signal: this.inflight.signal,
          });
          if (!res.ok) return;
          const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
          const next = doc.querySelector(`qc-cart-lines[data-section-id="${id}"]`);
          if (!next) return;
          const focusId = this.contains(document.activeElement)
            ? document.activeElement.id
            : null;
          this.innerHTML = next.innerHTML;
          if (focusId) document.getElementById(focusId)?.focus({ preventScroll: true });
          /* the drawer heading's live count sits outside this element */
          const count = doc.querySelector('[data-qc-drawer-count]');
          const mine = this.closest('dialog')?.querySelector('[data-qc-drawer-count]');
          if (count && mine) mine.textContent = count.textContent;
          this.querySelector('[data-qc-cart-update]')?.setAttribute('hidden', '');
        } catch {
          /* aborted — a newer refresh superseded this one */
        }
      }
    }
  );
}

/* SPEC-017: the drawer shell — opens from the header cart link and after
   any successful add; native dialog handles Escape and focus restore. */
if (!customElements.get('qc-cart-drawer')) {
  customElements.define(
    'qc-cart-drawer',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.dialog = this.querySelector('dialog');
        if (!this.dialog) return;
        this.dialog.setAttribute('scroll-lock', '');

        this.querySelector('[data-qc-drawer-close]')?.addEventListener(
          'click',
          () => this.dialog.close(),
          { signal }
        );
        this.dialog.addEventListener(
          'click',
          (e) => {
            if (e.target === this.dialog) this.dialog.close();
          },
          { signal }
        );
        document.querySelectorAll('[data-qc-cart-open]').forEach((link) =>
          link.addEventListener(
            'click',
            (e) => {
              e.preventDefault();
              this.open();
            },
            { signal }
          )
        );
        document.addEventListener(
          EVT_UPDATED,
          (e) => {
            if (e.detail.source === 'add') this.open();
          },
          { signal }
        );
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      open() {
        if (!this.dialog.open) this.dialog.showModal();
      }
    }
  );
}
