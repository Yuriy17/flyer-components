import { checkValidate, validateText } from "../services/validation";

export const getValidationClasses = (form) => {
  if (form.classList.contains('white')) {
    return {
      errorValid: 'errorValid_1',
      errorValidText: 'errorValidText_1',
      errorBlock: 'error_block_1',
      errorNumberValid: 'errorNumberValid_1'
    };
  }
  return {
    errorValid: 'errorValid_2',
    errorValidText: 'errorValidText_2',
    errorBlock: 'error_block_2',
    errorNumberValid: 'errorNumberValid_2'
  };
};

export const clearPreviousErrors = (form, errorValid, errorValidText, errorBlock) => {
  form.querySelectorAll(`.${errorValid}`).forEach((el) => el.classList.remove(errorValid));
  form.querySelectorAll(`.${errorValidText}`).forEach((el) => el.classList.remove(errorValidText));
  form.querySelectorAll(`.${errorBlock}`).forEach((el) => el.remove());
};

export const shouldValidate = (element) => {
  return !element.hasAttribute('disabled') && element.hasAttribute('data-validation');
};

export const validateField = (element, errorValid, errorNumberValid, errorBlock) => {
  let isValid = true;
  const rules = element.getAttribute('data-validation').split('|');

  for (const rule of rules) {
    const isRuleValid = checkValidate(rule, element);
    if (!isRuleValid) {
      isValid = false;
      showError(element, rule, errorValid, errorBlock);
      break;
    }
  }

  if (element.type === 'tel' && (!validateText(element, 4) || element.classList.contains(errorNumberValid))) {
    isValid = false;
    showPhoneError(element, errorValid, errorBlock);
  }

  return isValid;
};

const showError = (element, rule, errorValid, errorBlock) => {
  const message = getErrorMessage(rule);
  if (element.closest('.search-input')) {
    element.closest('.search-input').classList.add(errorValid);
  } else if (element.closest('.date')) {
    element.closest('.date').classList.add(errorValid);
  } else {
    element.classList.add(errorValid);
    element.insertAdjacentHTML('afterend', `<div class='${errorBlock}'>${message}</div>`);
  }
};

const showPhoneError = (element, errorValid, errorBlock) => {
  element.classList.add(errorValid);
  const parent = element.closest('p') || element.closest('.section-form__item');
  parent.insertAdjacentHTML('beforeend', `<div class='${errorBlock}'>Wrong phone format</div>`);
};

const getErrorMessage = (rule) => {
  if (rule.includes('min')) {
    const minLength = rule.match(/\[(.*?)\]/)[1];
    return `Minimum field length ${minLength} character(s)!`;
  }
  if (rule.includes('max')) {
    const maxLength = rule.match(/\[(.*?)\]/)[1];
    return `Maximum field length ${maxLength} character(s)!`;
  }
  if (rule.includes('countChars')) {
    const countChars = rule.match(/\[(.*?)\]/)[1];
    return `Required number of characters in the field ${countChars} character(s)!`;
  }
  return mainRules[rule];
};

// Other helper functions like validateText, validateMail, checkRule, etc. will be defined here as well.
