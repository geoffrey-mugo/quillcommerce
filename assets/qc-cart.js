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

/* Visual add-to-cart confirmation. Screen readers get the same text via
   announce(), so the toast itself is aria-hidden. Mounted inside the
   topmost open dialog when one is up (a plain fixed element would sit
   below the dialog's top layer), otherwise on <body>. */
let toastTimer = null;
function showToast(message) {
  if (!message) return;
  document.querySelector('.qc-toast')?.remove();
  const openDialogs = [...document.querySelectorAll('dialog[open]')];
  const host = openDialogs[openDialogs.length - 1] || document.body;
  const toast = document.createElement('div');
  toast.className = 'qc-toast';
  toast.setAttribute('aria-hidden', 'true');
  const check = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  check.setAttribute('viewBox', '0 0 16 16');
  check.setAttribute('class', 'qc-toast__check');
  check.innerHTML = '<path d="M2.5 8.5 6 12l7.5-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>';
  toast.append(check, document.createTextNode(message));
  host.append(toast);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.remove(), 3500);
}

/* A page restored via back/forward shows the cart as it was when the
   HTML was produced — whether from the bfcache (event.persisted) or
   re-served from the HTTP cache (persisted false, but the navigation
   entry says back_forward). Re-sync count and lines from the server. */
window.addEventListener('pageshow', (event) => {
  const nav = performance.getEntriesByType('navigation')[0];
  if (!event.persisted && nav?.type !== 'back_forward') return;
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
  /* Shopify serves /cart.js without cache-control, so browsers may
     heuristically cache it — always read the live cart */
  const res = await fetch(`${qcRoute('cart', '/cart')}.js`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('cart read failed');
  return res.json();
}

if (!customElements.get('qc-live-region')) {
  customElements.define(
    'qc-live-region',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        /* reuse the node across reconnects (Theme Editor reorders) so
           stale duplicate live regions never pile up */
        this.region = this.querySelector('[aria-live]');
        if (!this.region) {
          this.region = document.createElement('div');
          this.region.className = 'qc-visually-hidden';
          this.region.setAttribute('aria-live', 'polite');
          this.append(this.region);
        }
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
          /* non-JSON bodies (rate-limit or gateway error pages) must not
             surface a raw parse error to the shopper */
          const payload = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(payload.description || payload.message || this.dataset.errorLabel);
          }
          const cart = await readCart();
          document.dispatchEvent(
            new CustomEvent(EVT_UPDATED, { detail: { cart, source: 'add' } })
          );
          announce(this.dataset.addedLabel || '');
          showToast(this.dataset.addedLabel || '');
          /* a card's variant popover has done its job once the item is in */
          this.closest('details.qc-card-picker')?.removeAttribute('open');
        } catch (err) {
          if (err.name !== 'AbortError') {
            /* a network-level TypeError carries browser prose
               ("Failed to fetch") — show the localized label instead */
            const message =
              (err instanceof TypeError ? '' : err.message) ||
              this.dataset.errorLabel ||
              '';
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

        /* immediate edits — hide the manual Update button; steppers only
           render once this enhancement is running */
        this.querySelector('[data-qc-cart-update]')?.setAttribute('hidden', '');
        this.classList.add('qc-cart-lines--enhanced');

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
            const step = e.target.closest('[data-qc-qty-step]');
            if (step) {
              const input = step
                .closest('[data-qc-cart-line]')
                ?.querySelector('input[name="updates[]"]');
              if (input) {
                const next = Math.max(0, Number(input.value || 0) + Number(step.dataset.qcQtyStep));
                input.value = next;
                input.dispatchEvent(new Event('change', { bubbles: true }));
              }
              return;
            }
            const remove = e.target.closest('.qc-cart-line__remove');
            const line = remove?.closest('[data-qc-cart-line]');
            if (remove && line) {
              e.preventDefault();
              this.changeLine(line.dataset.qcCartLine, 0);
            }
          },
          { signal }
        );

        /* a surface hidden inside a closed drawer only marks itself
           stale — it re-syncs when the drawer opens, so one edit never
           costs two section renders */
        document.addEventListener(
          EVT_UPDATED,
          () => {
            const dialog = this.closest('dialog');
            if (dialog && !dialog.open) {
              this.stale = true;
            } else if (!this.pending?.size) {
              /* hold the re-render while stepper edits are queued — the
                 replayed change triggers the final, correct refresh */
              this.refresh();
            }
          },
          { signal }
        );
      }

      refreshIfStale() {
        if (this.stale) {
          this.stale = false;
          this.refresh();
        }
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      async changeLine(key, quantity) {
        if (!key || Number.isNaN(quantity) || quantity < 0) return;
        if (this.busy) {
          /* rapid stepper taps: queue the newest quantity per line and
             replay once the in-flight request settles — dropping them
             would snap the input back and lose clicks */
          (this.pending ??= new Map()).set(key, quantity);
          return;
        }
        this.busy = true;
        this.setAttribute('aria-busy', 'true');
        try {
          const res = await fetch(`${qcRoute('cartChange', '/cart/change')}.js`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ id: key, quantity }),
          });
          const cart = await res.json().catch(() => null);
          if (!res.ok || !cart) {
            throw new Error(cart?.description || cart?.message || this.dataset.errorLabel);
          }
          document.dispatchEvent(
            new CustomEvent(EVT_UPDATED, { detail: { cart, source: 'line' } })
          );
          announce(this.dataset.updatedLabel || '');
        } catch (err) {
          const message = err instanceof TypeError ? '' : err.message;
          announce(message || this.dataset.errorLabel || '');
          this.refresh(); /* re-sync to server truth after a failure */
        } finally {
          this.busy = false;
          this.setAttribute('aria-busy', 'false');
          const queued = this.pending?.entries().next().value;
          if (queued) {
            this.pending.delete(queued[0]);
            this.changeLine(queued[0], queued[1]);
          }
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
            cache: 'no-store' /* cart markup must never come from HTTP cache */,
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
        /* delegated so links re-rendered later (Theme Editor header
           edits, swapped sections) keep working without rebinding */
        document.addEventListener(
          'click',
          (e) => {
            const opener = e.target.closest('[data-qc-cart-open]');
            if (!opener) return;
            e.preventDefault();
            this.open();
          },
          { signal }
        );
        /* Adds confirm with the toast instead of springing the drawer
           open (which buried whatever the shopper was doing under a
           second layer); the drawer opens only from the cart link. */
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      open() {
        if (!this.dialog.open) this.dialog.showModal();
        this.dialog.querySelector('qc-cart-lines')?.refreshIfStale();
      }
    }
  );
}
