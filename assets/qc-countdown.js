/* QuillCommerce countdown (SPEC-025 §6): swaps the static deadline
   line for ticking D/H/M/S units; shows the expired message at zero.
   An unparseable deadline leaves the static line untouched. */

if (!customElements.get('qc-countdown')) {
  customElements.define(
    'qc-countdown',
    class extends HTMLElement {
      connectedCallback() {
        this.units = this.querySelector('[data-qc-units]');
        this.staticLine = this.querySelector('[data-qc-deadline-text]');
        this.expired = this.querySelector('[data-qc-expired]');
        const deadline = new Date(this.dataset.deadline || '').getTime();
        if (!this.units || Number.isNaN(deadline)) return;

        this.labels = [
          this.dataset.daysLabel || 'd',
          this.dataset.hoursLabel || 'h',
          this.dataset.minutesLabel || 'm',
          this.dataset.secondsLabel || 's',
        ];
        /* reconnects (Theme Editor reorders) re-run this — start clean
           instead of appending a second row of unit cells */
        this.units.replaceChildren();
        this.cells = this.labels.map((label) => {
          const unit = document.createElement('div');
          unit.className = 'qc-countdown__unit';
          const value = document.createElement('span');
          value.className = 'qc-countdown__value';
          const name = document.createElement('span');
          name.className = 'qc-countdown__label';
          name.textContent = label;
          unit.append(value, name);
          this.units.append(unit);
          return value;
        });

        this.staticLine?.setAttribute('hidden', '');
        this.units.removeAttribute('hidden');

        const tick = () => {
          const left = deadline - Date.now();
          if (left <= 0) {
            clearInterval(this.timer);
            this.units.setAttribute('hidden', '');
            this.expired?.removeAttribute('hidden');
            return;
          }
          const s = Math.floor(left / 1000);
          const parts = [
            Math.floor(s / 86400),
            Math.floor((s % 86400) / 3600),
            Math.floor((s % 3600) / 60),
            s % 60,
          ];
          parts.forEach((n, i) => {
            this.cells[i].textContent = String(n).padStart(2, '0');
          });
        };
        tick();
        this.timer = setInterval(tick, 1000);
      }

      disconnectedCallback() {
        clearInterval(this.timer);
      }
    }
  );
}
