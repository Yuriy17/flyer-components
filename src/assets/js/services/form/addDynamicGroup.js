import { fieldsSetupValidation, setupField, setupStaticFields } from './setupFields';
import { DynamicGroup } from '../../components/form/DynamicGroup';
import dynamicGroupContentTemplate from 'src/templates/layouts/forms/flightForm/dynamicGroupContent.ejs';
import buttonTemplate from 'src/templates/components/button/slButton.ejs';
import { Input } from 'src/assets/js/components/Input';
import fieldTooltipTemplate from 'src/templates/layouts/tooltips/fieldTooltip.ejs';
import toHiddenInputsTemplate from 'src/templates/layouts/formFields/toHiddenInputs.ejs';
import fromHiddenInputsTemplate from 'src/templates/layouts/formFields/fromHiddenInputs.ejs';
import formFieldTemplate from 'src/templates/components/form/formField.ejs';
import dateFieldTemplate from 'src/templates/layouts/formFields/dateField.ejs';
import { insertPosition } from '../../helpers/constants';

export const addDynamicGroup = ({ groupIndex, formElement, validationStarted }) => {
  let parentElement = formElement.querySelector('.dynamic-groups');
  console.log("🚀 ~ addDynamicGroup ~ parentElement:", parentElement);
  const formName = formElement.getAttribute('id');
  // const dynamicGroups = formElement.querySelectorAll('.dynamic-groups');
  
  parentElement &&
    DynamicGroup({
      parentElement,
      insertPositionType: insertPosition.beforebegin,
      templateProps: {
        groupIndex,
        dynamicContent: dynamicGroupContentTemplate({
          groupIndex,
          dateCount: 1,
          formName,
          fromContent: Input({
            templateProps: {
              classes: 'form__input form__field',
              name: `flight[${groupIndex}]["from"]`,
              id: `${formName}From${groupIndex}`,
              validate: 'minLength:2;required;letters',
              label: 'From',
              placeholder: 'New York (NY)',
              autocomplete: true,
              content: `${fieldTooltipTemplate()}${fromHiddenInputsTemplate({
                groupIndex,
                cityAirportVal: '',
                cityCodeVal: '',
                originEntityIdVal: '',
              })}`,
            },
          }),
          toContent: Input({
            templateProps: {
              classes: 'form__input form__field',
              name: `flight[${groupIndex}]["to"]`,
              id: `${formName}To${groupIndex}`,
              validate: 'minLength:2;required;letters',
              label: 'To',
              placeholder: 'Los Angeles (LA)',
              autocomplete: true,
              content: `${fieldTooltipTemplate()}${toHiddenInputsTemplate({
                groupIndex,
                cityAirportToVal: '',
                cityCodeToVal: '',
                destinationEntityId: '',
              })}`,
            },
          }),
          dateContent: formFieldTemplate({
            content: dateFieldTemplate({
              name: `flight[${groupIndex}]['date_start']`,
              id: `${formName}Date${groupIndex}`,
              label: 'Date',
              readonly: 'readonly',
              placeholder: '13 Apr 2024',
              initParams: 'autoClose:true;addon:right;multipleDatesSeparator: – ;range;dateFormat:d MMM yyyy',
              fieldTooltipContent: fieldTooltipTemplate(),
            }),
            classes: 'form__input form__date',
            validate: `required;date:1`,
          }),
        }),
        buttonAdd: buttonTemplate({
          classes: 'btn-prefix-icon dynamic-group__button dynamic-group__button-add',
          icon: {
            src: `${import.meta.env.VITE_STATIC_PATH}/icons/plus-blue.svg`,
            slot: 'prefix',
            alt: 'plus icon',
          },
          variant: 'primary',
          content: 'Add flight',
          outline: 'true',
        }),
        buttonDelete: buttonTemplate({
          classes: 'btn-prefix-icon dynamic-group__button dynamic-group__button-delete',
          icon: {
            src: `${import.meta.env.VITE_STATIC_PATH}/icons/trash-white.svg`,
            slot: 'prefix',
            alt: 'plus icon',
          },
          variant: 'danger',
          content: 'Delete',
        }),
      },
      isReturnElement: true,
      callbackAfterPaste: (dynamicGroup) => {
        const deleteButton = dynamicGroup.querySelector('.dynamic-group__button-delete');
        deleteButton &&
          deleteButton.addEventListener('click', () => {
            if(groupIndex > 0) {
              dynamicGroup.remove();
            }
          });

        const fields = dynamicGroup.querySelectorAll('[data-validate]');

        // Initialize AirDatepicker for dynamic fields
        const libsObject = setupStaticFields({
          fieldNames: [`flight[${groupIndex}]['date_start']`],
          formElement,
        });
        fieldsSetupValidation({ fields, validationStarted, libsObject, addListener: true });

        setupField({
          formElement,
          fieldName: `flight[${groupIndex}]['date_start']`,
        });
      },
    });
};
