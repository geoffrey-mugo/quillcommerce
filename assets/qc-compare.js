/* QuillCommerce product compare (SPEC-019): card checkboxes feed a
   localStorage selection (cap 4); the tray opens a dialog whose table is
   a search-driven section render. Without this file: no compare UI. */

const STORE_KEY = 'qc:compare';
const CAP = 4;
const EVT_COMPARE = 'qc:compare-updated';

function announce(message) {
  document.dispatchEvent(new CustomEvent('qc:announce', { detail: { message } }));
}

function readSelection() {
  try {
    const list = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

function writeSelection(list) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — selection is session-visual only */
  }
  document.dispatchEvent(new CustomEvent(EVT_COMPARE));
}

/* reveal a card's compare toggle and sync its checked state */
function syncToggle(input) {
  const selected = readSelection().some(
    (entry) => String(entry.id) === input.dataset.qcCompareId
  );
  input.checked = selected;
  input.closest('.qc-compare-toggle')?.removeAttribute('hidden');
}

function syncAllToggles(root = document) {
  root.querySelectorAll('input[data-qc-compare-id]').forEach(syncToggle);
}

if (!customElements.get('qc-compare-tray')) {
  customElements.define(
    'qc-compare-tray',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.dialog = this.querySelector('dialog');
        this.dialog?.setAttribute('scroll-lock', '');
        this.countEl = this.querySelector('[data-qc-compare-count]');
        this.content = this.querySelector('[data-qc-compare-content]');

        /* delegated toggle handling — injected cards included */
        document.addEventListener(
          'change',
          (e) => {
            const input = e.target;
            if (!input.matches?.('input[data-qc-compare-id]')) return;
            this.onToggle(input);
          },
          { signal }
        );

        /* reveal + sync toggles on cards injected later */
        this.observer = new MutationObserver(() => syncAllToggles());
        this.observer.observe(document.body, { childList: true, subtree: true });

        document.addEventListener(EVT_COMPARE, () => this.renderTray(), { signal });

        this.querySelector('[data-qc-compare-open]')?.addEventListener(
          'click',
          () => this.openDialog(),
          { signal }
        );
        this.querySelector('[data-qc-compare-clear]')?.addEventListener(
          'click',
          () => {
            writeSelection([]);
            syncAllToggles();
            announce(this.dataset.clearedLabel || '');
          },
          { signal }
        );
        this.querySelector('[data-qc-compare-close]')?.addEventListener(
          'click',
          () => this.dialog.close(),
          { signal }
        );
        this.dialog?.addEventListener(
          'click',
          (e) => {
            if (e.target === this.dialog) this.dialog.close();
          },
          { signal }
        );

        syncAllToggles();
        this.renderTray();
      }

      disconnectedCallback() {
        this.abort.abort();
        this.observer?.disconnect();
        this.inflight?.abort();
      }

      onToggle(input) {
        const id = Number(input.dataset.qcCompareId);
        const handle = input.dataset.qcCompareHandle;
        let list = readSelection().filter((entry) => entry.id !== id);
        if (input.checked) {
          if (list.length >= CAP) {
            input.checked = false;
            announce(this.dataset.fullLabel || '');
            return;
          }
          list.push({ id, handle });
          announce(this.dataset.addedLabel || '');
        } else {
          announce(this.dataset.removedLabel || '');
        }
        writeSelection(list);
        syncAllToggles();
      }

      renderTray() {
        const count = readSelection().length;
        this.hidden = count === 0;
        if (this.countEl) {
          this.countEl.textContent = (this.dataset.countLabel || '[n]').replace(
            '[n]',
            count
          );
        }
        if (count === 0 && this.dialog?.open) this.dialog.close();
      }

      async openDialog() {
        const list = readSelection();
        if (list.length === 0 || !this.dialog) return;
        this.content.textContent = '';
        if (!this.dialog.open) this.dialog.showModal();
        this.inflight?.abort();
        this.inflight = new AbortController();
        try {
          const query = list.map((entry) => `id:${entry.id}`).join(' OR ');
          const res = await fetch(
            `${this.dataset.searchUrl}?section_id=qc-compare&type=product&q=${encodeURIComponent(query)}`,
            { signal: this.inflight.signal }
          );
          if (!res.ok) throw new Error();
          const inner = new DOMParser()
            .parseFromString(await res.text(), 'text/html')
            .querySelector('.shopify-section')?.innerHTML;
          if (!inner || inner.trim() === '') throw new Error();
          this.content.replaceChildren(
            document.createRange().createContextualFragment(inner)
          );
        } catch (err) {
          if (err.name !== 'AbortError') {
            this.content.textContent = this.dataset.errorLabel || '';
          }
        }
      }
    }
  );
}
