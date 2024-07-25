import { validateField } from './validateField';
import AirDatepicker from 'air-datepicker';
import { initTelInput } from '../initTelInput';

export const setupField = ({ formElement, fieldName, validationStarted }) => {
  const field = formElement.querySelector(`[name="${fieldName}"]`);
  let fieldObject;

  if (field) {
    if (fieldName.includes('phone')) {

      // Initialize intl-tel-input for phone fields
      fieldObject = initTelInput(field);
      field.addEventListener('blur', () =>
        checkFieldRules({
          field,
          validationStarted,
        })
      );

    } else if (fieldName.includes('date')) {
      // Initialize AirDatepicker for date fields
      fieldObject = new AirDatepicker(field);

      field.addEventListener('blur', () =>
        checkFieldRules({
          field,
          validationStarted,
        })
      );
    }
  }
  return fieldObject;
};

export const setupStaticFields = ({ formElement, fieldNames, validationStarted }) => {
  const resultLibsObject = {};

  fieldNames.forEach((fieldName) => {
    resultLibsObject[fieldName] = setupField({ formElement, fieldName, validationStarted });
  });

  return resultLibsObject;
};

export const checkFieldRules = ({ field, validationStarted, libsObject }) => {
  if (validationStarted) {
    const rules = field.getAttribute('data-validate').split(';');
    // const {parentElement} = input.getAttribute('type') === 'phone' ? input.parentElement : input;
    const infoElement = field.querySelector('sl-tooltip');
    return validateField({ field, rules, infoElement, libsObject });
  }
};
export const fieldsSetupValidation = ({ fields, validationStarted, trigger, addListener, libsObject }) => {
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

        field.addEventListener(eventName, () => checkFieldRules({ field, validationStarted, libsObject }));
      });
    }

    if (trigger) {
      let isValidForm = true;

      fields.forEach((field) => {
        const isValid = checkFieldRules({ field, validationStarted, libsObject });
        isValid || (isValidForm = false);
      });

      return isValidForm;
    }
  }
};
