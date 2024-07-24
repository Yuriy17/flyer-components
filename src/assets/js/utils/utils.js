import { debounce } from './debounce';

export function sortByField(field) {
  return (a, b) => (a[field] > b[field] ? 1 : -1);
}

/**
 * @param {String} HTML representing a single element.
 * @param {Boolean} flag representing whether or not to trim input whitespace, defaults to true.
 * @return {Element | HTMLCollection | null}
 */
export function fromHTML(html, trim = true) {
  // Process the HTML string.
  html = trim ? html.trim() : html;
  if (!html) return null;

  // Then set up a new template element.
  const template = document.createElement('template');
  template.innerHTML = html;
  const result = template.content.children;

  // Then return either an HTMLElement or HTMLCollection,
  // based on whether the input HTML had one or more roots.
  if (result.length === 1) return result[0];
  return result;
}

export function animateValue({ obj, start, end, duration, symbol }) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    let progress_value = Math.floor(progress * (end - start) + start);
    if (symbol == '$') {
      progress_value = symbol + new Intl.NumberFormat('en-US').format(progress_value);
    } else {
      progress_value = symbol + progress_value;
    }

    obj.innerHTML = progress_value + '*';
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const initSetHigherHeights = ({ blockArrayElements }) => {
  let maxHeight = 0;
  blockArrayElements.forEach((blockElement) => {
    blockElement.style.removeProperty('min-height');
    if (maxHeight < blockElement.offsetHeight) {
      maxHeight = blockElement.offsetHeight;
    }
  });
  blockArrayElements.forEach((blockElement) => (blockElement.style.minHeight = `${maxHeight}px`));
};

export const debouncedInitOnResize = ({ initFunction, params, debounceTime = 500 }) => {
  const debouncedInit = debounce(initFunction, debounceTime);
  debouncedInit(params);
  addEventListener('resize', () => debouncedInit(params));
};

export const setHigherHeights = (blockElements) => {
  if (blockElements && blockElements.length) {
    const blockArrayElements = [...blockElements];
    debouncedInitOnResize({
      initFunction: initSetHigherHeights,
      params: {
        blockArrayElements,
      },
      debounceTime: 10,
    });
  }
};
