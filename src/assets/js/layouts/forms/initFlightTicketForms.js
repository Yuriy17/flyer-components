import { initForm } from 'src/assets/js/services/form/initForm.js';
import { initFlightTicketForm } from '../../services/form/airportSearch/initFlightTicketForm';

export const initFlightTicketForms = ({ flightTicketFormContainer }) => {
  if (flightTicketFormContainer) {
    const flightTicketForms = flightTicketFormContainer.querySelectorAll('sl-tab-panel > .form');
    const dropdowns = flightTicketFormContainer.querySelectorAll('.form__field-dropdown');

    dropdowns?.forEach((dropdown) => {
      const formField = dropdown.querySelector('.form__field');
      // prevent double click
      formField.onclick = (e) => {
        if (e.target.tagName === 'LABEL') {
          e.preventDefault();
        }
      };
    });

    if (flightTicketForms && flightTicketForms.length) {
      for (let index = 0; index < flightTicketForms.length; index++) {
        const flightTicketForm = flightTicketForms[index];
        initForm(flightTicketForm);
        initFlightTicketForm({
          flightTicketForm,
        });
      }
    }
  }
};
