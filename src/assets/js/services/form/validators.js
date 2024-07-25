export const minLength = ({ value, ruleValue }) => value.length >= parseInt(ruleValue) || `Must be at least ${ruleValue} characters long.`;

export const required = ({ value }) => (value && value.toString().trim() !== '') || 'This field is required.';

export const letters = ({ value }) =>
  (value &&
    !!String(value)
      .match(/^[a-zA-Z\s]*$/)) ||
  'Only letters and spaces are allowed.';

export const email = ({value}) => value && !!String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
) || 'Please enter a valid email address. Example: yourname@example.com';
      
export const phone = ({ value, libsObject }) =>
  (value && libsObject['phone'].isValidNumber(value)) ||
  'Please enter your phone number, including the country code <b>(e.g., +1 (234) 567-8901).</b>';
