import { fieldsSetupValidation, setupField, setupStaticFields } from './setupFields';
import { DynamicGroup } from '../../components/form/DynamicGroup';

export const initForm = (formElementSelector) => {
  const formElement = document.querySelector(formElementSelector);
  if (formElement) {
    let validationStarted = false;
    let dynamicFieldCounter = 0;

    // Initialize all static fields
    const libsObject = setupStaticFields({
      fieldNames: ['phone', 'date'],
      formElement,
      validationStarted,
    });

    const setupDynamicGroup = (groupIndex) => {
      console.log('🚀 ~ setupDynamicGroup ~ groupIndex:', groupIndex);
      DynamicGroup({
        parentElement: document.getElementById('dynamicFields'),
        templateProps: {
          groupIndex,
        },
        isReturnElement: true,
        callbackAfterPaste: (dynamicGroup) => {
          console.log('🚀 ~ setupDynamicGroup ~ dynamicGroup:', dynamicGroup);
          const deleteButton = dynamicGroup.querySelector('.delete-button');
          deleteButton.addEventListener('click', () => {
            dynamicGroup.remove();
          });

          const fields = dynamicGroup.querySelectorAll('[data-validate]');
          fieldsSetupValidation({ fields, validationStarted, addListener: true });

          // Initialize intl-tel-input and AirDatepicker for dynamic fields
          setupField({
            formElement,
            fieldName: `dynamicPhone${groupIndex}`,
            validationStarted,
          });
          setupField({
            formElement,
            fieldName: `dynamicDate${groupIndex}`,
            validationStarted,
          });
        },
      });
    };

    const addFieldButton = formElement.querySelector('#addField');
    addFieldButton &&
      addFieldButton.addEventListener('click', () => {
        setupDynamicGroup(dynamicFieldCounter);
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
      validationStarted = true;
      alert(`Form is ${isFormValid ? 'valid' : 'invalid'}`);

    });
  }
};
