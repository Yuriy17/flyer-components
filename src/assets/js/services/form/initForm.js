import { addDynamicGroup } from './addDynamicGroup';
import { fieldsSetupValidation, setupStaticFields } from './setupFields';

export const initForm = async (formElement) => {
  if (formElement) {
    let validationStarted = false;
    let dynamicFieldCounter = 0;

    const addDynamicGroupCallback = async ({ dynamicGroupsElement }) => {
      const dynamicField = await addDynamicGroup({
        parentElement: dynamicGroupsElement,
        groupIndex: dynamicFieldCounter,
        formElement,
      });
      dynamicFieldCounter++;
      console.log('🚀 ~ addDynamicGroupCallback ~ dynamicField:', dynamicField);
      return dynamicField;
    };
    let libsObject;
    const dynamicGroupsElement = formElement.querySelector('.dynamic-groups');
    const fieldLibsNames = ['phone', `flight[0]['date']`];
    if (dynamicGroupsElement) {
      const dynamicGroupElement = await addDynamicGroupCallback({ dynamicGroupsElement });
      const addFieldButton = dynamicGroupElement?.querySelector('.dynamic-group__button-add');
      addFieldButton?.addEventListener('click', () => addDynamicGroupCallback({ dynamicGroupsElement }));
      fieldLibsNames.push('passenger');
 
    } 
    // Initialize static lib fields
    
    libsObject = setupStaticFields({
      fieldNames: fieldLibsNames,
      formElement,
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
