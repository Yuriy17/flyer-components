import { validationRules } from './validationRules.js';

export const validateField = (field, rules, errorElement) => {
  const value = field.type === 'checkbox' ? field.checked : field.value;
  let errorMessage = '';

  rules.forEach((rule) => {
    const [ruleName, ruleValue] = rule.split(':');
    const validationFunction = validationRules[ruleName];
    if (validationFunction) {
      const result = validationFunction(value, ruleValue);
      if (result !== true) {
        errorMessage = result;
      }
    }
  });

  if (errorMessage) {
    field.setCustomValidity(errorMessage);
    if (errorElement) {
      errorElement.textContent = errorMessage;
    } else {
      console.log('🚀 ~ validateField ~ field:', field);
    }
  } else {
    field.setCustomValidity('');
    errorElement.textContent = '';
  }

  field.reportValidity();
};
