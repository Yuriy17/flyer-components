import { debouncedFetchAirports } from "./airportUtils";

export const handleAirportSelection = ({ item, inputSearchElement, listBox }) => {
  const isSlComponent = inputSearchElement.tagName.includes('SL-');
  const inputBox = isSlComponent ? inputSearchElement : inputSearchElement.querySelector('input');

  const airportName = item.querySelector('h5').textContent;
  const countryName = item.querySelector('h4').textContent;
  const cityCode = item.querySelector('h5 span').textContent;
  const entityId = item.getAttribute('class');

  inputBox.value = airportName;
  // inputBox.nextSibling.nextSibling.value = countryName;

  updateInputFields(inputSearchElement, inputBox, airportName, countryName, cityCode, entityId);

  if (listBox.classList.contains('active')) {
    inputSearchElement.classList.remove('active');
  }
  listBox.classList.remove('active');
};

const updateInputFields = (parent, inputBox, airportName, countryName, cityCode, entityId) => {
  console.log("🚀 ~ updateInputFields ~ entityId:", entityId);
  const isFromInput = inputBox.classList.contains('input_from');
  // const prefix = isFromInput ? 'from' : 'to';

  // parent.querySelector(`.input_${prefix}`).value = airportName;
  const hiddenInputs = parent.querySelector('.hidden-inputs');
  if (hiddenInputs) {
    const cityAirportInput = hiddenInputs.querySelector(`.cityAirport${isFromInput ? '' : 'To'}`);
    const cityCodeInput = hiddenInputs.querySelector(`.cityCode${isFromInput ? '' : 'To'}`);
    const entityIdInput = hiddenInputs.querySelector(`.${isFromInput ? 'origin' : 'destination'}EntityId`);

    cityAirportInput && (cityAirportInput.value = countryName);
    cityCodeInput && (cityCodeInput.value = cityCode);
    entityIdInput && (entityIdInput.value = entityId);
  }
};

export const handleUserInput = (inputBox, inputSearchElement) => {
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
