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

if (!customElements.get('qc-sticky-bar')) {
  customElements.define(
    'qc-sticky-bar',
    class extends HTMLElement {
      connectedCallback() {
        /* deferred + re-entrant so load-time DOM churn can't strand a
           stale listener set */
        clearTimeout(this.setupTimer);
        this.setupTimer = setTimeout(() => this.setup(), 0);
      }

      /* geometry check instead of IntersectionObserver: an instant jump
         (scrollTo, anchor, keyboard Home/End) can move the buy button
         from above the viewport to below it with no intersecting state
         in between, which an observer never reports */
      setup() {
        this.teardown?.();
        const buy = document.querySelector('[data-qc-buy]');
        if (!buy) return;
        const controller = new AbortController();
        this.teardown = () => {
          controller.abort();
          cancelAnimationFrame(this.raf);
          this.raf = 0;
        };
        const check = () => {
          this.raf = 0;
          /* show only once the buy button has been scrolled past (above
             the viewport) — never while it is still below the fold */
          this.toggle(buy.getBoundingClientRect().bottom < 0);
        };
        const schedule = () => {
          if (!this.raf) this.raf = requestAnimationFrame(check);
        };
        addEventListener('scroll', schedule, { passive: true, signal: controller.signal });
        addEventListener('resize', schedule, { passive: true, signal: controller.signal });
        check();
      }

      disconnectedCallback() {
        clearTimeout(this.setupTimer);
        this.teardown?.();
        document.documentElement.style.removeProperty('--qc-sticky-offset');
      }

      toggle(show) {
        this.hidden = !show;
        document.documentElement.style.setProperty(
          '--qc-sticky-offset',
          show ? `${this.offsetHeight}px` : '0px'
        );
      }
    }
  );
}

if (!customElements.get('qc-gift-recipient')) {
  customElements.define(
    'qc-gift-recipient',
    class extends HTMLElement {
      connectedCallback() {
        this.abort = new AbortController();
        this.toggleBox = this.querySelector('[data-qc-gift-toggle]');
        this.fields = this.querySelector('[data-qc-gift-fields]');
        this.offset = this.querySelector('[data-qc-gift-offset]');
        this.email = this.querySelector('input[type="email"]');
        if (!this.toggleBox || !this.fields) return;
        this.toggleBox.addEventListener('change', () => this.update(), {
          signal: this.abort.signal,
        });
        this.update();
      }

      disconnectedCallback() {
        this.abort.abort();
      }

      update() {
        const active = this.toggleBox.checked;
        this.fields.hidden = !active;
        this.fields
          .querySelectorAll('input, textarea')
          .forEach((el) => (el.disabled = !active));
        if (this.email) this.email.required = active;
        if (this.offset && active) {
          this.offset.value = new Date().getTimezoneOffset().toString();
        }
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
        this.pickupEl = this.querySelector('[data-qc-pickup]');

        this.plansEl?.addEventListener('change', () => this.sync(true), { signal });

        /* upgrade: reveal pills, hide the fallback select's field */
        if (this.fieldsets.length > 0) {
          this.fieldsets.forEach((f) => (f.hidden = false));
          this.querySelector('[data-qc-fallback-picker]')?.setAttribute('hidden', '');
        }

        this.fieldsets.forEach((f) =>
          f.addEventListener('change', () => this.sync(true), { signal })
        );

        /* dropdown picker mode: no pill fieldsets — the variant select is
           the picker, so page state follows its changes */
        this.variantSelect =
          this.fieldsets.length === 0 ? this.querySelector('select[name="id"]') : null;
        this.variantSelect?.addEventListener('change', () => this.sync(true), { signal });

        this.markUnavailable();
        this.syncPlans(this.currentVariant());
        this.recordView();
      }

      /* SPEC-018: head of the local recently-viewed list, deduped, cap 12 */
      recordView() {
        const id = Number(this.dataset.productId);
        const handle = this.dataset.productHandle;
        if (!id || !handle) return;
        try {
          const key = 'qc:recently-viewed';
          const list = JSON.parse(localStorage.getItem(key) || '[]').filter(
            (entry) => entry && entry.id !== id
          );
          list.unshift({ id, handle });
          localStorage.setItem(key, JSON.stringify(list.slice(0, 12)));
        } catch {
          /* storage unavailable — feature silently absent */
        }
      }

      disconnectedCallback() {
        this.abort.abort();
        this.pickupAbort?.abort();
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
        if (this.fieldsets.length > 0) return this.findVariant(this.selectedOptions);
        if (this.variantSelect) {
          const id = Number(this.variantSelect.value);
          return this.variants.find((v) => v.id === id) ?? this.variants[0];
        }
        return this.variants[0];
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
          /* cap at what can actually ship: quantity rules, then remaining
             inventory when tracked and overselling is off */
          let cap = rule.max != null ? rule.max : null;
          if (variant.managed && variant.policy === 'deny' && variant.qty > 0) {
            cap = cap == null ? variant.qty : Math.min(cap, variant.qty);
          }
          if (cap != null) this.qtyInput.max = cap;
          else this.qtyInput.removeAttribute('max');
          const current = Number(this.qtyInput.value) || 0;
          if (current < rule.min) this.qtyInput.value = rule.min;
          else if (cap != null && current > cap) this.qtyInput.value = cap;
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
          else if (variant.managed && variant.policy === 'continue' && variant.qty <= 0)
            key = 'preorder';
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
              : key === 'preorder'
                ? this.dataset.stockPreorder
                : key === 'low'
                  ? (this.dataset.stockLow || '').replace('[count]', variant.qty)
                  : this.dataset.stockIn;
          this.stockEl.textContent = label || '';
          this.stockEl.dataset.qcStockState = key;
        }

        {
          const ok = Boolean(variant?.available);
          const preorder =
            ok && variant.managed && variant.policy === 'continue' && variant.qty <= 0;
          const label = variant
            ? ok
              ? preorder
                ? this.dataset.preorderLabel || this.dataset.buyLabel
                : this.dataset.buyLabel
              : this.dataset.soldOutLabel
            : this.dataset.unavailableLabel;
          if (this.buyBtn) {
            this.buyBtn.disabled = !ok;
            this.buyBtn.textContent = label;
          }
          const stickyBuy = document.querySelector('[data-qc-sticky-buy]');
          if (stickyBuy) {
            stickyBuy.disabled = !ok;
            stickyBuy.textContent = label;
          }
          const stickyPrice = document.querySelector('[data-qc-sticky-price]');
          if (stickyPrice) {
            stickyPrice.textContent = shownPrice != null ? this.money(shownPrice) : '';
          }
        }

        if (variant?.media_id) this.gallery?.show(variant.media_id);

        if (variant) {
          const url = new URL(location.href);
          url.searchParams.set('variant', variant.id);
          const planId = this.plansEl?.querySelector('input[name="selling_plan"]:checked')?.value;
          if (planId) url.searchParams.set('selling_plan', planId);
          else url.searchParams.delete('selling_plan');
          try {
            history.replaceState({}, '', url);
          } catch {
            /* Safari throttles replaceState to 100 calls/30s — skip quietly */
          }
        }

        this.markUnavailable();
        this.updatePickup(variant);

        if (fromUser && variant) {
          const state = variant.available ? this.dataset.stockIn : this.dataset.soldOutLabel;
          announce(`${variant.title} — ${state}`);
        }
      }

      /* re-fetch pickup availability for the shown variant via the
         Section Rendering API; keep current content on failure */
      async updatePickup(variant) {
        if (!this.pickupEl) return;
        if (!variant) {
          this.pickupEl.innerHTML = '';
          return;
        }
        this.pickupAbort?.abort();
        this.pickupAbort = new AbortController();
        try {
          const url = `${location.pathname}?section_id=qc-pickup-availability&variant=${variant.id}`;
          const res = await fetch(url, { signal: this.pickupAbort.signal });
          if (!res.ok) return;
          const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
          const wrapper = doc.body.firstElementChild;
          if (wrapper) this.pickupEl.innerHTML = wrapper.innerHTML;
        } catch {
          /* aborted or offline — keep what is shown */
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
