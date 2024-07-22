import drawerBurgerTemplate from 'src/templates/layouts/drawerContent/drawerBurger.ejs';
import menuTemplate from 'src/templates/components/menu/menu.ejs';
import socialsTemplate from 'src/templates/layouts/socials.ejs';
import menuButtonTemplate from 'src/templates/components/button/slButton.ejs';
import burgerButtonTemplate from 'src/templates/layouts/burgerButton.ejs';
import drawerTemplate from 'src/templates/components/drawer/drawer.ejs';
import { gridBreakpoints, insertPosition, preheaderHeight } from '../../helpers/constants';
import { pasteByInsertPosition } from '../../helpers/helpers';

const initBurgerDrawer = () => {
  let breakPoint = gridBreakpoints.xxl;

  Object.keys(gridBreakpoints).forEach((key) => {
    if (innerWidth <= gridBreakpoints[key] && innerWidth < breakPoint) {
      breakPoint = key;
    }
  });

  if (gridBreakpoints[breakPoint] <= gridBreakpoints.xlg) {
    const drawerClasses = 'drawer-burger';
    const burgerClasses = 'icon-menu';
    let drawer = document.querySelector(`.${drawerClasses}`);

    if (!drawer) {
      const drawerLayout = drawerTemplate({
        classes: drawerClasses,
        content: drawerBurgerTemplate({
          menuButton: menuButtonTemplate({
            classes: 'btn-md btn-primary',
            content: 'Get a Quote',
          }),
          menu: menuTemplate({
            classes: 'drawer-burger__menu-list',
            items: [
              {
                text: 'About Us',
                href: '/aboutus',
                linkClasses: 'link',
              },
              {
                text: 'Destinations',
                href: 'https://flyer-club.com/p/bestdeals/',
                linkClasses: 'link link_active',
              },
              {
                text: 'How to book',
                href: '/booking',
                linkClasses: 'link',
              },
              {
                text: 'Partners',
                href: '/partners',
                linkClasses: 'link',
              },
              {
                text: 'Faq',
                href: '/faq',
                linkClasses: 'link',
              },
              {
                text: 'Reviews',
                href: '/reviews',
                linkClasses: 'link',
              },
              {
                text: 'Contacts',
                href: '/contacts',
                linkClasses: 'link',
              },
            ],
          }),
          socials: socialsTemplate(),
        }),
      });
      const burgerButtonLayout = burgerButtonTemplate({
        classes: burgerClasses,
      });

      pasteByInsertPosition({
        insertPositionType: insertPosition.afterend,
        parentElement: document.body.querySelector('& > header'),
        child: burgerButtonLayout,
      });

      const burgerButton = document.querySelector('.icon-menu');

      pasteByInsertPosition({
        insertPositionType: insertPosition.afterend,
        parentElement: document.body.querySelector('& > footer'),
        child: drawerLayout,
      });

      drawer = document.querySelector(`.${drawerClasses}`);
      drawer = document.querySelector(`.${drawerClasses}`);

      const setStickyBurger = (pos) => {
        burgerButton.style.top = `${pos > preheaderHeight[breakPoint] ? 0 : preheaderHeight[breakPoint] - pos}px`;
      };
      window.lastKnownScrollPosition = 0;
      window.ticking = false;

      // call on init
      setStickyBurger(window.scrollY);
      addEventListener('scroll', () => {
        window.lastKnownScrollPosition = window.scrollY;

        setStickyBurger(window.lastKnownScrollPosition);
        // if (!window.ticking) {
        //   window.requestAnimationFrame(() => {
        //     setStickyBurger(window.lastKnownScrollPosition);
        //     window.ticking = false;
        //   });

        //   window.ticking = true;
        // }
      });
      burgerButton.addEventListener('click', () => (drawer.hasAttribute('open') ? drawer.hide() : drawer.show()));
      drawer.addEventListener('sl-show', () => {
        if (window.lastKnownScrollPosition < preheaderHeight[breakPoint]) {
          window.scrollTo({
            top: preheaderHeight[breakPoint],
            left: 0,
            behavior: 'smooth',
          });
        }
        burgerButton.classList.add('icon-menu_open');
      });
      drawer.addEventListener('sl-hide', () => {
        burgerButton.classList.remove('icon-menu_open');
      });
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
