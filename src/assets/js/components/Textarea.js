import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import textareaTemplate from 'src/templates/components/inputs/slTextarea.ejs';
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

export const Textarea = (props) => {
  const returnValue = Component({
    template: textareaTemplate,
    ...props,
  });

  return returnValue;
};
