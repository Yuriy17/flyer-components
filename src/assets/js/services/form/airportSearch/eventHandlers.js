import { debouncedFetchAirports } from "./airportUtils";

export const handleAirportSelection = (item) => {
  const parent = item.closest('.search-input');
  const inputBox = parent.querySelector('input');

  const airportName = item.querySelector('h5').textContent;
  const countryName = item.querySelector('h4').textContent;
  const cityCode = item.querySelector('h5 span').textContent;
  const entityId = item.getAttribute('class');

  inputBox.value = airportName;
  inputBox.nextSibling.nextSibling.value = countryName;

  updateInputFields(parent, inputBox, airportName, countryName, cityCode, entityId);

  const listBox = item.closest('.autocom-box');
  if (listBox.classList.contains('active')) {
    inputBox.closest('.search-input').classList.remove('active');
  }
  listBox.classList.remove('active');
};

const updateInputFields = (parent, inputBox, airportName, countryName, cityCode, entityId) => {
  const isFromInput = inputBox.classList.contains('input_from');
  const prefix = isFromInput ? 'from' : 'to';

  parent.querySelector(`.input_${prefix}`).value = airportName;
  parent.querySelector(`.cityAirport${isFromInput ? '' : 'To'}`).value = countryName;
  parent.querySelector(`.cityCode${isFromInput ? '' : 'To'}`).value = cityCode;
  parent.querySelector(`.${isFromInput ? 'origin' : 'destination'}EntityId`).value = entityId;
};

export const handleUserInput = (inputBox, inputSearchElement) => {
  console.log("🚀 ~ handleUserInput ~ inputBox:", inputBox);
  const listBox = inputSearchElement.querySelector('.autocom-box');
  const userValue = inputBox.value.trim();

  if (userValue.length < 3) {
    hideAutocompleteBox(listBox, inputSearchElement);
  } else {
    debouncedFetchAirports({
      query: userValue.toLowerCase(),
      listBox,
      inputSearchElement,
    });
  }
};

const hideAutocompleteBox = (listBox, inputSearchElement) => {
  listBox.classList.remove('active');
  inputSearchElement.classList.remove('active');
};
