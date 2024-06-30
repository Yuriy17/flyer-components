import intlTelInput from 'intl-tel-input';
import { validateField } from './validateField';
import AirDatepicker from 'air-datepicker';

export const setupField = ({ formElement, fieldName }) => {
  const inputField = formElement.querySelector(`[name="${fieldName}"]`);
  if (inputField) {
    if (fieldName.includes('phone')) {
      console.log('🚀 ~ setupField ~ inputField:', inputField);
      // Initialize intl-tel-input for phone fields
      // eslint-disable-next-line no-unused-vars
      const iti = intlTelInput(inputField, {
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js',
      });

      inputField.addEventListener('blur', () => {
        const errorElement = inputField.parentElement.querySelector('.error-message');
        const rules = inputField.getAttribute('data-validate').split(';');
        validateField(inputField, rules, errorElement);
      });
    } else if (fieldName.includes('date')) {
      console.log('🚀 ~ setupField ~ fieldName:', fieldName);
      // Initialize AirDatepicker for date fields
      new AirDatepicker(inputField);

      inputField.addEventListener('blur', () => {
        const errorElement = inputField.parentElement.querySelector('.error-message');
        const rules = inputField.getAttribute('data-validate').split(';');
        validateField(inputField, rules, errorElement);
      });
    }
  }
};

export const setupStaticFields = ({ formElement, fieldNames }) => {
  fieldNames.forEach((fieldName) => setupField({ formElement, fieldName }));
};
