import { animateValue } from '../utils/utils';

export const initStartCosts = ({ items }) => {
  const regExp = new RegExp(/(\$+)|(\*+)|(,+)/g);
  items.forEach(({ selector, duration, symbol }) => {
    const obj = document.querySelector(selector);

    if (obj) {
      animateValue({
        obj,
        start: Number(obj.textContent.replaceAll(regExp, '')) - 100,
        end: Number(obj.textContent.replaceAll(regExp, '')),
        duration,
        symbol,
      });
    }
  });
};
