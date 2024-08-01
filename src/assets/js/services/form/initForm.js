import { addDynamicGroup } from './addDynamicGroup';
import { fieldsSetupValidation, setupStaticFields } from './setupFields';

export const initForm = (formElement) => {
  if (formElement) {
    let validationStarted = false;
    let dynamicFieldCounter = 0;

    // Initialize all static fields
    const libsObject = setupStaticFields({
      fieldNames: ['phone', 'date', 'passenger'],
      formElement,
    });

    const addFieldButton = formElement.querySelector('.dynamic-group__button-add');
    addFieldButton &&
      addFieldButton.addEventListener('click', () => {
        addDynamicGroup({
          groupIndex: dynamicFieldCounter,
          formElement,
          validationStarted,
        });
        dynamicFieldCounter++;
      });

    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      const fields = formElement.querySelectorAll('[data-validate]');

      // add change listener if not added before and trigger validation
      const isFormValid = fieldsSetupValidation({
        fields,
        validationStarted: true,
        trigger: true,
        addListener: !validationStarted,
        libsObject,
      });
      formElement.dataset.validationStarted = 'true';
      validationStarted = true;
      alert(`Form is ${isFormValid ? 'valid' : 'invalid'}`);
    });
  }
};
