
import { handleUserInput } from './eventHandlers.js';

export const initAirportSearchForm = ({ formElement }) => {
  const inputSearchElements = formElement.querySelectorAll('.search-input');

  inputSearchElements.forEach((inputSearchElement) => {
    const inputBox = inputSearchElement.querySelector('input');

    inputBox.addEventListener('input', () => {
      inputSearchElement.querySelectorAll('input[type="hidden"]').forEach((hiddenInput) => (hiddenInput.value = ''));
      handleUserInput(inputBox, inputSearchElement);
    });
  });
};

