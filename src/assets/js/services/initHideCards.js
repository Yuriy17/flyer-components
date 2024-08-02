import { gridBreakpoints } from 'src/assets/js/helpers/constants';

export const initHideCards = () => {
  const cardsElements = document.querySelectorAll('.show-more-cards');
  if (cardsElements && cardsElements.length) {
    cardsElements.forEach((cardsElement) => initShowHide({ cardsElement }));
  }
};

const initShowHide = ({ cardsElement }) => {
  const cardsFragment = new DocumentFragment();
  const showMoreButton = cardsElement.parentElement.querySelector('.show-more');
  const showHide = () => {
    const maxInitCount = innerWidth > gridBreakpoints.md ? cardsElement.dataset.desktopCount : cardsElement.dataset.mobileCount;
    const cards = [...cardsElement.children];
    const showMoreText = cardsElement.parentElement.querySelector('.show-more-text');
    let cardsLength = cards.length;

    if(cardsLength > maxInitCount) {
      showMoreButton.style.display = 'flex';
      showMoreText.style.display = 'block';
      const isHide = cardsElement.dataset.hide === 'true';
  
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
    } else {
      showMoreButton.style.display = 'none';
      showMoreText.style.display = 'none';
    }
  };
  showHide();
  

  showMoreButton.addEventListener('click', (e) => {
    cardsElement.dataset.hide = 'false';
    showHide();
    e.currentTarget.style.display = 'none';
  });
};
