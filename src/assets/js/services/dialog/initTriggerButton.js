import { debouncedInitOnResize } from 'src/assets/js/utils/utils';
import { gridBreakpoints } from 'src/assets/js/helpers/constants';

export const initTriggerButton = ({ dialogFlight }) => {
  let isMobileClickListenerAdded = false;
  let isDesktopClickListenerAdded = false;
  const triggerInitFlightDialog = ({ dialogFlight }) => {
    const addClickLitener = ({ triggerButton }) => {
      triggerButton &&
        triggerButton.addEventListener('click', () => {
          dialogFlight.show();
        });
    };

    if (innerWidth < gridBreakpoints.xmd && !isMobileClickListenerAdded) {
      addClickLitener({ triggerButton: document.querySelector('.drawer-burger__content > .btn-primary') });
      isMobileClickListenerAdded = true;
    } else if (!isDesktopClickListenerAdded && innerWidth >= gridBreakpoints.xmd) {
      isDesktopClickListenerAdded = true;
      addClickLitener({
        triggerButton: document.querySelector('.header__right-side .btn-primary'),
      });
    }
  };
  debouncedInitOnResize({
    initFunction: triggerInitFlightDialog,
    params: { dialogFlight },
  });
};
