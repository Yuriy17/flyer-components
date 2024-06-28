import { Dialog } from '../components/Dialog';
import { insertPosition } from '../helpers/constants';
import { SampleForm } from '../layouts/SampleForm';

export const initSampleDialog = () => {
  const body = document.querySelector('body');
  const dialogElement = Dialog({
    parentElement: body,
    isReturnElement: true,
    insertPositionType: insertPosition.beforeend,
    templateProps: {
      classes: 'dialog-overview',
      content: '',
    },
  });
  console.log('🚀 ~ initSampleDialog ~ dialogElement:', dialogElement);
  SampleForm({
    parentElement: dialogElement,
  });
  if (dialogElement) {
    const openButton = document.querySelector('.sl-button');
    // const closeButton = dialogElement.querySelector('sl-button[slot="footer"]');

    openButton.addEventListener('click', () => dialogElement.show());
    // closeButton.addEventListener('click', () => dialogElement.hide());
  }
};
