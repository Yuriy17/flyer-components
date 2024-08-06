import { initTriggerButton } from './initTriggerButton';
import { initDialogFlightForm } from 'src/assets/js/services/form/airportSearch/initDialogFlightForm.js';

import { initForm } from 'src/assets/js/services/form/initForm.js';
export const initFlightDialog = ({ dialogFlight }) => {
  if (dialogFlight) {
    const closeButton = dialogFlight.querySelector('.icon-menu');
    const dropdowns = dialogFlight.querySelectorAll('.form__field-dropdown');
    
    dropdowns?.forEach((dropdown) => {
      const formField = dropdown.querySelector('.form__field');
      // prevent double click
      formField.onclick = (e) => {
        if (e.target.tagName === 'LABEL') {
          e.preventDefault();
        }
      };
    });
    closeButton && closeButton.addEventListener('click', () => dialogFlight.hide());
    initTriggerButton({ dialogFlight });

    const dialogFlightForms = dialogFlight.querySelectorAll('sl-tab-panel > .form');

    if (dialogFlightForms) {
      for (let index = 0; index < dialogFlightForms.length; index++) {
        const dialogFlightForm = dialogFlightForms[index];
        initForm(dialogFlightForm);
        initDialogFlightForm({
          dialogFlightForm,
        });
      }
    }
  }
};
