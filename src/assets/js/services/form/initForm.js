import { fieldsSetupValidation, setupField, setupStaticFields } from './setupFields';
import { DynamicGroup } from '../../components/form/DynamicGroup';

export const initForm = (formElementSelector) => {
  const formElement = document.querySelector(formElementSelector);
  if (formElement) {
    let validationStarted = false;
    let dynamicFieldCounter = 0;

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
          setupField(formElement, {
            fieldName: `dynamicPhone${groupIndex}`,
          });
          setupField(formElement, {
            fieldName: `dynamicDate${groupIndex}`,
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
      });
      validationStarted = true;
      alert(`Form is ${isFormValid ? 'valid' : 'invalid'}`);

      // event.preventDefault();
      // if (!form.checkValidity()) {
      //   console.log(1);
      // } else {
      //   console.log(2);
      //   const formData = new FormData(form);
      //   formData.forEach((value, key) => {
      //     console.log(key, value);
      //   });
      // }
    });

    // Initialize all static fields
    setupStaticFields({
      fieldNames: ['phone', 'date'],
      formElement,
    });
  }
};
