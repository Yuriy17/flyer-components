import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

export const initTelInput = (inputField) => {
  if (inputField) {
    const iti = intlTelInput(inputField, {
      hiddenInput: () => ({
        phone: 'full_phone',
      }),
      fixDropdownWidth: true,
      strictMode: true,
      placeholder: '+1 201-555-0123',
      preferredCountries: ['us', 'ca', 'gb', 'au'],
      initialCountry: 'us',
      utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js',
      // TODO fix cors and add check import.meta.env.PROD ?
      // utilsScript: 'https://flyer-club.com/assets/inputtel/utils.js',
    });
  
    // remove search bar
    iti.searchInput.remove();

    return iti;
  }
};
