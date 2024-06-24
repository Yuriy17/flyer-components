import './assets/css/styles.scss';
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import { initMainForm } from './assets/js/services/mainForm.js';
import { initFlightSearch } from './assets/js/services/flight-search.js';
import { initValidation } from './assets/js/services/validation.js';
import { fade, preloader, setPreloader } from './assets/js/services/preloader.js';
import { getAllInputSearch } from './assets/js/services/api.js';
import { initShoelace } from './assets/js/services/initShoelace.js';
import { airDates, airLlocale, airMinDate, airStartDate } from './assets/js/helpers/constants.js';

export const dynamicImport = async (path) => {
  /* @vite-ignore */
  return (await import(path))?.default;
};

document.addEventListener('DOMContentLoaded', async () => {
  initShoelace();
  await initMainForm();
  getAllInputSearch();
  initFlightSearch({ AirDatepicker, airStartDate, airMinDate, airLlocale });
  initValidation();
  const state = window.location.hash === '#searchflights' ? 'searchingFinish' : 'loading';
  await setPreloader(state);
  await fade(preloader, false);
  const indexAir = airDates.findIndex(({ id }) => id === 0);
  airDates[indexAir].from = new AirDatepicker('.from', {
    startDate: airStartDate,
    minDate: airMinDate,
    autoClose: true,
    locale: airLlocale,
    onSelect({ date }) {
      airDates[indexAir].to.update({
        minDate: date,
      });
    },
  });

  airDates[indexAir].to = new AirDatepicker('.to', {
    startDate: airStartDate,
    minDate: airMinDate,
    autoClose: true,
    position: 'bottom right',
    locale: airLlocale,
    onSelect({ date }) {
      airDates[indexAir].from.update({
        maxDate: date,
      });
    },
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const searchInput = document.getElementById('search-input');
//   const suggestionsContainer = document.getElementById('suggestions');

//   // Function to display suggestions
//   function displaySuggestions(airports) {
//     suggestionsContainer.innerHTML = '';
//     if (airports.length > 0) {
//       airports.forEach((airport) => {
//         const div = document.createElement('div');
//         div.classList.add('suggestion-item');
//         div.textContent = `${airport.name} (${airport.code})`;
//         suggestionsContainer.appendChild(div);
//       });
//     } else {
//       suggestionsContainer.innerHTML = '<div class="suggestion-item">No results found</div>';
//     }
//   }

//   // Debounced version of the fetchAirports function
//   const debouncedFetchAirports = debounce(async (query) => {
//     try {
//       showLoadingIcon();
//       const airports = await fetchAirports(query);
//       setTimeout(() => {
//         hideLoadingIcon();
//         displaySuggestions(airports);
//       }, 1000);
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       // Hide loading icon after 1 second
//       setTimeout(() => {
//         hideLoadingIcon();
//       }, 1000);
//     }
//   }, 300);

//   // Event listener for the search input
//   searchInput.addEventListener('keyup', (event) => {
//     const query = event.target.value.trim();
//     if (query) {
//       debouncedFetchAirports(query);
//     } else {
//       suggestionsContainer.innerHTML = '';
//     }
//   });
// });
