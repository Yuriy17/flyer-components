import { debounce } from '../../utils/debounce.js';
import { base_api_url, options } from '../../helpers/constants.js';
import { showLoadingIcon, hideLoadingIcon } from '../../utils/loadingIcon.js';

// Debounced version of the fetchAirports function
const debouncedFetchAirports = debounce(async ({ query, listBox, item }) => {
  try {
    showLoadingIcon(item);
    await fetchAirports({ query, listBox, item });
  } catch (error) {
    console.error(error.message);
  } finally {
    // Hide loading icon after 0.5 second
    setTimeout(() => {
      hideLoadingIcon(item);
    }, 500);
  }
  // fetch after 0.3 second one time final variant
}, 300);
//получение данных аэропортов

export function getAllInputSearch() {
  let getAllformRows = document.querySelectorAll('[data-container-field-row-id]');

  let inputSearch = getAllformRows[getAllformRows.length - 1].querySelectorAll('.search-input');

  inputSearch.forEach((item) => {
    let inputBox;

    inputBox = item.querySelector('input');

    inputBox.addEventListener('input', () => {
      item.querySelectorAll('input[type="hidden"]').forEach((itemHidden) => (itemHidden.value = ''));
      getAirports({
        inputBox,
        item,
      });
    });
  });
}
export const fetchAirports = async ({ query, listBox, item }) => {
  // get value api
  await fetch(`${base_api_url}api/search_location?query=${query}`)
    .then((res) => res.json())
    .then((response) => {
      // response.json().then((body) => console.log(body));
      if (response.status >= 400 && response.status < 600) {
        throw new Error('Bad response from server');
      }
      const allPlaces = response?.locations;

      if (!allPlaces) {
        return;
      }
      let sanctionPlaces = 0;
      let newAllPlaces = allPlaces.map(({ name, country, iataCityCode, id }) => {
        let airportInfo, placeId, countryName, entityId;

        airportInfo = name;
        countryName = country;
        placeId = iataCityCode;
        entityId = id;

        if (checkSanctionPlaces(countryName)) {
          sanctionPlaces = 1;
        }
        if (sanctionPlaces === 0 && countryName !== '') {
          return `<li class="${entityId}"><h5>${airportInfo} (<span>${placeId}</span>)</h5><h4>${countryName}</h4></li>`;
        }
      });

      item.classList.add('active');
      listBox.classList.add('active');
      listBox.innerHTML = newAllPlaces.join('');
      let allList = listBox.querySelectorAll('li');
      for (let i = 0; i < allList.length; i++) {
        allList[i].setAttribute('onclick', 'valueInputAirport(this)');
      }
    })
    .catch((err) => console.error(err));
};
export async function getAirports({ inputBox, item }) {
  const listBox = item.querySelector('.autocom-box');
  const inputAirport = item.querySelector('.input_airport');
  const isActiveItem = item.classList.contains('active');
  //значение пользователя
  let userValue = inputBox.value;

  if (userValue.length < 3) {
    inputAirport.value = '';
  }

  if (userValue.length < 3 && isActiveItem) {
    inputBox.closest('.search-input.active').classList.remove('active');
    listBox.classList.remove('active');
  }
  if (userValue.length >= 3) {
    debouncedFetchAirports({
      query: userValue.toLowerCase(),
      listBox,
      item,
    });
  } else {
    item.classList.remove('active'); //hide autocomplete box
    listBox.classList.remove('active');
  }
}

export function checkSanctionPlaces(name) {
  let santions = ['cuba', 'iran', 'north korea', 'syria', 'luhansk', 'donetsk', 'crimea'];
  if (santions.indexOf(name.toLowerCase()) != -1) {
    return 1;
  }
  return 0;
}
window.valueInputAirport = valueInputAirport;
// вывод в инпуты результат поиска аэропорта
export function valueInputAirport(value) {
  const parent = value.closest('.search-input');
  const inputBox = parent.querySelector('input');
  inputBox.value = value.querySelector('h5').textContent;
  inputBox.nextSibling.nextSibling.value = value.querySelector('h4').textContent;

  if (inputBox.classList.contains('input_from')) {
    parent.querySelector('.input_from').value = value.querySelector('h5').textContent;
    parent.querySelector('.cityAirport').value = value.querySelector('h4').textContent;
    parent.querySelector('.cityCode').value = value.querySelector('h5 span').textContent;
    parent.querySelector('.originEntityId').value = value.getAttribute('class');
  } else if (inputBox.classList.contains('input_to')) {
    parent.querySelector('.input_to').value = value.querySelector('h5').textContent;
    parent.querySelector('.cityAirportTo').value = value.querySelector('h4').textContent;
    parent.querySelector('.cityCodeTo').value = value.querySelector('h5 span').textContent;
    parent.querySelector('.destinationEntityId').value = value.getAttribute('class');
  }
  //console.log(value.querySelector('h5 span').textContent);

  let listBox = value.closest('.autocom-box');
  if (listBox.classList.contains('active')) {
    inputBox.closest('.search-input.active').classList.remove('active');
  }
  listBox.classList.remove('active');
}

//api поиска полетов

export async function findFlights(
  flyTripType,
  from,
  to,
  departureDate,
  returnDate,
  type_ticket,
  adults,
  children,
  infants,
  sortBy
) {
  let legs = '';
  //flyTripType = "One-way";
  if (flyTripType === 'Round-trip') {
    let [month_1, day_1, year_1] = departureDate[0]['date'].split('/');
    let [month_2, day_2, year_2] = returnDate[0]['date'].split('/');
    legs = `{"origin":"${from[0]['cityCode']}","originEntityId":"${from[0]['entityId']}","destination":"${to[0]['cityCode']}","destinationEntityId":"${to[0]['entityId']}","date":"${year_1}-${month_1}-${day_1}" },{"origin":"${to[0]['cityCode']}","originEntityId":"${from[0]['entityId']}","destination":"${from[0]['cityCode']}","destinationEntityId":"${to[0]['entityId']}","date":"${year_2}-${month_2}-${day_2}"}`;
  } else if (flyTripType === 'One-way' || flyTripType === 'Multi-city') {
    for (let i = 0; i < departureDate.length; i++) {
      let [month_1, day_1, year_1] = departureDate[i]['date'].split('/');
      legs += `{"origin":"${from[i]['cityCode']}","originEntityId":"${from[i]['entityId']}","destination":"${to[i]['cityCode']}","destinationEntityId":"${to[i]['entityId']}","date":"${year_1}-${month_1}-${day_1}"},`;
    }
    legs = legs.slice(0, -1);
  }
  const legs_encoded = encodeURIComponent(`[${legs}]`);
  const cabinClass = `${type_ticket.toLowerCase()}`;
  const currency = 'USD';
  //const market = "US";
  adults = 1;
  let request = `legs=${legs_encoded}&adults=${adults}&cabinClass=${cabinClass}&currency=${currency}&sortBy=${sortBy}`;
  // children > 0 ? (request += `&children=${children}`) : (request = request);
  // infants > 0 ? (request += `&infants=${infants}`) : (request = request);

  const url = `${base_api_url}api/v2/searchFlightsMultiStops?
	${request}`;
  let ticketInfo = [],
    differentPartners = 0,
    ticketInfoUniq = [];
  await fetch(url, options)
    .then((res) => res.json())
    .then((response) => {
      let allFlights = response.message;
      //console.log(allFlights["itineraries"])
      if (allFlights && allFlights['itineraries'].length > 0) {
        for (let i = 0; i < allFlights['itineraries'].length; i++) {
          if (Number(allFlights['itineraries'][i]['price']['raw']) > 2988) {
            const randomMultiplier = Math.random() * (0.99 - 0.95) + 0.95;
            allFlights['itineraries'][i]['price']['raw'] = 2988 * randomMultiplier;
          }
          if (
            ticketInfo.findIndex(
              (item) => item.partner_name === allFlights['itineraries'][i]['legs'][0]['carriers']['marketing'][0]['name']
            ) == -1
          ) {
            differentPartners++;
          }
          ticketInfo.push({
            partner_name: allFlights['itineraries'][i]['legs'][0]['carriers']['marketing'][0]['name'],
            partner_logo: allFlights['itineraries'][i]['legs'][0]['carriers']['marketing'][0]['logoUrl'],
            price: allFlights['itineraries'][i]['price']['raw'] * 0.45,
          });

          if (differentPartners == 4) {
            break;
          }
        }
      }
      if (ticketInfo.length > 4) {
        ticketInfo.forEach((item) => {
          let partner = item['partner_name'];
          if (ticketInfoUniq.findIndex((itemFI) => itemFI.partner_name === partner) == -1) {
            ticketInfoUniq.push(item);
          }
        });
        if (ticketInfoUniq.length < 4) {
          for (let i = ticketInfoUniq.length; i < ticketInfo.length; i++) {
            ticketInfoUniq.push(ticketInfo[i]);
            if (ticketInfoUniq.length >= 4) {
              break;
            }
          }
        }
      } else {
        ticketInfoUniq = ticketInfo;
      }
      localStorage.setItem('lastSearchTicket', JSON.stringify(ticketInfoUniq));
    })
    .catch((err) => console.error(err));
}

export async function findFlightsDetails(itineraryId, leg, children, infants, adults, currency) {
  // TODO uncomment when it require
  // const flightData = {};
  const urlFlightDetails = `${base_api_url}api/v1/getFlightDetails?itineraryId=${itineraryId}&legs=${leg}&children=${children}&infants=${infants}&adults=${adults}&currency=${currency}`;
  await fetch(urlFlightDetails, options)
    .then((res) => res.json())
    .then((response) => {
      let flightInfo = response.data;
      //flightData[i]['data'].push(flightInfo);
      console.log(flightInfo);
    })
    .catch((err) => console.error(err));
  //console.log(flightData);
}
// window.getAllInputSearch = getAllInputSearch;
// window.fetchAirports = fetchAirports;
window.getAirports = getAirports;
window.checkSanctionPlaces = checkSanctionPlaces;
window.valueInputAirport = valueInputAirport;
window.findFlights = findFlights;
window.findFlightsDetails = findFlightsDetails;
