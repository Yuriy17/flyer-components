//AirDatepicker style
// import 'air-datepicker/air-datepicker.css';
// common styles
import './assets/css/styles.scss';
// import { initMainForm } from './assets/js/services/initMainForm.js';
// import { initFlightSearch } from './assets/js/services/flight-search.js';
// import { initValidation } from './assets/js/services/validation.js';
// import { fade, preloader, setPreloader } from './assets/js/services/preloader.js';
// import { getAllInputSearch } from './assets/js/services/api.js';
import { initShoelaceComponents } from './assets/js/services/shoelace/initShoelaceComponents.js';
// import { initModal } from './assets/js/services/initModal.js';
// import { initFormAirDatepicker } from './assets/js/services/initFormAirDatepicker.js';
// import { initSampleDialog } from './assets/js/services/initSampleDialog.js';
import { initReviews } from './assets/js/services/initReviews.js';
import { ShoelaceComponents } from './assets/js/helpers/constants.js';
import { initHeroSlider } from './assets/js/services/initHeroSlider';
import { initStartCosts } from './assets/js/services/initStartCosts.js';

document.addEventListener('DOMContentLoaded', async () => {
  initShoelaceComponents({
    components: [ShoelaceComponents.button],
  });
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
  // initMainForm();
  // getAllInputSearch();
  // initFlightSearch();
  // initValidation();
  // initModal();
  // initSampleDialog();
  // const state = window.location.hash === '#searchflights' ? 'searchingFinish' : 'loading';
  // await setPreloader(state);
  // await fade(preloader, false);
  // initFormAirDatepicker();
});
