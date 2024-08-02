import { fieldsSetupValidation, setupField, setupStaticFields } from './setupFields';
import { DynamicGroup } from '../../components/form/DynamicGroup';
import dynamicGroupContentTemplate from 'src/templates/layouts/forms/flightForm/dynamicGroupContent.ejs';
import buttonTemplate from 'src/templates/components/button/slButton.ejs';
import { Input } from 'src/assets/js/components/Input';
import fieldTooltipTemplate from 'src/templates/layouts/tooltips/fieldTooltip.ejs';
import toHiddenInputsTemplate from 'src/templates/layouts/formFields/toHiddenInputs.ejs';
import fromHiddenInputsTemplate from 'src/templates/layouts/formFields/fromHiddenInputs.ejs';
import formFieldTemplate from 'src/templates/components/form/formField.ejs';
import fieldTemplate from 'src/templates/layouts/formFields/formField.ejs';
import { insertPosition } from '../../helpers/constants';

export const addDynamicGroup = async ({ groupIndex, formElement, parentElement }) => {
  const formName = formElement.getAttribute('id');
  // const dynamicGroups = formElement.querySelectorAll('.dynamic-group');

  if (parentElement) {
    const dynamicGroup = await DynamicGroup({
      parentElement,
      insertPositionType: insertPosition.beforeend,
      templateProps: {
        groupIndex,
        dynamicContent: dynamicGroupContentTemplate({
          groupIndex,
          dateCount: 1,
          formName,
          fromContent: Input({
            templateProps: {
              tooltip: true,
              classes: 'form__input form__field',
              name: `flight[${groupIndex}]["from"]`,
              id: `${formName}From${groupIndex}`,
              validate: 'minLength:2;required;letters',
              label: 'From',
              placeholder: 'New York (NY)',
              autocomplete: true,
              content: `${fromHiddenInputsTemplate({
                groupIndex,
                cityAirportVal: '',
                cityCodeVal: '',
                originEntityIdVal: '',
              })}`,
            },
          }),
          toContent: Input({
            templateProps: {
              tooltip: true,
              classes: 'form__input form__field',
              name: `flight[${groupIndex}]["to"]`,
              id: `${formName}To${groupIndex}`,
              validate: 'minLength:2;required;letters',
              label: 'To',
              placeholder: 'Los Angeles (LA)',
              autocomplete: true,
              content: `${toHiddenInputsTemplate({
                groupIndex,
                cityAirportToVal: '',
                cityCodeToVal: '',
                destinationEntityId: '',
              })}`,
            },
          }),
          dateContent: formFieldTemplate({
            tooltip: true,
            content: fieldTemplate({
              name: `flight[${groupIndex}]['date']`,
              id: `${formName}Date${groupIndex}`,
              label: 'Date',
              readonly: 'readonly',
              placeholder: '13 Apr 2024',
              initParams: 'autoClose:true;addon:right;multipleDatesSeparator: – ;dateFormat:d MMM yyyy',
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
            if (groupIndex > 0) {
              dynamicGroup.remove();
            }
          });

        const fields = dynamicGroup.querySelectorAll('[data-validate]');

        // Initialize AirDatepicker for dynamic fields
        const libsObject = setupStaticFields({
          fieldNames: [`flight[${groupIndex}]['date']`],
          formElement,
        });
        fieldsSetupValidation({
          fields,
          validationStarted: !!formElement.dataset.validationStarted,
          libsObject,
          addListener: true,
        });

        setupField({
          formElement,
          fieldName: `flight[${groupIndex}]['date']`,
        });
      },
    });
    console.log('🚀 ~ addDynamicGroup ~ dynamicGroup:', dynamicGroup);

    return dynamicGroup;
  }
};
