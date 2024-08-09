import { validationRules } from './validationRules.js';

export const validateField = ({ field, rules, infoElement, libObjects }) => {
  let input = field;
  if (field.tagName === 'DIV') {
    input = field.querySelector('input');
  }
  if (input) {
    const value = input.classList.contains('form__checkbox') ? input.checked : input.value;

    let errorMessage = '';

    rules.forEach((rule) => {
      const [ruleName, ruleValue] = rule.split(':');

      const validationFunction = validationRules[ruleName];
      if (validationFunction) {
        const result = validationFunction({ value, ruleValue, libObjects, fieldName: input.getAttribute('name') });

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
  }
};
