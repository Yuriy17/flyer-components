import { initForm } from 'src/assets/js/services/form/initForm.js';

export const initDialogFreeQuote = ({ dialogFreeQuote }) => {
  if (dialogFreeQuote) {
    const closeButton = dialogFreeQuote.querySelector('.icon-menu');
    initForm(dialogFreeQuote.querySelector('.form'));
    closeButton && closeButton.addEventListener('click', () => dialogFreeQuote.hide());
  }
};
