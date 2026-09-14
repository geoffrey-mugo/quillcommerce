/* QuillCommerce product page (SPEC-011): gallery + variant synchronization.
   Without this file: single-media view + the labeled variant <select>. */

function announce(message) {
  document.dispatchEvent(new CustomEvent('qc:announce', { detail: { message } }));
}

if (!customElements.get('qc-gallery')) {
  customElements.define(
    'qc-gallery',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        this.slides = [...this.querySelectorAll('[data-qc-media-id]')];
        this.thumbs = [...this.querySelectorAll('[data-qc-thumb]')];
        this.thumbs.forEach((btn) =>
          btn.addEventListener('click', () => this.show(btn.dataset.qcThumb), { signal })
        );

        this.lightbox = this.querySelector('[data-qc-lightbox]');
        if (this.lightbox) {
          this.lightbox.setAttribute('scroll-lock', '');
          this.lbSlides = [...this.lightbox.querySelectorAll('[data-qc-lightbox-slide]')];
          this.lbCounter = this.lightbox.querySelector('[data-qc-lightbox-counter]');
          this.lbIndex = 0;
          this.querySelectorAll('[data-qc-zoom]').forEach((link) =>
            link.addEventListener(
              'click',
              (e) => {
                e.preventDefault();
                this.openLightbox(link.dataset.qcZoom);
              },
              { signal }
            )
          );
          this.lightbox
            .querySelector('[data-qc-lightbox-close]')
            ?.addEventListener('click', () => this.lightbox.close(), { signal });
          this.lightbox
            .querySelector('[data-qc-lightbox-prev]')
            ?.addEventListener('click', () => this.stepLightbox(-1), { signal });
          this.lightbox
            .querySelector('[data-qc-lightbox-next]')
            ?.addEventListener('click', () => this.stepLightbox(1), { signal });
          this.lightbox.addEventListener(
            'click',
            (e) => {
              if (e.target === this.lightbox) this.lightbox.close();
            },
            { signal }
          );
          this.lightbox.addEventListener(
            'keydown',
            (e) => {
              if (e.key === 'ArrowLeft') this.stepLightbox(-1);
              if (e.key === 'ArrowRight') this.stepLightbox(1);
            },
            { signal }
          );
        }
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      openLightbox(mediaId) {
        const index = this.lbSlides.findIndex(
          (s) => s.dataset.qcLightboxSlide === String(mediaId)
        );
        this.setLightboxSlide(Math.max(0, index), false);
        if (!this.lightbox.open) this.lightbox.showModal();
      }

      stepLightbox(delta) {
        if (this.lbSlides.length < 2) return;
        const next = (this.lbIndex + delta + this.lbSlides.length) % this.lbSlides.length;
        this.setLightboxSlide(next, true);
      }

      setLightboxSlide(index, announceChange) {
        this.lbIndex = index;
        this.lbSlides.forEach((s, i) => (s.hidden = i !== index));
        const label = (this.lightbox.dataset.qcCounterTemplate || '')
          .replace('[n]', index + 1)
          .replace('[total]', this.lbSlides.length);
        if (this.lbCounter) this.lbCounter.textContent = label;
        if (announceChange && label) announce(label);
      }

      show(mediaId) {
        if (!mediaId) return;
        let found = false;
        this.slides.forEach((s) => {
          const active = s.dataset.qcMediaId === String(mediaId);
          s.hidden = !active;
          if (active) found = true;
        });
        if (!found && this.slides[0]) this.slides[0].hidden = false;
        this.thumbs.forEach((t) =>
          t.setAttribute('aria-current', t.dataset.qcThumb === String(mediaId) ? 'true' : 'false')
        );
      }
    }
  );
}

if (!customElements.get('qc-product-page')) {
  customElements.define(
    'qc-product-page',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        const { signal } = this.abort;
        try {
          this.variants = JSON.parse(this.querySelector('[data-qc-variants]')?.textContent || '[]');
        } catch {
          this.variants = [];
        }
        if (this.variants.length === 0) return;

        this.idSelect = this.querySelector('select[name="id"], input[name="id"]');
        this.fieldsets = [...this.querySelectorAll('[data-qc-option]')];
        this.priceEl = this.querySelector('[data-qc-price]');
        this.skuEl = this.querySelector('[data-qc-sku]');
        this.stockEl = this.querySelector('[data-qc-stock]');
        this.buyBtn = this.querySelector('[data-qc-buy]');
        this.gallery = document.querySelector('qc-gallery');
        this.plansEl = this.querySelector('[data-qc-plans]');
        this.unitEl = this.querySelector('[data-qc-unit-price]');
        this.qtyInput = this.querySelector('input[name="quantity"]');
        this.qtyNote = this.querySelector('[data-qc-qty-note]');
        this.breaksEl = this.querySelector('[data-qc-breaks]');
        this.breaksList = this.querySelector('[data-qc-breaks-list]');

        this.plansEl?.addEventListener('change', () => this.sync(true), { signal });

        /* upgrade: reveal pills, hide the fallback select's field */
        if (this.fieldsets.length > 0) {
          this.fieldsets.forEach((f) => (f.hidden = false));
          this.querySelector('[data-qc-fallback-picker]')?.setAttribute('hidden', '');
        }

        this.fieldsets.forEach((f) =>
          f.addEventListener('change', () => this.sync(true), { signal })
        );

        this.markUnavailable();
        this.syncPlans(this.currentVariant());
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      get selectedOptions() {
        return this.fieldsets.map(
          (f) => f.querySelector('input:checked')?.value ?? null
        );
      }

      findVariant(options) {
        return this.variants.find((v) => v.options.every((o, i) => o === options[i]));
      }

      currentVariant() {
        return this.fieldsets.length > 0
          ? this.findVariant(this.selectedOptions)
          : this.variants[0];
      }

      money(cents) {
        const fmt = this.dataset.moneyFormat || '{{amount}}';
        return fmt.replace(/\{\{\s*amount[^}]*\}\}/, (cents / 100).toFixed(2));
      }

      /* mark plans without an allocation for this variant; fall back when
         the checked one no longer applies. Returns the active plan. */
      syncPlans(variant) {
        if (!this.plansEl) return null;
        const radios = [...this.plansEl.querySelectorAll('input[name="selling_plan"]')];
        radios.forEach((radio) => {
          if (radio.value === '') return; /* one-time is always offered */
          const applies = Boolean(
            variant?.plans?.some((p) => String(p.id) === radio.value)
          );
          radio.disabled = !applies;
          radio.closest('label')?.toggleAttribute('data-qc-unavailable', !applies);
        });
        let checked = radios.find((r) => r.checked);
        if (checked?.disabled) {
          const fallback = radios.find((r) => !r.disabled);
          if (fallback) {
            fallback.checked = true;
            checked = fallback;
            const label = fallback.closest('label')?.querySelector('span')?.textContent.trim();
            if (label) announce(label);
          }
        }
        const planId = checked?.value || '';
        return planId ? variant?.plans?.find((p) => String(p.id) === planId) ?? null : null;
      }

      sync(fromUser) {
        const variant = this.currentVariant();
        const plan = this.syncPlans(variant);
        const shownPrice = plan ? plan.price : variant?.price;
        const shownCompare = plan ? plan.compare_at_price : variant?.compare_at_price;

        if (this.idSelect && variant) this.idSelect.value = variant.id;

        if (this.priceEl) {
          if (!variant) {
            this.priceEl.textContent = '';
          } else if (shownCompare > shownPrice) {
            this.priceEl.innerHTML = '';
            const srLabel = document.createElement('span');
            srLabel.className = 'qc-visually-hidden';
            srLabel.textContent = this.dataset.saleLabel || '';
            this.priceEl.append(srLabel);
            const sale = document.createElement('span');
            sale.textContent = this.money(shownPrice);
            const compare = document.createElement('s');
            compare.className = 'qc-price__compare';
            compare.textContent = this.money(shownCompare);
            this.priceEl.append(sale, ' ', compare);
          } else {
            this.priceEl.textContent = shownPrice != null ? this.money(shownPrice) : '';
          }
        }

        if (this.unitEl) {
          const unitPrice = plan?.unit_price ?? variant?.unit_price;
          const refUnit = variant?.unit_ref_unit;
          if (unitPrice != null && refUnit) {
            const refValue = variant.unit_ref_value === 1 ? '' : variant.unit_ref_value;
            this.unitEl.textContent = `${this.money(unitPrice)} / ${refValue}${refUnit}`;
            this.unitEl.hidden = false;
          } else {
            this.unitEl.hidden = true;
            this.unitEl.textContent = '';
          }
        }

        if (this.qtyInput && variant?.qty_rule) {
          const rule = variant.qty_rule;
          this.qtyInput.min = rule.min;
          this.qtyInput.step = rule.inc;
          if (rule.max != null) this.qtyInput.max = rule.max;
          else this.qtyInput.removeAttribute('max');
          const current = Number(this.qtyInput.value) || 0;
          if (current < rule.min) this.qtyInput.value = rule.min;
          else if (rule.max != null && current > rule.max) this.qtyInput.value = rule.max;
          if (this.qtyNote) {
            const parts = [];
            if (rule.min > 1) parts.push((this.dataset.qtyMin || '').replace('[n]', rule.min));
            if (rule.inc > 1) parts.push((this.dataset.qtyInc || '').replace('[n]', rule.inc));
            if (rule.max != null) parts.push((this.dataset.qtyMax || '').replace('[n]', rule.max));
            this.qtyNote.textContent = parts.join(' · ');
            this.qtyNote.hidden = parts.length === 0;
          }
        }

        if (this.breaksEl && this.breaksList) {
          const breaks = variant?.breaks || [];
          this.breaksList.innerHTML = '';
          breaks.forEach((b) => {
            const li = document.createElement('li');
            li.textContent = (this.dataset.breakRow || '')
              .replace('[qty]', b.q)
              .replace('[price]', this.money(b.p));
            this.breaksList.append(li);
          });
          this.breaksEl.hidden = breaks.length === 0;
        }

        if (this.skuEl) {
          this.skuEl.textContent = variant?.sku || '';
          this.skuEl.toggleAttribute('hidden', !variant?.sku);
        }

        if (this.stockEl) {
          const threshold = Number(this.dataset.lowStock || 0);
          let key = 'in';
          if (!variant || !variant.available) key = 'out';
          else if (
            threshold > 0 &&
            variant.managed &&
            variant.qty != null &&
            variant.qty > 0 &&
            variant.qty <= threshold
          )
            key = 'low';
          const label =
            key === 'out'
              ? this.dataset.stockOut
              : key === 'low'
                ? (this.dataset.stockLow || '').replace('[count]', variant.qty)
                : this.dataset.stockIn;
          this.stockEl.textContent = label || '';
          this.stockEl.dataset.qcStockState = key;
        }

        if (this.buyBtn) {
          const ok = Boolean(variant?.available);
          this.buyBtn.disabled = !ok;
          this.buyBtn.textContent = variant
            ? ok
              ? this.dataset.buyLabel
              : this.dataset.soldOutLabel
            : this.dataset.unavailableLabel;
        }

        if (variant?.media_id) this.gallery?.show(variant.media_id);

        if (variant) {
          const url = new URL(location.href);
          url.searchParams.set('variant', variant.id);
          const planId = this.plansEl?.querySelector('input[name="selling_plan"]:checked')?.value;
          if (planId) url.searchParams.set('selling_plan', planId);
          else url.searchParams.delete('selling_plan');
          history.replaceState({}, '', url);
        }

        this.markUnavailable();

        if (fromUser && variant) {
          const state = variant.available ? this.dataset.stockIn : this.dataset.soldOutLabel;
          announce(`${variant.title} — ${state}`);
        }
      }

      /* strike values that yield no available variant given other picks */
      markUnavailable() {
        this.fieldsets.forEach((fieldset, index) => {
          const others = this.selectedOptions;
          fieldset.querySelectorAll('input').forEach((input) => {
            const probe = [...others];
            probe[index] = input.value;
            const v = this.findVariant(probe);
            const unavailable = !v || !v.available;
            input.closest('label')?.toggleAttribute('data-qc-unavailable', unavailable);
          });
        });
      }
    }
  );
}
