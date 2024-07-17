export const options = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc1YWI5OWQxNzhjMTEwOTUyZmRkNCIsImlhdCI6MTY5MDc4NjQ4OX0.G7db8-OXCFQBmmDgCYJYF6pJ9LtUVHaro-mBdOHSnW8',
  },
};
export const base_api_url = 'https://flyer-club.com/';
export const mainRules = {
  required: 'Field is required!',
  mail: 'Incorrect Format',
  min: 'Minimum field length ',
  max: 'Maximum field length ',
  countChars: 'Required number of characters in the field',
  checked: 'Field is required!',
  date: 'Wrong Format!',
  number: 'Field needs to be a Number!',
  equalTotalPrice: 'The amount of credit cards must be equal Total price',
};

export const airDates = [
  {
    id: 0,
    from: '',
    to: '',
  },
];

export const airLlocale = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dateFormat: 'MM/dd/yyyy',
  firstDay: 0,
};

export const baseUrl = '/';

export const airStartDate = new Date();
export const airMinDate = new Date();
export const insertPosition = {
  afterbegin: 'afterbegin',
  afterend: 'afterend',
  beforebegin: 'beforebegin',
  beforeend: 'beforeend',
  inner: 'inner',
};
export const ShoelaceComponents = {
  button: 'button',
  checkbox: 'checkbox',
  dialog: 'dialog',
  input: 'input',
  select: 'select',
  textarea: 'textarea',
  nav: 'nav',
};
export const gridBreakpoints = {
  xs: 0,
  sm: 375,
  xsm: 576,
  md: 768,
  xmd: 1024,
  lg: 1240,
  xlg: 1440,
  xl: 1680,
  xxl: 1920,
};
