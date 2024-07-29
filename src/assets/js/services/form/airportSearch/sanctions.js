const SANCTIONED_PLACES = ['cuba', 'iran', 'north korea', 'syria', 'luhansk', 'donetsk', 'crimea'];

export const isSanctionedPlace = (countryName) => {
  return SANCTIONED_PLACES.includes(countryName.toLowerCase());
};
