import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Checkbox } from '../components/Checkbox';
import { Button } from '../components/Button';
import sampleFormContentTemplate from 'src/templates/layouts/sampleFormContent.ejs';
import { FormField } from '../components/FormField';

// https://github.com/shoelace-style/shoelace/discussions/1163#discussioncomment-4832774
export const SampleForm = ({ parentElement }) => {
  const formConf = {
    nameInput: {
      name: 'name',
      placeholder: 'type name',
      required: true,
      label: 'Name',
      autocomplete: 'off',
      errorText: 'custom error of Name',
    },
    animalSelect: {
      name: 'animalSelect',
      placeholder: 'select animal',
      required: true,
      label: 'Select animal',
      autocomplete: 'off',
      errorText: 'custom error of animal select',
    },
    commentTextarea: {
      name: 'comment',
      placeholder: 'type in textarea',
      required: true,
      label: 'Comment',
      autocomplete: 'off',
      errorText: 'custom error of comment textarea',
    },
    submitCheckbox: {
      name: 'checkbox',
      required: true,
      label: 'Checkbox',
      autocomplete: 'off',
      errorText: 'custom error of Checkbox',
    },
    submitButton: {
      type: 'submit',
      variant: 'primary',
      content: 'Submit',
    },
  };
  const callbackAfterPaste = async (formElement) => {
    // const usernameInput = formElement.querySelector('[name="username"]');
    // const passwordInput = formElement.querySelector('[name="password"]');

    // formElement.addEventListener('submit', (event) => {
    //   console.log("🚀 ~ formElement.addEventListener ~ event:", event)
    //   const formData = new FormData(formElement);
    //   console.log("🚀 ~ formElement.addEventListener ~ formData:", formData)
    //   // const username = formData.get('username');
    //   // const password = formData.get('password');

    //   event.preventDefault();

    //   // // Reset validation
    //   // usernameInput.removeAttribute('data-error');
    //   // passwordInput.removeAttribute('data-error');

    //   // //
    //   // // Hit the server and check for a response
    //   // //

    //   // // Check username
    //   // if (username !== 'test') {
    //   //   usernameInput.setAttribute('data-error', 'This username is not recognized.');
    //   // }

    //   // // Check password
    //   // if (password !== 'test') {
    //   //   passwordInput.setAttribute('data-error', 'This password is incorrect.');
    //   // }

    //   // if (form.querySelector('[data-error]')) {
    //   //   animation.play = true;
    //   // } else {
    //   //   setTimeout(() => alert('All form fields are valid'), 100);
    //   // }
    // });
    // Wait for controls to be defined before attaching form listeners
    await Promise.all([
      customElements.whenDefined('sl-button'),
      customElements.whenDefined('sl-input'),
      customElements.whenDefined('sl-textarea'),
      customElements.whenDefined('sl-select'),
      customElements.whenDefined('sl-checkbox'),
    ]).then(() => {
      const fields = [...formElement.querySelectorAll('.form__field')];
      const errorFields = fields.map((field) => field.querySelector('div[id$=-error]'));
      // A form control is invalid
      formElement.addEventListener(
        'sl-invalid',
        (event) => {
          console.log(event.target, 1212);
          // Suppress the browser's constraint validation message
          event.preventDefault();
          errorFields.forEach((errorField) => {
            errorField.textContent = errorField.dataset.text || `Error: ${event.target.validationMessage}`;
            errorField.hidden = false;
          });

          event.target.focus();
        },
        { capture: true } // you must use capture since sl-invalid doesn't bubble!
      );

      // Handle form submit
      formElement.addEventListener('submit', (event) => {
        event.preventDefault();
        fields.for;
        // nameError.hidden = true;
        // nameError.textContent = '';
        setTimeout(() => alert('All fields are valid'), 50);
      });

      // Handle form reset
      formElement.addEventListener('reset', (event) => {
        console.log('🚀 ~ formElement.addEventListener ~ event:', event);
        // nameError.hidden = true;
        // nameError.textContent = '';
      });
    });
  };
  const form = Form({
    callbackAfterPaste,
    parentElement,
    isReturnElement: true,
    templateProps: {
      content: sampleFormContentTemplate({
        nameInput: FormField({
          templateProps: {
            content: Input({
              templateProps: {
                ...formConf.nameInput,
              },
            }),
            name: formConf.nameInput.name,
            errorText: formConf.nameInput.errorText,
          },
        }),
        animalSelect: FormField({
          templateProps: {
            content: Select({
              templateProps: {
                ...formConf.animalSelect,
              },
            }),
            name: formConf.animalSelect.name,
            errorText: formConf.animalSelect.errorText,
          },
        }),
        commentTextarea: FormField({
          templateProps: {
            content: Textarea({
              templateProps: {
                ...formConf.commentTextarea,
              },
            }),
            name: formConf.commentTextarea.name,
            errorText: formConf.commentTextarea.errorText,
          },
        }),
        submitCheckbox: FormField({
          templateProps: {
            content: Checkbox({
              templateProps: {
                ...formConf.submitCheckbox,
              },
            }),
            name: formConf.submitCheckbox.name,
            errorText: formConf.submitCheckbox.errorText,
          },
        }),
        submitButton: Button({
          templateProps: {
            type: 'submit',
            variant: 'primary',
            content: 'Submit',
          },
        }),
      }),
      classes: 'form sample-form inline-validation',
    },
  });
  console.log(form);
  return form;
};
