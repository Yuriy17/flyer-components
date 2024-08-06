import { initForm } from 'src/assets/js/services/form/initForm.js';

let modalShowed = 0;
const setTrigger = ({ dialogClassUpElement }) => {
  resetTimeout();

  let timer = 15000;
  let timerID;
  function resetTimeout() {
    let closeModalCount = 0;
    if (localStorage.getItem('closeModalCount')) {
      closeModalCount = Number(localStorage.getItem('closeModalCount'));
    }
    if (closeModalCount >= 2 || localStorage.getItem('subscribed')) {
      return;
    }
    const handleTimeout = () => {
      if (modalShowed == 0) {
        timer = 15000;
        clearTimeout(timerID);
        timerID = setTimeout(() => dialogClassUpElement.show(), timer);
      } else {
        clearTimeout(timerID);
      }
    };
    document.addEventListener('mousemove', handleTimeout);
    document.addEventListener('touchmove', handleTimeout);
    document.addEventListener('keypress', handleTimeout);
  }
};
export const initDialogClassUp = ({ dialogClassUpElement }) => {
  if (dialogClassUpElement) {
    setTrigger({
      dialogClassUpElement,
    });
    const closeButton = dialogClassUpElement.querySelector('.icon-menu');
    closeButton && closeButton.addEventListener('click', () => dialogClassUpElement.hide());
    dialogClassUpElement.addEventListener('sl-hide', () => {
      modalShowed = 1;
      const closeModalCount = localStorage.getItem('closeModalCount');
      if (closeModalCount && closeModalCount != 2) {
        localStorage.setItem('closeModalCount', Number(localStorage.getItem('closeModalCount')) + 1);
      } else {
        localStorage.setItem('closeModalCount', 1);
      }
    });
    initForm(dialogClassUpElement.querySelector('.form'));
  }
};
