import { Form } from '../../components/form/Form';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import { Checkbox } from '../../components/Checkbox';
import { Button } from '../../components/Button';
import sampleFormContentTemplate from 'src/templates/layouts/forms/sampleForm/sampleFormContent.ejs';
import { FormField } from '../../components/form/FormField';
import { formConf } from './sampleFormConf';
import { initForm } from '../../services/form/initForm';

// https://github.com/shoelace-style/shoelace/discussions/1163#discussioncomment-4832774
export const SampleForm = ({ parentElement }) => {
  const sampleForm = Form({
    callbackAfterPaste: initForm,
    parentElement,
    isReturnElement: true,
    templateProps: {
      classes: 'form sample-form inline-validation',
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
    },
  });

  return sampleForm;
};
