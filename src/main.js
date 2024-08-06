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

import { fadeOut, preloader } from './assets/js/services/initPreloader';
import { initDialogPartners } from './assets/js/services/dialog/initDialogPartners';
import { initDialogClassUp } from './assets/js/services/dialog/initDialogClassUp';

document.addEventListener('DOMContentLoaded', async () => {
  await fadeOut(preloader);
  initShoelaceComponents({
    components: [
      ShoelaceComponents.tags,
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
  initReviews({ url: `${import.meta.env.VITE_STATIC_PATH}/data/reviews.json` });
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    initHeroSlider({
      heroSection
    });
    initStartCosts({
      items: [
        {
          element: heroSection.querySelector('.price__cost'),
          duration: 2000,
          symbol: '$',
        },
      ],
    });
    const heroPartnersButton = heroSection.querySelector('.hero-partners__button');
    initDialogPartners({
      triggerButton: heroPartnersButton,
      url: `${import.meta.env.VITE_STATIC_PATH}/data/partnersData.json`,
    });
  }
  initHideCards();

  initForm(document.querySelector('.contacts__form'));
  initForm(document.querySelector('.subscribe__form'));
  
  initFlightDialog({ dialogFlight: document.querySelector('.dialog-flight') });
  initDialogClassUp({
    dialogClassUpElement: document.querySelector('.dialog-classup'),
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
