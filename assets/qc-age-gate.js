/* QuillCommerce age gate (SPEC-026 §3): shows the gate until the
   visitor confirms; confirmation is remembered per browser. Escape is
   blocked while the gate is open (an escapable age gate is no gate).
   Storage failures fall back to asking on every page. */

const KEY = 'qc:age-confirmed';

const confirmed = () => {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};

const gate = document.querySelector('[data-qc-age-gate]');
/* never trap a merchant inside the Theme Editor preview */
const designMode = window.Shopify && window.Shopify.designMode;
if (gate && !designMode && !confirmed() && !gate.open) {
  gate.showModal();
  gate.addEventListener('cancel', (e) => e.preventDefault());
  gate.querySelector('[data-qc-age-confirm]')?.addEventListener('click', () => {
    try {
      localStorage.setItem(KEY, '1');
    } catch {
      /* remembered for this page only */
    }
    gate.close();
  });
}
