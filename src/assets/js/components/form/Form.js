import formTemplate from 'src/templates/components/form/form.ejs';
import { Component } from '../Component';

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

export const Form = (props) => {
  const returnValue = Component({
    template: formTemplate,
    ...props,
  });

  return returnValue;
};
