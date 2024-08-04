import { animateValue } from '../utils/utils';

export const initStartCosts = ({ items }) => {
  const regExp = new RegExp(/(\$+)|(\*+)|(,+)/g);
  items.forEach(({ element, duration, symbol }) => {
    if (element) {
      animateValue({
        element,
        start: Number(element.textContent.replaceAll(regExp, '')) - 100,
        end: Number(element.textContent.replaceAll(regExp, '')),
        duration,
        symbol,
      });
    }
  });
};
