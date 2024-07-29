import { gridBreakpoints } from 'src/assets/js/helpers/constants';

export const initHideCards = () => {
  const cardsElements = document.querySelectorAll('.show-more-cards');
  if (cardsElements && cardsElements.length) {
    cardsElements.forEach((cardsElement) => initShowHide({ cardsElement }));
  }
};

const initShowHide = ({ cardsElement }) => {
  const cardsFragment = new DocumentFragment();
  const showHide = () => {
    const cards = [...cardsElement.children];
    let cardsLength = cards.length;
    const isHide = cardsElement.dataset.hide === 'true';
    const maxInitCount = innerWidth > gridBreakpoints.md ? cardsElement.dataset.desktopCount : cardsElement.dataset.mobileCount;
    const showMoreText = cardsElement.parentElement.querySelector('.show-more-text');

    if (isHide) {
      for (let index = 0; index < cardsLength; index++) {
        const card = cards[index];
        if (index >= maxInitCount) {
          cardsFragment.appendChild(card.cloneNode(true));
          card.remove();
        }
      }
    } else {
      cardsElement.append(...cardsFragment.children);
      cardsLength = cardsElement.children.length;
    }
    showMoreText.innerText = `You're viewed ${isHide ? maxInitCount : cardsLength} of ${cardsLength} country`;
  };
  showHide();
  const showMoreButton = cardsElement.parentElement.querySelector('.show-more');

  showMoreButton.addEventListener('click', (e) => {
    cardsElement.dataset.hide = 'false';
    showHide({ cardsElement, cardsFragment });
    e.currentTarget.style.display = 'none';
  });
};
