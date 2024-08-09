//AirDatepicker style
import 'air-datepicker/air-datepicker.css';

import AirDatepicker from 'air-datepicker';
import { validateField } from './validateField';
import { initTelInput } from '../initTelInput';
import { airLlocale, airMinDate, airStartDate } from '../../helpers/constants';

export const setupField = ({ formElement, fieldName }) => {
  const field = formElement.querySelector(`[name="${fieldName}"]`);
  let fieldObject;

  if(field) {
    const fieldBlock = field.parentElement;
    if(fieldName.includes('phone')) {
      // Initialize intl-tel-input for phone fields
      fieldObject = initTelInput(field);
      field.addEventListener('blur', () =>
        checkFieldRules({
          field,
          validationStarted: !!formElement.dataset.validationStarted,
        })
      );
    } else if(fieldName.includes('date')) {
      
      const dateConfig = {
        locale: airLlocale,
        startDate: airStartDate,
        minDate: airMinDate,
        onSelect: ({ date, formattedDate, datepicker }) => {
          // console.log('🚀 ~ setupField ~ formattedDate:', formattedDate);
          // console.log('🚀 ~ setupField ~ date:', date);
          // console.log('🚀 ~ setupField ~ field:', field.value);
          // console.log('🚀 ~ setupField ~ datepicker:', datepicker.selectedDates);
          // console.log('🚀 ~ setupField ~ datepicker:', datepicker.formatDate(datepicker.viewDate, ));

          // const x = checkFieldRules({
          //   field,
          //   validationStarted: !!formElement.dataset.validationStarted,
          //   libsObject: datepicker,
          // });
          // console.log("🚀 ~ setupField ~ x:", x);
          field.dispatchEvent(new Event('change'));
        },
        onShow: (isFinished) => isFinished || fieldBlock.classList.add('active'),
        onHide: (isFinished) => isFinished || fieldBlock.classList.remove('active'),
      };
      const { params } = field.dataset;

      if(params) {
        const paramsRules = params.split(';');
        paramsRules.forEach((rule) => {
          const [ruleName, ruleValue] = rule.split(':');

          dateConfig[ruleName] = ruleValue || true;
        });
      }
      // Initialize AirDatepicker for date fields
      fieldObject = new AirDatepicker(field, dateConfig);

    }
  }
  return fieldObject;
};

export const setupStaticFields = ({ formElement, fieldNames }) => {
  const resultLibsObject = {};
  fieldNames.forEach((fieldName) => {
    const setupedField = setupField({ formElement, fieldName });
    if (setupedField) {
      resultLibsObject[fieldName] = setupedField;
    }
  });

  return resultLibsObject;
};

export const checkFieldRules = ({ field, validationStarted, libObjects }) => {
  if (validationStarted) {
    const rules = field.dataset.validate?.split(';');
    // const {parentElement} = input.getAttribute('type') === 'phone' ? input.parentElement : input;
    const infoElement = field.querySelector('sl-tooltip');
    return rules && validateField({ field, rules, infoElement, libObjects });
  }
};
export const fieldsSetupValidation = ({ fields, validationStarted, trigger, addListener, libObjects }) => {
  if (fields && fields.length) {
    if (addListener) {
      fields.forEach((field) => {
        const isSlComponent = field.tagName.includes('SL-');
        let isTextType = false;
        let eventName, input;

        if (isSlComponent) {
          input = field;
        } else {
          input = field.querySelector('input');
        }
        if (input) {
          switch (input.getAttribute('type')) {
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
            eventName = isSlComponent ? 'sl-input' : 'input';
          } else {
            eventName = isSlComponent ? 'sl-change' : 'change';
          }

          input.addEventListener(eventName, (e) => {
            e.stopPropagation();
            checkFieldRules({ field, validationStarted, libObjects });
          });
        }
      });
    }

    if (trigger) {
      let isValidForm = true;

      fields.forEach((field) => {
        const isValid = checkFieldRules({ field, validationStarted, libObjects });
        isValid || (isValidForm = false);
      });

      return isValidForm;
    }
  }
};
