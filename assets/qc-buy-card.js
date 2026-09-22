/* QuillCommerce buy card (SPEC-023 v3): keeps a product card's unit
   price, quantity stepper, quantity-rules hint, and Add-button line
   total in sync with the selected variant. Without this file: the
   select, quantity field, and Add button still post natively. */

if (!customElements.get('qc-buy-card')) {
  customElements.define(
    'qc-buy-card',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.variantEl = this.querySelector('[data-qc-card-variant]');
        this.qty = this.querySelector('input[name="quantity"]');
        this.addBtn = this.querySelector('[data-qc-card-add]');
        this.rules = this.querySelector('[data-qc-card-rules]');
        this.priceEl = this.closest('.qc-product-card')?.querySelector('[data-qc-card-price]');
        if (!this.variantEl || !this.qty || !this.addBtn) return;
        /* stepper buttons render only under enhancement; the bare
           input + Add button is the no-JS baseline */
        this.classList.add('qc-buy-card--enhanced');

        this.variantEl.addEventListener('change', () => this.sync(true), { signal });
        this.qty.addEventListener('change', () => this.sync(false), { signal });
        this.addEventListener(
          'click',
          (e) => {
            const step = e.target.closest('[data-qc-card-step]');
            if (!step) return;
            const v = this.variant();
            const next = Number(this.qty.value || 0) + Number(step.dataset.qcCardStep) * v.inc;
            this.qty.value = Math.max(v.min, next);
            this.sync(false);
          },
          { signal }
        );

        this.sync(false);
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      /* the selected option (dropdown) or the hidden input (single variant) */
      variant() {
        const el = this.hasAttribute('data-has-select')
          ? this.variantEl.selectedOptions[0]
          : this.variantEl;
        return {
          price: Number(el?.dataset.price || 0),
          compare: Number(el?.dataset.compare || 0),
          min: Number(el?.dataset.min || 1),
          inc: Number(el?.dataset.inc || 1),
          max: el?.dataset.max ? Number(el.dataset.max) : null,
          preorder: el?.hasAttribute('data-preorder'),
          available: !el?.disabled,
        };
      }

      money(cents) {
        const fmt = this.dataset.moneyFormat || '{{amount}}';
        return fmt.replace(/\{\{\s*(\w+)\s*\}\}/, (match, key) => {
          const styles = {
            amount: [2, ',', '.'],
            amount_no_decimals: [0, ',', '.'],
            amount_with_comma_separator: [2, '.', ','],
            amount_no_decimals_with_comma_separator: [0, '.', ','],
            amount_with_apostrophe_separator: [2, "'", '.'],
            amount_no_decimals_with_space_separator: [0, ' ', '.'],
            amount_with_space_separator: [2, ' ', ','],
            amount_with_period_and_space_separator: [2, ' ', '.'],
          };
          const [places, thousands, decimal] = styles[key] || styles.amount;
          const [int, dec] = (cents / 100).toFixed(places).split('.');
          const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
          return dec ? grouped + decimal + dec : grouped;
        });
      }

      sync(fromVariant) {
        const v = this.variant();

        /* clamp quantity to the variant's rules */
        this.qty.min = v.min;
        this.qty.step = v.inc;
        if (v.max != null) this.qty.max = v.max;
        else this.qty.removeAttribute('max');
        let qty = Number(this.qty.value) || 0;
        if (fromVariant || qty < v.min) qty = Math.max(qty, v.min);
        if (v.max != null && qty > v.max) qty = v.max;
        /* snap to the increment, counting from the minimum */
        qty = v.min + Math.round((qty - v.min) / v.inc) * v.inc;
        if (v.max != null && qty > v.max) qty -= v.inc;
        this.qty.value = qty;

        if (this.rules) this.rules.hidden = !(v.min > 1 || v.inc > 1 || v.max != null);

        /* unit price line (with sale strike when applicable) */
        if (this.priceEl) {
          const price = this.priceEl.querySelector('.qc-price');
          if (price) {
            price.innerHTML = '';
            if (v.compare > v.price) {
              const sr = document.createElement('span');
              sr.className = 'qc-visually-hidden';
              sr.textContent = this.dataset.saleLabel || '';
              const current = document.createElement('span');
              current.className = 'qc-price__current';
              current.textContent = this.money(v.price);
              const was = document.createElement('s');
              was.className = 'qc-price__compare';
              was.textContent = this.money(v.compare);
              price.append(sr, current, ' ', was);
            } else {
              const current = document.createElement('span');
              current.className = 'qc-price__current';
              current.textContent = this.money(v.price);
              price.append(current);
            }
          }
        }

        /* Add button: line total, or sold out for an unbuyable pick */
        const suffix = this.addBtn.querySelector('.qc-visually-hidden');
        const label = !v.available
          ? this.dataset.soldOutLabel
          : (v.preorder ? this.dataset.preorderLabel : this.dataset.addLabel).replace(
              '[total]',
              this.money(v.price * qty)
            );
        this.addBtn.disabled = !v.available;
        this.addBtn.textContent = label;
        if (suffix) this.addBtn.append(suffix);
      }
    }
  );
}
