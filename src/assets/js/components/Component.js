import { pasteByInsertPosition } from '../helpers/helpers';
import { insertPosition } from '../helpers/constants';
import { fromHTML } from '../utils/utils';

/**
 * @param {(locals,escape,include,rethrow)=>string|promise} template representing a function of ejs template
 ** Generates HTML markup from an EJS template.
  **
  ** @param locals an object of data to be passed into the template.
  **@param escape callback used to escape variables
  **@param include callback used to include files at runtime with `include()`
  **@param rethrow callback used to handle and rethrow errors
  **
  **@return Return type depends on `Options.async`.
   
 * @param {{classes: string, content: string ...}} templateProps representing a props for template.
 * @param {Element | null} parentElement representing a parent element if it added.
 * @param {(element)=>void} callbackAfterPaste representing a function that we can call after pasting element
 * @param {insertPosition} insertPositionType representing a position to add in parent.
 * @param {Boolean} isReturnElement representing boolean flag of returning element of template string.
 * 
 * @return {Element | string}
 */

export const Component = ({
  template,
  templateProps,
  parentElement,
  callbackAfterPaste,
  insertPositionType = insertPosition.inner,
  isReturnElement = false,
}) => {
  const templateString = template(templateProps);
  const returnValue = isReturnElement ? fromHTML(templateString) : templateString;

  parentElement &&
    pasteByInsertPosition({
      insertPositionType,
      parentElement,
      child: returnValue,
      callbackAfterPaste,
    });

  return returnValue;
};
