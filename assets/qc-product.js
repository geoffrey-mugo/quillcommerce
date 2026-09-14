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

        /* upgrade: reveal pills, hide the fallback select's field */
        if (this.fieldsets.length > 0) {
          this.fieldsets.forEach((f) => (f.hidden = false));
          this.querySelector('[data-qc-fallback-picker]')?.setAttribute('hidden', '');
        }

        this.fieldsets.forEach((f) =>
          f.addEventListener('change', () => this.sync(true), { signal })
        );

        this.markUnavailable();
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

      money(cents) {
        const fmt = this.dataset.moneyFormat || '{{amount}}';
        return fmt.replace(/\{\{\s*amount[^}]*\}\}/, (cents / 100).toFixed(2));
      }

      sync(fromUser) {
        const variant = this.findVariant(this.selectedOptions);

        if (this.idSelect && variant) this.idSelect.value = variant.id;

        if (this.priceEl) {
          if (!variant) {
            this.priceEl.textContent = '';
          } else if (variant.compare_at_price > variant.price) {
            this.priceEl.innerHTML = '';
            const srLabel = document.createElement('span');
            srLabel.className = 'qc-visually-hidden';
            srLabel.textContent = this.dataset.saleLabel || '';
            this.priceEl.append(srLabel);
            const sale = document.createElement('span');
            sale.textContent = this.money(variant.price);
            const compare = document.createElement('s');
            compare.className = 'qc-price__compare';
            compare.textContent = this.money(variant.compare_at_price);
            this.priceEl.append(sale, ' ', compare);
          } else {
            this.priceEl.textContent = variant.price != null ? this.money(variant.price) : '';
          }
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
