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

export const checkFieldRules = ({ field, validationStarted }) => {
  console.log('🚀 ~ checkFieldRules ~ field:', field);
  if (validationStarted) {
    const rules = field.getAttribute('data-validate').split(';');
    // const {parentElement} = input.getAttribute('type') === 'phone' ? input.parentElement : input;
    const infoElement = field.querySelector('sl-tooltip');
    return validateField({ field, rules, infoElement });
  }
};
export const fieldsSetupValidation = ({ fields, validationStarted, trigger, addListener }) => {
  if (fields && fields.length) {
    if (addListener) {
      fields.forEach((field) => {
        let isTextType = false;
        let eventName;
        switch (field.getAttribute('type')) {
          case 'text':
          case 'number':
          case 'email':
          case 'password':
          case 'search':
          case 'url':
            isTextType = true;
            break;

          default:
            break;
        }

        if (isTextType) {
          eventName = field.tagName.includes('SL-') ? 'sl-input' : 'input';
        } else {
          eventName = field.tagName.includes('SL-') ? 'sl-change' : 'change';
        }

        field.addEventListener(eventName, () => checkFieldRules({ field, validationStarted }));
      });
    }

    if (trigger) {
      let isValidForm = true;

      fields.forEach((field) => {
        const isValid = checkFieldRules({ field, validationStarted });
        isValid || (isValidForm = false);
      });

      return isValidForm;
    }
  }
};
