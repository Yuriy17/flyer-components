// import '@shoelace-style/shoelace/dist/components/formField/formField.js';
import formFieldTemplate from 'src/templates/components/formField.ejs';

import { Component } from './Component';

/**
 ** props object
 *
 * @param {{classes: string, content: string ...}} templateProps representing a props for template.
 * @param {Element | null} parentElement representing a parent element if it added.
 * @param {insertPosition} insertPositionType representing a position to add in parent.
 * @param {(element)=>void} callbackAfterPaste representing a function that we can call after pasting element
 * @param {Boolean} isReturnElement representing boolean flag of returning element of template string.
 *
 * @return {Element | string}
 */

export const FormField = (props) => {
  const returnValue = Component({
    template: formFieldTemplate,
    ...props,
  });

  return returnValue;
};
