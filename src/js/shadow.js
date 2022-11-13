const {
  dat: { GUI },
} = window;
const gui = new GUI();

const getCSSProp = (element, propName) =>
  getComputedStyle(element).getPropertyValue(propName);

const DEVICE = document.querySelector('.device');

window.addEventListener('DOMContentLoaded', () => {
  const factorX = getCSSProp(DEVICE, '--factor-x');
  const factorY = getCSSProp(DEVICE, '--factor-y');

  const CONFIG = {
    '--factor-x': +factorX,
    '--factor-y': +factorY,
  };

  for (const key of Object.keys(CONFIG)) {
    DEVICE.style.setProperty(`${key}`, CONFIG[key]);
  }

  const update = (target, link) => (value) => {
    DEVICE.style.setProperty(`${target}`, value);
    if (CONFIG.linked && link) {
      CONFIG[link] = value;
      DEVICE.style.setProperty(`${link}`, value);
      gui.updateDisplay();
    }
  };

  gui.add(CONFIG, '--factor-x', -2, 2).onChange(update('--factor-x'));
  gui.add(CONFIG, '--factor-y', -2, 2).onChange(update('--factor-y'));
});
