import { validateField } from './validateField';
import { setupField, setupStaticFields } from './setupFields';
import { DynamicGroup } from '../../components/form/DynamicGroup';

export const initForm = (formElement) => {
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

        const inputs = dynamicGroup.querySelectorAll('[data-validate]');
        inputs.forEach((input) => {
          input.addEventListener('input', () => {
            if (validationStarted) {
              const rules = input.getAttribute('data-validate').split(';');
              // const {parentElement} = input.getAttribute('type') === 'phone' ? input.parentElement : input;
              const errorElement = input.parentElement.querySelector('.error-message');
              validateField(input, rules, errorElement);
            }
          });
        });

        // Initialize intl-tel-input and AirDatepicker for dynamic fields
        setupField(
          {
            fieldName: `dynamicPhone${groupIndex}`,
          },
          formElement
        );
        setupField(
          {
            fieldName: `dynamicDate${groupIndex}`,
          },
          formElement
        );
      },
    });
  };

  const addFieldButton = document.getElementById('addField');
  addFieldButton.addEventListener('click', () => {
    setupDynamicGroup(dynamicFieldCounter);
    dynamicFieldCounter++;
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    validationStarted = true;

    const allInputs = document.querySelectorAll('[data-validate]');
    allInputs.forEach((input) => {
      const rules = input.getAttribute('data-validate').split(';');
      const errorElement = input.parentElement.querySelector('.error-message');
      validateField(input, rules, errorElement);
    });

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
};
