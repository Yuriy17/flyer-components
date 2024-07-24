import { validationRules } from './validationRules.js';

export const validateField = ({ field, rules, infoElement }) => {
  const value = field.classList.contains('form__checkbox') ? field.checked : field.value;

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
    // field.setCustomValidity(errorMessage);
    field.classList.add('form__field_error');
    field.classList.remove('form__field_success');
    infoElement?.setAttribute('content', errorMessage);
  } else {
    // field.setCustomValidity('');
    field.classList.remove('form__field_error');
    field.classList.add('form__field_success');
    infoElement?.setAttribute('content', 'validation success!');
  }

  return !errorMessage;
};
