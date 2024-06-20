import '../css/styles.scss';
import 'air-datepicker/air-datepicker.css';
import AirDatepicker from 'air-datepicker';
import { initMainForm } from './services/mainForm.js';
import { initFlightSearch } from './services/flight-search.js';
import { initValidation } from './services/validation.js';
import { fade, preloader, setPreloader } from './services/preloader.js';
import { getAllInputSearch } from './services/api.js';
import { initShoelace } from './services/initShoelace.js';
const baseUrl = '/';
window.baseUrl = baseUrl;
const airDates = [
  {
    id: 0,
    from: '',
    to: ''
  }
];

const airLlocale = {
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
    'December'
  ],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  dateFormat: 'MM/dd/yyyy',
  firstDay: 0
};
const airStartDate = new Date();
const airMinDate = new Date();
document.addEventListener('DOMContentLoaded', async () => {
  initShoelace();
  initMainForm();
  getAllInputSearch();
  initFlightSearch({ AirDatepicker, airStartDate, airMinDate, airLlocale });
  initValidation();
  const state = window.location.hash === '#searchflights' ? 'searchingFinish' : 'loading';
  await setPreloader(state);
  await fade(preloader, false);
  console.log('🚀 ~ document.addEventListener ~ AirDatepicker:', AirDatepicker);
  const indexAir = airDates.findIndex(({ id }) => id === 0);
  airDates[indexAir].from = new AirDatepicker('.from', {
    startDate: airStartDate,
    minDate: airMinDate,
    autoClose: true,
    locale: airLlocale,
    onSelect({ date }) {
      airDates[indexAir].to.update({
        minDate: date
      });
    }
  });
  console.log(document.querySelectorAll('.to'));
  airDates[indexAir].to = new AirDatepicker('.to', {
    startDate: airStartDate,
    minDate: airMinDate,
    autoClose: true,
    position: 'bottom right',
    locale: airLlocale,
    onSelect({ date }) {
      airDates[indexAir].from.update({
        maxDate: date
      });
    }
  });
});

window.airDates = airDates;

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
