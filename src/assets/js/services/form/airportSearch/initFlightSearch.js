// function changeFlyTripType(el) {
//   el.nextElementSibling.classList.add('active_radio');
//   if (document.querySelector('.btn_add')) {
//     document.querySelector('.btn_add').remove();
//   }
//   const container_fields = document.querySelectorAll('.fly-trip-pane');
//   container_fields.forEach((item) => {
//     if (item.getAttribute('data-container-field-row-id') != 0) {
//       item.remove();
//     }
//   });

//   document.querySelectorAll('.fly-trip-type').forEach((item) => item.classList.remove('active'));

//   el.closest('.fly-trip-type-block').querySelector('.fly-trip-type').classList.add('active');

//   const dateTo = document.querySelector('.to');
//   if (el.value === 'Round-trip') {
//     dateTo.removeAttribute('disabled');
//   } else if (el.value === 'One-way' || el.value === 'Multi-city') {
//     //убираем данные со второго поля даты
//     dateTo.closest('.date').classList.remove('errorValid_1');
//     dateTo.classList.remove('errorValid');
//     dateTo.setAttribute('disabled', 'disabled');

//     dateTo.classList.remove('errorValid');
//     dateTo.closest('.field').classList.remove('errorValid');
//     dateTo.closest('.block_input').classList.add('disabled');

//     airDates[0].from.update({
//       maxDate: 0,
//     });
//     airDates[0].to.clear();

//     //отслеживаем если несколько полетов

//     if (el.value === 'Multi-city') {
//       if (document.querySelector('form[name="flightTickets"]')) {
//         const drops_container = document.querySelector('.fly-trip-content');
//         drops_container.insertAdjacentHTML('afterend', `<div class="btn_add"><h3>+ Add flight</h3></div>`);
//       } else {
//         const drops_container = document.querySelector('.form-main-btn-block');
//         drops_container.insertAdjacentHTML('beforebegin', `<div class="btn_add"><h3>+ Add flight</h3></div>`);
//       }

//       document.querySelector('.btn_add').addEventListener('click', () => add_flight_row('', '', '', '', '', '', '', '', ''));
//     }
//   }
const sumPassenger = ({ allPassengersInputElement, passengerCountElements }) => {
  const allPassengerValues = allPassengersInputElement.value.split('|');

  let sum = 0;
  passengerCountElements.forEach((passengerCountElement) => {
    const input = passengerCountElement.querySelector('.passenger-count__number-label input');
    sum += Number(input.value);
  });
  allPassengersInputElement.value = `${sum.toString()} |${allPassengerValues[1]}`;
};

const updatePassengerCount = ({ increment, input, allPassengersInputElement, passengerCountElements }) => {
  let count = Number(input.value) + increment;
  if (input.getAttribute('name') === 'adults' && count < 1) {
    count = 1;
  }
  input.value = Math.max(0, count);
  sumPassenger({ allPassengersInputElement, passengerCountElements });
};

const handleRadioChange = ({ value, allPassengersInputElement }) => {
  const allPassengerValues = allPassengersInputElement.value.split('|');
  allPassengersInputElement.value = `${allPassengerValues[0]}| ${value}`;
};
const initDialogFlightForm = ({ dialogFlightForm }) => {
  const allPassengersFieldElement = dialogFlightForm.querySelector('.form__passenger');

  if (allPassengersFieldElement) {
    const radioTypeTickets = dialogFlightForm.querySelector('.passenger-block__class');
    const allPassengersInputElement = allPassengersFieldElement.querySelector('input');
    const passengersDropdownElement = allPassengersFieldElement.parentElement;
    const passengerCountElements = passengersDropdownElement.querySelectorAll('.passenger-count');

    radioTypeTickets &&
      radioTypeTickets.addEventListener('sl-change', (e) => {
        const { value } = e.currentTarget;
        handleRadioChange({ value, allPassengersInputElement });
      });
    if (passengerCountElements && passengerCountElements.length) {
      for (let index = 0; index < passengerCountElements.length; index++) {
        const passengerCountElement = passengerCountElements[index];
        const btMinus = passengerCountElement.querySelector('.bt_minus');
        const btPlus = passengerCountElement.querySelector('.bt_plus');
        const input = passengerCountElement.querySelector('.passenger-count__number-label input');

        btMinus &&
          btMinus.addEventListener('click', () => {
            if (input.classList.contains('adults') && (Number(input.value) === 1)) {
              alert('minimal count of adults is 1')
            } else {
              updatePassengerCount({ increment: -1, input, allPassengersInputElement, passengerCountElements });
            }
          });

        btPlus &&
          btPlus.addEventListener('click', () => {
            const totalPassengers = Number(allPassengersInputElement.value.split('|')[0]);
            if (totalPassengers < 8) {
              updatePassengerCount({ increment: 1, input, allPassengersInputElement, passengerCountElements });
            }
          });
      }
    }
  }
};

export const initFlightSearch = ({ containerElement }) => {
  if (containerElement) {
    const dialogFlightForms = containerElement.querySelectorAll('.dialog-flight__form.form');

    if (dialogFlightForms && dialogFlightForms.length) {
      dialogFlightForms.forEach((dialogFlightForm) => {
        initDialogFlightForm({
          dialogFlightForm,
        });

        // radioTypeTickets.forEach((item) => {
        //   item.addEventListener('click', () => handleRadioChange(item, radioTypeTickets));
        //   if (item.querySelector('input[type="radio"]').checked) {
        //     item.querySelector('label').classList.add('active_radio');
        //   } else {
        //     item.querySelector('label').classList.remove('active_radio');
        //   }
        // });

        // const flyTripTypeElements = containerElement.querySelectorAll('input[name=fly_trip_type]');
        // flyTripTypeElements.forEach((el) => {
        //   el.addEventListener('change', () => {
        //     flyTripTypeElements.forEach((typeEl) => typeEl.nextElementSibling.classList.remove('active_radio'));
        //     changeFlyTripType(el);
        //   });
        //   if (el.checked) {
        //     el.nextElementSibling.classList.add('active_radio');
        //   } else {
        //     el.nextElementSibling.classList.remove('active_radio');
        //   }
        // });
        // console.log('🚀 ~ initFlightSearch ~ flyTripTypeElements[0]:', flyTripTypeElements[0]);
        // changeFlyTripType(flyTripTypeElements[0]);

        // window.addEventListener('click', (event) => {
        //   if (!event.target.closest('.drop')) {
        //     dialogFlightForm.querySelectorAll('.block-drop-down.show').forEach((dropdown) => {
        //       dropdown.classList.remove('show');
        //       dropdown.closest('.drop').querySelector('.block_photo').classList.remove('open');
        //     });
        //   }

        //   const activeSearchInputs = dialogFlightForm.querySelectorAll('.search-input.active');
        //   activeSearchInputs.forEach((inputContainer) => {
        //     const autocomBox = inputContainer.querySelector('.autocom-box');
        //     if (autocomBox.classList.contains('active')) {
        //       const inputs = inputContainer.querySelectorAll('input');
        //       const listItems = autocomBox.querySelectorAll('li');
        //       listItems.forEach((li) => {
        //         if (
        //           inputs[0].value &&
        //           inputs[1].value &&
        //           inputs[2].value &&
        //           inputs[3].value &&
        //           !(
        //             inputs[0].value === li.querySelector('h5').textContent &&
        //             inputs[1].value === li.querySelector('h4').textContent &&
        //             inputs[2].value === li.querySelector('h5 span').textContent &&
        //             inputs[3].value === li.getAttribute('class')
        //           )
        //         ) {
        //           inputs.forEach((input) => (input.value = ''));
        //         }
        //       });
        //     }
        //     inputContainer.classList.remove('active');
        //     autocomBox.classList.remove('active');
        //   });

        //   if (event.target.classList.contains('switch') || event.target.closest('.switch')) {
        //     const parent = event.target.closest('.container-field-row');
        //     const [inputFrom, inputTo] = [parent.querySelector('.input_from'), parent.querySelector('.input_to')];
        //     const [cityAirportFrom, cityAirportTo] = [
        //       parent.querySelector('.cityAirport'),
        //       parent.querySelector('.cityAirportTo'),
        //     ];
        //     const [cityCodeFrom, cityCodeTo] = [parent.querySelector('.cityCode'), parent.querySelector('.cityCodeTo')];
        //     const [entityIdFrom, entityIdTo] = [
        //       parent.querySelector('.originEntityId'),
        //       parent.querySelector('.destinationEntityId'),
        //     ];

        //     [inputFrom.value, inputTo.value] = [inputTo.value, inputFrom.value];
        //     [cityAirportFrom.value, cityAirportTo.value] = [cityAirportTo.value, cityAirportFrom.value];
        //     [cityCodeFrom.value, cityCodeTo.value] = [cityCodeTo.value, cityCodeFrom.value];
        //     [entityIdFrom.value, entityIdTo.value] = [entityIdTo.value, entityIdFrom.value];
        //   }

        //   event.stopPropagation();
        // });
      });
    }
  }
};
