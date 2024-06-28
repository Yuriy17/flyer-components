import { airDates, airLlocale, airMinDate, airStartDate } from '../helpers/constants.js';
import AirDatepicker from 'air-datepicker';

export const initFormAirDatepicker = () => {
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
};
