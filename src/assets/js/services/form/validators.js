export const minLength = (value, length) => value.length >= length || `Must be at least ${length} characters long.`;

export const required = (value) => (value && value.toString().trim() !== '') || 'This field is required.';
