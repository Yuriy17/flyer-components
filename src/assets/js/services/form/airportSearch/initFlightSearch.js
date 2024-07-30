import { airDates } from 'src/assets/js/helpers/constants';

function sumPassenger({ containerElement }) {
  containerElement.querySelectorAll('.number_passengers-all').forEach((el) => {
    let sum = 0;
    let quantities = el.closest('.block_arrow').querySelectorAll('.quantity');
    quantities.forEach((quantity) => {
      sum += Number(quantity.value);
    });
    el.innerHTML = sum;
  });
}
function changeFlyTripType(el) {
  el.nextElementSibling.classList.add('active_radio');
  if (document.querySelector('.btn_add')) {
    document.querySelector('.btn_add').remove();
  }
  const container_fields = document.querySelectorAll('.fly-trip-pane');
  container_fields.forEach((item) => {
    if (item.getAttribute('data-container-field-row-id') != 0) {
      item.remove();
    }
  });

  document.querySelectorAll('.fly-trip-type').forEach((item) => item.classList.remove('active'));

  el.closest('.fly-trip-type-block').querySelector('.fly-trip-type').classList.add('active');

  const dateTo = document.querySelector('.to');
  if (el.value === 'Round-trip') {
    dateTo.removeAttribute('disabled');
  } else if (el.value === 'One-way' || el.value === 'Multi-city') {
    //убираем данные со второго поля даты
    dateTo.closest('.date').classList.remove('errorValid_1');
    dateTo.classList.remove('errorValid');
    dateTo.setAttribute('disabled', 'disabled');

    dateTo.classList.remove('errorValid');
    dateTo.closest('.field').classList.remove('errorValid');
    dateTo.closest('.block_input').classList.add('disabled');

    airDates[0].from.update({
      maxDate: 0,
    });
    airDates[0].to.clear();

    //отслеживаем если несколько полетов

    if (el.value === 'Multi-city') {
      if (document.querySelector('form[name="flightTickets"]')) {
        const drops_container = document.querySelector('.fly-trip-content');
        drops_container.insertAdjacentHTML('afterend', `<div class="btn_add"><h3>+ Add flight</h3></div>`);
      } else {
        const drops_container = document.querySelector('.form-main-btn-block');
        drops_container.insertAdjacentHTML('beforebegin', `<div class="btn_add"><h3>+ Add flight</h3></div>`);
      }

      document.querySelector('.btn_add').addEventListener('click', () => add_flight_row('', '', '', '', '', '', '', '', ''));
    }
  }
}
export const initFlightSearch = ({ containerElement }) => {
  if (containerElement) {
    const updatePassengerCount = (input, increment) => {
      let count = Number(input.value) + increment;
      if (input.getAttribute('name') === 'adults' && count < 1) {
        count = 1;
      }
      input.value = Math.max(0, count);
      input.closest('.quantity_inner').querySelector('.quantity_label').innerHTML = input.value;
      sumPassenger({ containerElement });
    };
  
    containerElement.querySelectorAll('.passenger-count .bt_minus').forEach((item) => {
      item.addEventListener('click', (e) => {
        const input = e.currentTarget.closest('.quantity_inner').querySelector('.quantity');
        updatePassengerCount(input, -1);
      });
    });
  
    containerElement.querySelectorAll('.passenger-count .bt_plus').forEach((item) => {
      item.addEventListener('click', (e) => {
        const parent = e.currentTarget.closest('.quantity_inner');
        const input = parent.querySelector('.quantity');
        const totalPassengers = Number(parent.closest('.block_arrow').querySelector('.number_passengers-all').innerHTML);
        if (totalPassengers < 8) {
          updatePassengerCount(input, 1);
        }
      });
    });
  
    const handleRadioChange = (item, radioTypeTickets) => {
      radioTypeTickets.forEach((el) => el.querySelector('input[type="radio"]').removeAttribute('checked'));
      const itemValue = item.querySelector('input[type="radio"]').value;
      containerElement.querySelector('.flight_class').textContent = itemValue;
  
      radioTypeTickets.forEach((el) => {
        const label = el.querySelector('label');
        label.classList.remove('active_radio');
        if (el.querySelector('input[type="radio"]').value === itemValue) {
          el.querySelector('input[type="radio"]').setAttribute('checked', true);
          label.classList.add('active_radio');
        }
      });
    };
  
    const radioTypeTickets = containerElement.querySelectorAll('.form_radio_btn');
    radioTypeTickets.forEach((item) => {
      item.addEventListener('click', () => handleRadioChange(item, radioTypeTickets));
      if (item.querySelector('input[type="radio"]').checked) {
        item.querySelector('label').classList.add('active_radio');
      } else {
        item.querySelector('label').classList.remove('active_radio');
      }
    });
  
    const flyTripTypeElements = containerElement.querySelectorAll('input[name=fly_trip_type]');
    flyTripTypeElements.forEach((el) => {
      el.addEventListener('change', () => {
        flyTripTypeElements.forEach((typeEl) => typeEl.nextElementSibling.classList.remove('active_radio'));
        changeFlyTripType(el);
      });
      if (el.checked) {
        el.nextElementSibling.classList.add('active_radio');
      } else {
        el.nextElementSibling.classList.remove('active_radio');
      }
    });
    changeFlyTripType(flyTripTypeElements[0]);
  
    window.addEventListener('click', (event) => {
      if (!event.target.closest('.drop')) {
        containerElement.querySelectorAll('.block-drop-down.show').forEach((dropdown) => {
          dropdown.classList.remove('show');
          dropdown.closest('.drop').querySelector('.block_photo').classList.remove('open');
        });
      }
  
      const activeSearchInputs = containerElement.querySelectorAll('.search-input.active');
      activeSearchInputs.forEach((inputContainer) => {
        const autocomBox = inputContainer.querySelector('.autocom-box');
        if (autocomBox.classList.contains('active')) {
          const inputs = inputContainer.querySelectorAll('input');
          const listItems = autocomBox.querySelectorAll('li');
          listItems.forEach((li) => {
            if (
              inputs[0].value &&
              inputs[1].value &&
              inputs[2].value &&
              inputs[3].value &&
              !(
                inputs[0].value === li.querySelector('h5').textContent &&
                inputs[1].value === li.querySelector('h4').textContent &&
                inputs[2].value === li.querySelector('h5 span').textContent &&
                inputs[3].value === li.getAttribute('class')
              )
            ) {
              inputs.forEach((input) => (input.value = ''));
            }
          });
        }
        inputContainer.classList.remove('active');
        autocomBox.classList.remove('active');
      });
  
      if (event.target.classList.contains('switch') || event.target.closest('.switch')) {
        const parent = event.target.closest('.container-field-row');
        const [inputFrom, inputTo] = [parent.querySelector('.input_from'), parent.querySelector('.input_to')];
        const [cityAirportFrom, cityAirportTo] = [parent.querySelector('.cityAirport'), parent.querySelector('.cityAirportTo')];
        const [cityCodeFrom, cityCodeTo] = [parent.querySelector('.cityCode'), parent.querySelector('.cityCodeTo')];
        const [entityIdFrom, entityIdTo] = [parent.querySelector('.originEntityId'), parent.querySelector('.destinationEntityId')];
  
        [inputFrom.value, inputTo.value] = [inputTo.value, inputFrom.value];
        [cityAirportFrom.value, cityAirportTo.value] = [cityAirportTo.value, cityAirportFrom.value];
        [cityCodeFrom.value, cityCodeTo.value] = [cityCodeTo.value, cityCodeFrom.value];
        [entityIdFrom.value, entityIdTo.value] = [entityIdTo.value, entityIdFrom.value];
      }
  
      event.stopPropagation();
    });
  }
};
