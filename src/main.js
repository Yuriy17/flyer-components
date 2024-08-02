// common styles
import './assets/css/styles.scss';

import { initShoelaceComponents } from './assets/js/services/shoelace/initShoelaceComponents.js';
import { initReviews } from './assets/js/services/initReviews.js';
import { ShoelaceComponents } from './assets/js/helpers/constants.js';
import { initHeroSlider } from './assets/js/services/initHeroSlider';
import { initStartCosts } from './assets/js/services/initStartCosts.js';
import { initBurger } from './assets/js/services/dialog/initBurger.js';
import { initLazyLoadImage } from './assets/js/services/initLazyLoadImage';
import { initForm } from './assets/js/services/form/initForm.js';
import { initHideCards } from './assets/js/services/initHideCards';
import { initFlightDialog } from './assets/js/services/dialog/initFlightDialog';
import { initFlightSearch } from './assets/js/services/form/airportSearch/initFlightSearch';
import { fadeOut, preloader } from './assets/js/services/initPreloader';

document.addEventListener('DOMContentLoaded', async () => {
  await fadeOut(preloader);
  initShoelaceComponents({
    components: [
      ShoelaceComponents.button,
      ShoelaceComponents.drawer,
      ShoelaceComponents.dropdown,
      ShoelaceComponents.dialog,
      ShoelaceComponents.popup,
      ShoelaceComponents.tooltip,
      ShoelaceComponents.input,
      ShoelaceComponents.checkbox,
      ShoelaceComponents.tabGroup,
      ShoelaceComponents.radioGroup,
    ],
  });
  initBurger();
  initLazyLoadImage();
  // initReviews({ url: `${import.meta.env.VITE_STATIC_PATH}/data/reviews.json` });
  initHeroSlider();
  initStartCosts({
    items: [
      {
        selector: '.hero .price__cost',
        duration: 2000,
        symbol: '$',
      },
    ],
  });
  initHideCards();
  const dialogFlight = document.querySelector('.dialog-flight');
  initFlightDialog({ dialogFlight });
  initForm(document.querySelector('.contacts__form'));
  initForm(document.querySelector('.subscribe__form'));
  initForm(dialogFlight?.querySelector('.dialog-flight__form_round-trip'));
  initForm(dialogFlight?.querySelector('.dialog-flight__form_one-way'));
  initForm(dialogFlight?.querySelector('.dialog-flight__form_multi-city'));

  initFlightSearch({
    containerElement: dialogFlight,
  });




  // initFlightSearch();
  // initValidation();
  // initModal();
  // initSampleDialog();
  // const state = window.location.hash === '#searchflights' ? 'searchingFinish' : 'loading';
  // await setPreloader(state);
  // await fade(preloader, false);
  // initFormAirDatepicker();
});
