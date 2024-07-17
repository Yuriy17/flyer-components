import drawerBurgerTemplate from 'src/templates/layouts/drawerContent/drawerBurger.ejs';
import drawerTemplate from 'src/templates/components/drawer/drawer.ejs';
import { gridBreakpoints } from '../../helpers/constants';

const initBurgerDrawer = () => {
  if (innerWidth < gridBreakpoints.xlg) {
    const drawerClass = 'drawer-burger';
    let drawer = document.querySelector(`.${drawerClass}`);
    if (!drawer) {
      drawerTemplate({
        classes: drawerClass,
        content: drawerBurgerTemplate(),
      });
      drawer = document.querySelector(`.${drawerClass}`);

      console.log('🚀 ~ initBurger ~ drawer:', drawer);
      const burgerButton = document.querySelector('.icon-menu');
      // const closeButton = drawer.querySelector('sl-button[variant="primary"]');

      burgerButton.addEventListener('click', () => (drawer.hasAttribute('open') ? drawer.hide() : drawer.show()));
    }
  }
};

export const initBurger = () => {
  // const burgerButton = document.querySelector('.icon-menu');
  // if(burgerButton) {
  // }
  initBurgerDrawer();
  addEventListener('resize', () => initBurgerDrawer());
};
