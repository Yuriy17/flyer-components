import { hideLoadingIcon, showLoadingIcon } from '../utils/loadingIcon';

export const initLazyLoadImage = () => {
  const lazyPictures = [...document.querySelectorAll('.lazy-picture')];

  lazyPictures.forEach((lazyPicture) => {
    const image = lazyPicture.querySelector('img');
    showLoadingIcon(lazyPicture);

    if (image.complete) {
      hideLoadingIcon(lazyPicture);
    } else {
      image.addEventListener('load', () => hideLoadingIcon(lazyPicture));
    }
  });
};
