export const initDialogPartners = ({ triggerButton }) => {
  if (triggerButton) {
    const dialogPartners = document.querySelector('.dialog-partners');
    if (dialogPartners) {
      triggerButton.addEventListener('click', () => {
        dialogPartners.show();
      });
    }
  }
};
