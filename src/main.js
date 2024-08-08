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
import { initDialogFreeQuote } from './assets/js/services/dialog/initDialogFreeQuote.js';

import { fadeOut, preloader } from './assets/js/services/initPreloader';
import { initDialogPartners } from './assets/js/services/dialog/initDialogPartners';
import { initDialogClassUp } from './assets/js/services/dialog/initDialogClassUp';
import { initFlightTicketForms } from './assets/js/layouts/forms/initFlightTicketForms';

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
  console.log("🚀 ~ document.addEventListener ~ heroSection:", heroSection);
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
      initFlightTicketForms({
        flightTicketFormContainer: heroSection.querySelector('.find-ticket'),
      });
  }
  initHideCards();

  initForm(document.querySelector('.contacts__form'));
  initForm(document.querySelector('.subscribe__form'));

  initDialogFreeQuote({ dialogFreeQuote: document.querySelector('.dialog-free-quote') });
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
