import { fieldsSetupValidation, setupStaticFields } from './setupFields';
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
import { initAirportSearchForm } from './airportSearch/initAirportSearchForm';

export const addDynamicGroup = async ({ groupIndex, formElement, parentElement }) => {
  const formName = formElement.getAttribute('id');

  if(parentElement) {
    let dynamicLibObjects;
    const buttonAddConfig = {
      classes: 'btn-prefix-icon dynamic-group__button dynamic-group__button-add',
      icon: {
        src: `${import.meta.env.VITE_STATIC_PATH}/icons/plus-blue.svg`,
        slot: 'prefix',
        alt: 'plus icon',
      },
      variant: 'primary',
      content: 'Add flight',
      outline: 'true',
    };

    const buttonDeleteConfig = {
      classes: 'btn-prefix-icon dynamic-group__button dynamic-group__button-delete',
      icon: {
        src: `${import.meta.env.VITE_STATIC_PATH}/icons/trash-white.svg`,
        slot: 'prefix',
        alt: 'plus icon',
      },
      variant: 'danger',
      content: 'Delete',
    };
    const dynamicGroupElements = parentElement.querySelectorAll('.dynamic-group');
    let addButton;
    if(dynamicGroupElements && dynamicGroupElements.length) {
      addButton = dynamicGroupElements[0].querySelector('.dynamic-group__button-add');
      if (addButton && dynamicGroupElements.length === 4) {
        addButton.disabled = true;
      } 
    }
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
              classes: 'form__input form__field input_from search-input',
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
              classes: 'form__input form__field search-input',
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
        buttonAdd: buttonTemplate(buttonAddConfig),
        buttonDelete: buttonTemplate(buttonDeleteConfig),
      },
      isReturnElement: true,
      callbackAfterPaste: (dynamicGroup) => {
        const deleteButton = dynamicGroup.querySelector('.dynamic-group__button-delete');
        deleteButton &&
          deleteButton.addEventListener('click', () => {
            if (groupIndex > 0) {
              dynamicGroup.remove();
            }
            if (addButton && addButton.disabled) {
              addButton.disabled = false;
            }
          });

        const fields = dynamicGroup.querySelectorAll('[data-validate]');

        // Initialize AirDatepicker for dynamic fields
        dynamicLibObjects = setupStaticFields({
          fieldNames: [`flight[${groupIndex}]['date']`],
          formElement,
        });
        fieldsSetupValidation({
          fields,
          validationStarted: !!formElement.dataset.validationStarted,
          libsObject: dynamicLibObjects,
          addListener: true,
        });
        
        initAirportSearchForm({
          containerElement: dynamicGroup
        });
      },
    });

    return {
      dynamicGroup,
      dynamicLibObjects,
    };
  }
};
