import { isSanctionedPlace } from './sanctions.js';
import { handleAirportSelection } from './eventHandlers.js';
import { fetchAirports } from './fetchAirports.js';
import { debounce } from 'src/assets/js/utils/debounce.js';

export const createAirportList = (locations) => {
  return locations
    .filter(({ country }) => !isSanctionedPlace(country))
    .map(
      ({ name, country, iataCityCode, id, entityId }) =>
        `<li class="${entityId}" data-iata-city-code="${iataCityCode}"><h5>${name} (<span>${id}</span>)</h5><h4>${country}</h4></li>`
    )
    .join('');
};

export const updateListBox = (listBox, inputSearchElement, airportList) => {
  if(!airportList) {
    listBox.innerHTML = '';
    return;
  }

  inputSearchElement.classList.add('active');
  listBox.classList.add('active');
  listBox.innerHTML = airportList;

  listBox.querySelectorAll('li').forEach((item) =>
    item.addEventListener('click', () =>
      handleAirportSelection({
        item,
        inputSearchElement,
        listBox,
      })
    )
  );
};

// Debounced fetch function
export const debouncedFetchAirports = debounce(async (params) => {
  try {
    await fetchAirports(params);
  } catch (error) {
    console.error('Error fetching airports:', error);
  }
}, 300);

