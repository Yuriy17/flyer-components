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

document.addEventListener('DOMContentLoaded', async () => {
  initShoelaceComponents({
    components: [
      ShoelaceComponents.button,
      ShoelaceComponents.drawer,
      ShoelaceComponents.dialog,
      ShoelaceComponents.popup,
      ShoelaceComponents.tooltip,
      ShoelaceComponents.input,
      ShoelaceComponents.checkbox,
      ShoelaceComponents.tabGroup,
    ],
  });
  initBurger();
  initLazyLoadImage();
  initReviews();
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
  initForm('.contacts__form');
  initForm('.subscribe__form');
  initForm('.dialog-flight__form_round-trip');
  initForm('.dialog-flight__form_one-way');
  initForm('.dialog-flight__form_multi-city');



  initHideCards();
  initFlightDialog();


  // initFlightSearch();
  // initValidation();
  // initModal();
  // initSampleDialog();
  // const state = window.location.hash === '#searchflights' ? 'searchingFinish' : 'loading';
  // await setPreloader(state);
  // await fade(preloader, false);
  // initFormAirDatepicker();
});
