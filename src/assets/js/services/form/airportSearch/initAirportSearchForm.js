
import { handleUserInput } from './eventHandlers.js';

export const handleSearchInputInit = ({ inputSearchElement }) => {
  const isSlComponent = inputSearchElement.tagName.includes('SL-');
  let inputBox = inputSearchElement;
  const handleInput = () => {
    inputSearchElement.querySelectorAll('input[type="hidden"]').forEach((hiddenInput) => (hiddenInput.value = ''));
    handleUserInput(inputBox, inputSearchElement);
  };

  if (isSlComponent) {
    inputBox.addEventListener('sl-input', handleInput);
  } else {
    inputBox = inputSearchElement.querySelector('input');
    inputBox.addEventListener('input', handleInput);
  }
}

export const initAirportSearchForm = ({ containerElement }) => {
  const inputSearchElements = containerElement.querySelectorAll('.search-input');

  inputSearchElements.forEach((inputSearchElement) => handleSearchInputInit({inputSearchElement}));
};

