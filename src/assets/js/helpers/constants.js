export const options = {
  method: 'GET',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Yzc1YWI5OWQxNzhjMTEwOTUyZmRkNCIsImlhdCI6MTY5MDc4NjQ4OX0.G7db8-OXCFQBmmDgCYJYF6pJ9LtUVHaro-mBdOHSnW8'
  }
};
export let base_api_url = 'https://flyer-club.com/';
export const mainRules = {
  required: 'Field is required!',
  mail: 'Incorrect Format',
  min: 'Minimum field length ',
  max: 'Maximum field length ',
  countChars: 'Required number of characters in the field',
  checked: 'Field is required!',
  date: 'Wrong Format!',
  number: 'Field needs to be a Number!',
  equalTotalPrice: 'The amount of credit cards must be equal Total price'
};

