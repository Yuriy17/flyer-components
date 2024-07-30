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

export const date = ({ ruleValue, libsObject }) => {
  console.log("🚀 ~ date ~ ruleValue:", ruleValue);
  if (libsObject['date']) {
    const { selectedDates } = libsObject['date'];
    console.log("🚀 ~ date ~ selectedDates:", selectedDates);

    if (selectedDates && selectedDates.length) {
      switch (ruleValue) {
        case '1':
          if (selectedDates.length  < 1) {
            return 'Please select date';
          }
          break;
        case '2':
          if(selectedDates.length < 2) {
            if (selectedDates.length  < 1) {
              return 'Please select range of dates';
            }
            return 'Please select second date of range';
          } 
          break;
        default:
          break;
      }
    }
  }
  
  return true;
  // console.log('🚀 ~ setupField ~ datepicker:', datepicker.formatDate(datepicker.viewDate, ));
  // if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
  // const parts = dateString.split('/');
  // const day = parseInt(parts[1], 10);
  // const month = parseInt(parts[0], 10);
  // const year = parseInt(parts[2], 10);
  // if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
  // const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;
  // return day > 0 && day <= monthLength[month - 1];
};