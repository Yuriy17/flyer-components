import { gridBreakpoints } from "../helpers/constants";

export const initHideCards = () => {
  const cardsElements = document.querySelectorAll('.show-more-cards');
  if(cardsElements && cardsElements.length) {
    cardsElements.forEach((cardsElement) => {
      initShowHide({ cardsElement });
      const showMoreButton = cardsElement.parentElement.querySelector('.show-more');

      showMoreButton.addEventListener('click', (e) => {
        cardsElement.dataset.hide = 'false';
        initShowHide({ cardsElement });
        e.currentTarget.style.display = 'none'
      });
    });
  }
}

const initShowHide = ({ cardsElement }) => {
  const cards = [...cardsElement.querySelectorAll('.card')];
  const isHide = cardsElement.dataset.hide === 'true';
  const maxInitCount = innerWidth > gridBreakpoints.md ? cardsElement.dataset.desktopCount : cardsElement.dataset.mobileCount;;
  const showMoreText = cardsElement.parentElement.querySelector('.show-more-text');
  showMoreText.innerText = `You're viewed ${isHide ? maxInitCount : cards.length} of ${cards.length} country`;
  
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    console.log("🚀 ~ initShowHide ~ cardsElement.dataset.hide === 'false':", );
    if (index < maxInitCount || !isHide) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  }
};