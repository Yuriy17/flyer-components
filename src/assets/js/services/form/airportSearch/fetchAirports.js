import { base_api_url } from 'src/assets/js/helpers/constants.js';
import { hideLoadingIcon } from 'src/assets/js/utils/loadingIcon.js';
import { createAirportList, updateListBox } from './airportUtils.js';

export const fetchAirports = async ({ query, listBox, inputSearchElement }) => {
  try {
    const response = await fetch(`${base_api_url}api/v2/location?query=${query}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Bad response from server');
    }

    const airportList = createAirportList(data?.locations || []);
    updateListBox(listBox, inputSearchElement, airportList);
  } catch (error) {
    console.error('Error processing response:', error);
  } finally {
    setTimeout(() => hideLoadingIcon(inputSearchElement), 500);
  }
};
