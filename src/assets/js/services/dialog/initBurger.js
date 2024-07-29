import drawerBurgerTemplate from 'src/templates/layouts/drawerContent/drawerBurger.ejs';
import menuTemplate from 'src/templates/components/menu/menu.ejs';
import socialsTemplate from 'src/templates/layouts/socials.ejs';
import menuButtonTemplate from 'src/templates/components/button/slButton.ejs';
import burgerButtonTemplate from 'src/templates/layouts/burgerButton.ejs';
import drawerTemplate from 'src/templates/components/drawer/drawer.ejs';
import { gridBreakpoints, insertPosition, preheaderHeight } from 'src/assets/js/helpers/constants';
import { pasteByInsertPosition } from 'src/assets/js/helpers/helpers';
import { debouncedInitOnResize } from 'src/assets/js/utils/utils';
import { getCurrentBreakpoint } from '../../helpers/helpers';

export const initBurger = () => {
  let isInitialized = false;
  const initBurgerDrawer = () => {
    if (!isInitialized && innerWidth <= gridBreakpoints.xlg) {
      const drawerClasses = 'drawer-burger';
      const burgerClasses = 'icon-menu';

      const drawerLayout = drawerTemplate({
        classes: drawerClasses,
        content: drawerBurgerTemplate({
          menuButton: menuButtonTemplate({
            classes: 'btn-sm btn-primary',
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

      const drawer = document.querySelector(`.${drawerClasses}`);
      const currentBreakpoint = getCurrentBreakpoint();
      const setStickyBurger = (pos) => {
        burgerButton.style.transform = `translateY(${pos > preheaderHeight[currentBreakpoint] ? 0 : preheaderHeight[currentBreakpoint] - pos}px)`;
      };
      window.lastKnownScrollPosition = 0;
      window.ticking = false;

      // call on init
      setStickyBurger(window.scrollY);
      addEventListener('scroll', () => {
        window.lastKnownScrollPosition = window.scrollY;

        if (!window.ticking) {
          window.requestAnimationFrame(() => {
            setStickyBurger(window.lastKnownScrollPosition);
            window.ticking = false;
          });

          window.ticking = true;
        }
      });
      burgerButton.addEventListener('click', () => (drawer.hasAttribute('open') ? drawer.hide() : drawer.show()));
      drawer.addEventListener('sl-show', () => {
        if (window.lastKnownScrollPosition < preheaderHeight[currentBreakpoint]) {
          window.scrollTo({
            top: preheaderHeight[currentBreakpoint],
            left: 0,
            behavior: 'smooth',
          });
        }
        burgerButton.classList.add('icon-menu_open');
      });
      drawer.addEventListener('sl-hide', () => {
        burgerButton.classList.remove('icon-menu_open');
      });

      isInitialized = true;
    }
  };

  debouncedInitOnResize({
    initFunction: initBurgerDrawer,
  });
};
