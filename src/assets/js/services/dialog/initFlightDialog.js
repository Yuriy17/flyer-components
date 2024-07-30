// import { initAirportSearchForm } from '../form/airportSearch/initAirportSearchForm';
// import { initMainForm } from '../legacy/initMainForm';
import { initTriggerButton } from './initTriggerButton';

export const initFlightDialog = async () => {
  const dialogFlight = document.querySelector('.dialog-flight');
  const closeButton = dialogFlight.querySelector('.icon-menu');
  
  closeButton.addEventListener('click', () => dialogFlight.hide());
  initTriggerButton({ dialogFlight });
  // await initMainForm(); 

  // const formElement = dialogFlight.querySelector('form');

  // formElement &&
  //   initAirportSearchForm({
  //     formElement,
  //   });
};
