// import { initAirportSearchForm } from '../form/airportSearch/initAirportSearchForm';
// import { initMainForm } from '../legacy/initMainForm';
import { initTriggerButton } from './initTriggerButton';

export const initFlightDialog = ({ dialogFlight }) => {
  const closeButton = dialogFlight.querySelector('.icon-menu');

  const dropdowns = dialogFlight.querySelectorAll('.form__field-dropdown');
  dropdowns.forEach((dropdown) => {
    const formField = dropdown.querySelector('.form__field');
    // prevent double click
    formField.onclick = (e) => {
      if (e.target.tagName === 'LABEL') {
        e.preventDefault();
      }
    };
  });
  closeButton.addEventListener('click', () => dialogFlight.hide());
  initTriggerButton({ dialogFlight });
  // await initMainForm();

  // const formElement = dialogFlight.querySelector('form');

  // formElement &&
  //   initAirportSearchForm({
  //     formElement,
  //   });
};
