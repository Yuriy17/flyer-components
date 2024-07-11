// shoelace base
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
// Set the base path to the folder where Shoelace is installed
setBasePath('/node_modules/@shoelace-style/shoelace/dist');

import { ShoelaceComponents } from '../../helpers/constants';
import { initNav } from './initNav';

export const initShoelaceComponents = ({ components }) => {
  if (components?.length) {
    components.forEach((component) => {
      switch (component) {
        case ShoelaceComponents.button:
          import('@shoelace-style/shoelace/dist/components/button/button.js');
          break;
        case ShoelaceComponents.nav:
          //tab-group
          import('@shoelace-style/shoelace/dist/components/tab/tab.js');
          import('@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js');
          import('@shoelace-style/shoelace/dist/components/tab-group/tab-group.js');
          initNav();
          break;

        default:
          break;
      }
    });
  }
};
