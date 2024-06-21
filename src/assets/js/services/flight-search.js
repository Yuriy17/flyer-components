import AirDatepicker from 'air-datepicker';
import { airDates, airLlocale, airMinDate, airStartDate, baseUrl } from '../helpers/constants';
import { getAllInputSearch } from './api';

// утсановка значений после поиска
export function settingFormValues() {
  let flightSearchForm = document.querySelector('form[name="flightTickets"]');
  let dataFlight = JSON.parse(localStorage.getItem('flightTicketInfo'));
  if (dataFlight) {
    let lastSearchTicket = JSON.parse(localStorage.getItem('lastSearchTicket'));

    if (lastSearchTicket && lastSearchTicket.length > 0) {
      document.querySelector('.search-results-img').style.display = 'none';
      document.querySelector('.search-results-table').style.display = 'flex';
      document.querySelector('.search-results-table-flights').insertAdjacentHTML('afterbegin', setTableTicketInfo(dataFlight.passenger.type));
      //блок с информацией о билете, вывод заголовка
      if (dataFlight.from[0]?.cityName != undefined && lastSearchTicket && lastSearchTicket.length > 0) {
        document.querySelector('.search-results-table-title').textContent = dataFlight.from[0].cityName + ' - ' + dataFlight.to[0].cityName;
      }
    }
    // inf pers
    flightSearchForm.adults.value = dataFlight.passenger.adults;
    flightSearchForm.children.value = dataFlight.passenger.children;
    flightSearchForm.infants.value = dataFlight.passenger.infants;

    document.querySelector('.adult').nextElementSibling.innerHTML = dataFlight.passenger.adults;
    document.querySelector('.children').nextElementSibling.innerHTML = dataFlight.passenger.children;
    document.querySelector('.infants').nextElementSibling.innerHTML = dataFlight.passenger.infants;

    document.querySelectorAll('input[name=type_ticket]').forEach((item) => {
      item.removeAttribute('checked');
      item.nextElementSibling.classList.remove('active_radio');
    });

    document.querySelector('input[name=type_ticket][value=' + dataFlight.passenger.type + ']').checked = true;
    document.querySelector('.flight_class').textContent = dataFlight.passenger.type;

    sumPassenger();

    document.querySelector('input[name=fly_trip_type][value=' + dataFlight.flyTripType.flyTripType + ']').checked = true;
    changeFrlyTripType(document.querySelector('input[name=fly_trip_type][value=' + dataFlight.flyTripType.flyTripType + ']'));

    for (let i = 0; i < dataFlight.departureDate.length; i++) {
      if (i == 0) {
        flightSearchForm['flight[' + i + "]['from']"].value = dataFlight.from[i].cityName;
        flightSearchForm['flight[' + i + "]['cityAirport']"].value = dataFlight.from[i].airportName;
        flightSearchForm['flight[' + i + "]['cityCode']"].value = dataFlight.from[i].cityCode;
        flightSearchForm['flight[' + i + "]['originEntityId']"].value = dataFlight.from[i].entityId;

        flightSearchForm['flight[' + i + "]['to']"].value = dataFlight.to[i].cityName;
        flightSearchForm['flight[' + i + "]['cityAirportTo']"].value = dataFlight.to[i].airportName;
        flightSearchForm['flight[' + i + "]['cityCodeTo']"].value = dataFlight.to[i].cityCode;
        flightSearchForm['flight[' + i + "]['destinationEntityId']"].value = dataFlight.to[i].entityId;

        //document.querySelectorAll('.input_departure')[0].value=dataFlight.departureDate[i].date;
        airDates[0].from.selectDate(dataFlight.departureDate[i].date.replaceAll('-', '/'));

        if (dataFlight.returnDate[i].date) {
          airDates[0].to.selectDate(dataFlight.returnDate[i].date.replaceAll('-', '/'));
        }
      } else {
        add_flight_row(
          dataFlight.from[i].cityName,
          dataFlight.from[i].airportName,
          dataFlight.from[i].entityId,
          dataFlight.from[i].cityCode,
          dataFlight.to[i].cityName,
          dataFlight.to[i].airportName,
          dataFlight.to[i].cityCode,
          dataFlight.to[i].entityId,
          dataFlight.departureDate[i].date.replaceAll('-', '/')
        );
      }
    }
  }
}

let sum;
//добавление поля в выборе рейса (multi city)
let last_row_container_fields = 1;
function add_flight_row(
  fromVal = '',
  cityAirportVal = '',
  originEntityIdVal = '',
  cityCodeVal = '',
  toVal = '',
  cityAirportToVal = '',
  cityCodeToVal = '',
  destinationEntityId = '',
  dateDepartureVal = ''
) {
  const container_fields = document.querySelectorAll('[data-container-field-row-id]');
  let fromSearchResult,
    btn_delete_1 = '',
    btn_delete_2 = '';
  const btn_delete = `<div class="block_to_delete_flight">
						<div class="btn_delete">
							<div class="icon">
							<i class="icon-delete"></i>
						</div>
							<h3>Delete flight</h3>
						</div>
					</div>`;
  if (document.querySelector('#sectionFillQuote')) {
    fromSearchResult = 'fromSearchResult';
    btn_delete_2 = btn_delete;
  } else {
    btn_delete_1 = btn_delete;
  }
  let newFormRow = `
		<div class="fly-trip-pane" data-container-field-row-id="${last_row_container_fields}">
			<div class="container-field container-field-row" style="margin-top:20px;" >
				<div class="block-city-row">
					<div class="btn_switch switch">
						<img src="/assets/icons/exchange-alt.svg" alt="exchange"  />
					</div>

					<div class="field block_error city">
						<div class="flex">
							<div class="block_input">
								<p class="name_block">From</p>
								<div class="search-input">
									<input
										name="flight[${last_row_container_fields}]['from']"
										type="text"
										class="input_from input-from-switch"
										placeholder="Enter City or Airport"
										autocomplete="off"
										value='${fromVal.toString()}'
										data-validation="required|min[3]"
									/>
									<input
										name="flight[${last_row_container_fields}]['cityAirport']"
										type="hidden"
										class="cityAirport input_airport"
										value='${cityAirportVal.toString()}'
									/>
									<input
										name="flight[${last_row_container_fields}]['cityCode']"
										type="hidden"
										class="cityCode"
										data-validation="required"
										value='${cityCodeVal.toString()}'
									/>

									<input
										name="flight[${last_row_container_fields}]['originEntityId']"
										type="hidden"
										class="originEntityId"
										value='${originEntityIdVal.toString()}'
									/>
									<div class="autocom-box"></div>
                  <div class="loading-container" class="hidden"></div>
								</div>
							</div>

							<div class="block_photo">
								<div class="icon">
									<img
										src="${baseUrl}assets/mainForm/img/airplane-1.svg"
										alt="Airplane"
										title="Airplane"
										class="from_airplane_img"
									/>
								</div>
							</div>
						</div>
					</div>

					<div class="field block_error city">
						<div class="flex">
							<div class="block_input">
								<p class="name_block">To</p>
								<div class="search-input">
									<input
										name="flight[${last_row_container_fields}]['to']"
										type="text"
										class="input_to input-to-switch"
										placeholder="Enter City or Airport"
										autocomplete="off"
										value='${toVal.toString()}'
										data-validation="required|min[3]"
									/>
									<input
										name="flight[${last_row_container_fields}]['cityAirportTo']"
										type="hidden"
										class="cityAirportTo input_airport"
										value='${cityAirportToVal.toString()}'
									/>
									<input
										name="flight[${last_row_container_fields}]['cityCodeTo']"
										type="hidden"
										class="cityCodeTo"
										data-validation="required"
										value='${cityCodeToVal.toString()}'
									/>
									<input
										name="flight[${last_row_container_fields}]['destinationEntityId']"
										type="hidden"
										class="destinationEntityId"
										value='${destinationEntityId.toString()}'
									/>
									<div class="autocom-box"></div>
                  <div class="loading-container" class="hidden"></div>
								</div>
							</div>

							<div class="block_photo">
								<div class="icon icon_to">
									<img
										src="${baseUrl}assets/mainForm/img/airplane-1.svg"
										alt="Airplane"
										title="Airplane"
										class="to_airplane_img"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="field_calendar">
					<div class="flex flex_decoration input-group input-daterange jDaterange">
						<div class="field block_error">
							<div class="block_input">
								<p class="name_block">Departure</p>
								<div class="date">
									<input
										class="input_departure inputDate from ${fromSearchResult}"
										name="flight[${last_row_container_fields}]['date_start']"
										placeholder="Select date"
										type="text"
										autocomplete="off"
										value='${dateDepartureVal.toString()}'
										data-container-field-from-id="${last_row_container_fields}"
										data-validation="required|date"
									/>
									<span class="input-group-addon">
										<i class="icon-calendar"></i>
									</span>
								</div>
							</div>
						</div>

						<div class="field block_error field_return">
							<div class="block_input block_return disabled">
								<p class="name_block">Return</p>
								<div class="date" data-date-format="mm-dd-yyyy">
									<input
										class="input_return inputDate to "
										name="flight[${last_row_container_fields}]['date_end']"
										placeholder="Select date"
										type="text"
										autocomplete="off"
										disabled
										data-validation="required|date"
									/>
									<span class="input-group-addon">
										<i class="icon-calendar"></i>
									</span>
								</div>
							</div>
						</div>
					</div>
					${btn_delete_1}
				</div>
				
			</div>
			${btn_delete_2}
		</div>
			`;

  const btn_add = document.querySelector('.btn_add');
  document.querySelector('.fly-trip-content').insertAdjacentHTML('beforeend', newFormRow);

  //функция на логику калькулятора
  //addCalendar();

  if (container_fields.length >= 3) {
    btn_add.style.display = 'none';
  } else {
    btn_add.style.display = 'inline-block';
  }

  airDates.push({
    id: last_row_container_fields,
    from: '',
    to: '',
  });
  const indexAir = airDates.findIndex(({ id }) => id == last_row_container_fields);
  airDates[indexAir].from = new AirDatepicker(`[data-container-field-from-id="${last_row_container_fields}"]`, {
    startDate: airStartDate,
    minDate: airMinDate,
    autoClose: true,
    addon: 'right',
    locale: airLlocale,
  });

  const btns_dalete = document.querySelectorAll('.btn_delete');
  btns_dalete[btns_dalete.length - 1].addEventListener('click', (e) => {
    e.currentTarget.closest('[data-container-field-row-id]').remove();
    const container_fields = document.querySelectorAll('[data-container-field-row-id]');
    if (container_fields.length < 4) {
      btn_add.style.display = 'inline-block';
    }
  });

  last_row_container_fields++;
  getAllInputSearch();
}

function changeFrlyTripType(el) {
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

function sumPassenger() {
  sum = 0;
  let elements = document.querySelectorAll('.number_passengers-all');
  elements.forEach((el) => {
    sum = 0;
    let parent = el.closest('.block_arrow');
    let quantities = parent.querySelectorAll('.quantity');
    for (let i = 0; i < quantities.length; i++) {
      sum = sum + Number(quantities[i].value);
    }
    el.innerHTML = sum;
  });
}
function setTableTicketInfo(cabin = '') {
  let lastSearchTicket = JSON.parse(localStorage.getItem('lastSearchTicket'));

  let tableBody = '';
  if (lastSearchTicket && lastSearchTicket.length > 0) {
    let fireExpireBlock = '',
      fireExpireClass = '';
    for (let i = 0; i < lastSearchTicket.length; i++) {
      if (lastSearchTicket[i]) {
        if (i == 0) {
          fireExpireBlock = `<div class="search-results-table-partner_name search-results-table-partner_name-first">${lastSearchTicket[i]['partner_name']}</div>
									<div class="search-results-table-flights-item-fire">
										<div class="search-results-table-flights-item-fire-icon">
											<svg xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
												<path d="M19.9761 14.1172L19.8807 12.2422L18.6874 13.7422C18.6396 13.8047 18.568 13.8828 18.4726 13.9766C18.3771 14.0703 18.2657 14.1641 18.1384 14.2578C18.2021 14.1016 18.2538 13.9297 18.2936 13.7422C18.3333 13.5547 18.3691 13.3594 18.401 13.1562C18.4964 12.4375 18.4606 11.5586 18.2936 10.5195C18.1265 9.48047 17.5975 8.375 16.7064 7.20312L15.9666 6.24219L15.4654 7.36719C15.179 8.00781 14.829 8.47656 14.4153 8.77344C14.0016 9.07031 13.58 9.14844 13.1504 9.00781C12.8162 8.89844 12.5259 8.66797 12.2792 8.31641C12.0326 7.96484 11.8377 7.52344 11.6945 6.99219C11.5672 6.50781 11.4996 5.82422 11.4916 4.94141C11.4837 4.05859 11.6627 2.95312 12.0286 1.625L12.3389 0.5L11.1933 0.757812C10.2068 0.976562 9.30788 1.30469 8.49642 1.74219C7.66905 2.19531 6.93715 2.75391 6.30072 3.41797C5.66428 4.08203 5.11535 4.85156 4.65394 5.72656C4.19252 6.60156 3.82657 7.57812 3.55609 8.65625C3.31742 9.5625 3.16627 10.4258 3.10263 11.2461C3.03898 12.0664 3.01512 12.7656 3.03103 13.3438C2.5537 12.9844 2.19968 12.6641 1.96897 12.3828C1.73827 12.1016 1.62291 11.9531 1.62291 11.9375L0.739857 10.6719L0.334129 12.1719C0.222753 12.5781 0.13922 12.9922 0.0835322 13.4141C0.0278441 13.8359 0 14.2578 0 14.6797C0 16.0234 0.26253 17.2891 0.787589 18.4766C1.29674 19.6641 1.99682 20.6992 2.88783 21.582C3.77884 22.4648 4.82896 23.1719 6.03819 23.7031C7.2315 24.2188 8.51233 24.4844 9.88067 24.5C9.89658 24.5 9.91647 24.5 9.94033 24.5C9.9642 24.5 9.98409 24.5 10 24.5C10.0159 24.5 10.0358 24.5 10.0597 24.5C10.0835 24.5 10.1034 24.5 10.1193 24.5C11.4877 24.4844 12.7685 24.2188 13.9618 23.7031C15.171 23.1719 16.2212 22.4648 17.1122 21.582C18.0032 20.6992 18.7033 19.6641 19.2124 18.4766C19.7375 17.2891 20 16.0234 20 14.6797C20 14.5859 20 14.4922 20 14.3984C20 14.3047 19.992 14.2109 19.9761 14.1172ZM10 23.0938C9.07717 23.0938 8.28958 22.7734 7.63723 22.1328C6.98488 21.4922 6.65871 20.7109 6.65871 19.7891C6.65871 18.2109 6.96102 17.0273 7.56563 16.2383C8.17025 15.4492 8.7669 14.8984 9.35561 14.5859C9.29196 14.9922 9.28401 15.3789 9.33174 15.7461C9.37947 16.1133 9.46698 16.4375 9.59427 16.7188C9.7852 17.1406 10.0398 17.4844 10.358 17.75C10.6762 18.0156 11.0183 18.1641 11.3842 18.1953C11.5434 18.2109 11.7383 18.2031 11.969 18.1719C12.1997 18.1406 12.4423 18.0312 12.6969 17.8438C12.9037 18.125 13.0628 18.4336 13.1742 18.7695C13.2856 19.1055 13.3413 19.4453 13.3413 19.7891C13.3413 20.7109 13.0151 21.4922 12.3628 22.1328C11.7104 22.7734 10.9228 23.0938 10 23.0938ZM14.2243 21.9922C14.3994 21.6641 14.5386 21.3164 14.642 20.9492C14.7454 20.582 14.7971 20.1953 14.7971 19.7891C14.7971 19.1328 14.6579 18.5 14.3795 17.8906C14.101 17.2812 13.7072 16.75 13.1981 16.2969L12.6014 15.7812L12.148 16.4141C12.0843 16.4922 11.9968 16.5781 11.8854 16.6719C11.7741 16.7656 11.6627 16.8125 11.5513 16.8125C11.4558 16.7969 11.3484 16.7344 11.2291 16.625C11.1098 16.5156 11.0024 16.3594 10.9069 16.1562C10.7796 15.875 10.7239 15.5195 10.7399 15.0898C10.7558 14.6602 10.9149 14.2422 11.2172 13.8359L12.2196 12.5234L10.5489 12.7109C10.533 12.7109 10.2466 12.7812 9.68974 12.9219C9.13286 13.0625 8.52029 13.375 7.85203 13.8594C6.77009 14.6719 6.05807 15.6367 5.71599 16.7539C5.37391 17.8711 5.20286 18.8828 5.20286 19.7891C5.20286 20.1953 5.25457 20.582 5.358 20.9492C5.46142 21.3164 5.60064 21.6641 5.77566 21.9922C5.12331 21.6328 4.53461 21.1953 4.00955 20.6797C3.46858 20.1641 3.00716 19.5938 2.6253 18.9688C2.24344 18.3438 1.94909 17.6641 1.74224 16.9297C1.5354 16.2109 1.43198 15.4609 1.43198 14.6797C1.43198 14.5547 1.43596 14.4258 1.44391 14.293C1.45187 14.1602 1.4638 14.0234 1.47971 13.8828C1.71838 14.1172 2.0008 14.3594 2.32697 14.6094C2.65314 14.8594 3.02307 15.1016 3.43675 15.3359L4.70167 16.0625L4.53461 14.6562C4.5187 14.6406 4.49085 14.0547 4.45107 12.8984C4.4113 11.7422 4.57438 10.4297 4.94033 8.96094C5.16309 8.13281 5.43357 7.36719 5.75179 6.66406C6.08592 5.97656 6.47971 5.36328 6.93317 4.82422C7.38663 4.28516 7.89976 3.8125 8.47255 3.40625C9.04535 3.01562 9.67383 2.69531 10.358 2.44531C10.1671 3.38281 10.0676 4.26562 10.0597 5.09375C10.0517 5.92188 10.1352 6.67188 10.3103 7.34375C10.5012 8.10938 10.8035 8.75391 11.2172 9.27734C11.6309 9.80078 12.1161 10.1562 12.673 10.3438C13.0708 10.4688 13.4686 10.5078 13.8663 10.4609C14.2641 10.4141 14.6539 10.2812 15.0358 10.0625C15.2426 9.9375 15.4415 9.78516 15.6325 9.60547C15.8234 9.42578 16.0064 9.21875 16.1814 8.98438C16.5314 9.60938 16.7741 10.25 16.9093 10.9062C17.0445 11.5625 17.0724 12.2266 16.9928 12.8984C16.9133 13.5234 16.778 14.0273 16.5871 14.4102C16.3962 14.793 16.2928 14.9844 16.2768 14.9844L15.6802 15.9219L16.778 16.0625C17.0644 16.1094 17.3508 16.1016 17.6372 16.0391C17.9236 15.9766 18.21 15.8672 18.4964 15.7109C18.4169 16.3828 18.2578 17.0312 18.0191 17.6562C17.7804 18.2656 17.4741 18.8398 17.1002 19.3789C16.7263 19.918 16.3007 20.4062 15.8234 20.8438C15.3302 21.2812 14.7971 21.6641 14.2243 21.9922Z" fill="#FD9F00"/>
											</svg>
										</div>
										<div class="search-results-table-flights-item-fire-block">
											<div class="search-results-table-flights-item-fire-sale">Fire sale</div>
											<div class="search-results-table-flights-item-fire-expire">Expires in 30 min</div>
										</div>
									</div>`;
          fireExpireClass = 'fire-expire';
        } else {
          fireExpireBlock = `<div class="search-results-table-partner_name">${lastSearchTicket[i]['partner_name']}</div>`;
          fireExpireClass = '';
        }
        tableBody += `
				<div class="search-results-table-flights-item">
					<div class="search-results-table-flights-item-img">
						<img src="${lastSearchTicket[i]['partner_logo']}" height="30" alt="partner logo" />
					</div>
					${fireExpireBlock}
					<div class="search-results-table-flights-item-price">
						<div class="search-results-table-flights-item-price-amount ${fireExpireClass}">${Math.round(
              Number(lastSearchTicket[i]['price']) * Number(`1.0${i}`)
            )}*</div>
						<div class="search-results-table-flights-item-price-ticket-type">${cabin} class, r/t, total</div>
					</div>
				</div>`;
      }
    }
  }
  return tableBody;
}

export const initFlightSearch = () => {
  const dropdowns = document.querySelectorAll('.drop');
  dropdowns.forEach((item) => {
    item.addEventListener('click', (e) => {
      dropdowns.forEach((drop) => {
        if (drop != e.currentTarget) {
          drop.querySelector('.block-drop-down').classList.remove('show');
          drop.querySelector('.block_photo').classList.remove('open');
        }
      });

      if (!e.target.closest('.block-drop-down')) {
        item.querySelector('.block-drop-down').classList.toggle('show');
        item.querySelector('.block_photo').classList.toggle('open');
      }
    });
  });
  //input plus and minus для изменения количества пассажиров
  document.querySelectorAll('.quantity_inner .bt_minus').forEach((item) => {
    item.addEventListener('click', function (e) {
      const parent = e.currentTarget.closest('.quantity_inner');
      let input = parent.querySelector('.quantity');
      let count = Number(input.value) - 1;
      count = count < 1 ? 0 : count;
      if (input.getAttribute('name') == 'adults' && count < 1) {
        count = 1;
      }
      input.value = Number(count);
      parent.querySelector('.quantity_label').innerHTML = Number(count);
      sumPassenger();
    });
  });
  document.querySelectorAll('.quantity_inner .bt_plus').forEach((item) => {
    item.addEventListener('click', function (e) {
      const parent = e.currentTarget.closest('.quantity_inner');
      let input = parent.querySelector('.quantity');
      let count = parseInt(input.value) + 1;

      count = count < 1 ? 0 : count;
      if (input.getAttribute('name') == 'adults' && count < 1) {
        count = 1;
      }
      if (Number(parent.closest('.block_arrow').querySelector('.number_passengers-all').innerHTML) < 8) {
        input.value = Number(count);
        parent.querySelector('.quantity_label').innerHTML = Number(count);
      }
      sumPassenger();
    });
  });

  //Отслеживание события переключения типа полета
  //изменение состояния radio при выборе типа билетов
  const radioTypeTickets = document.querySelectorAll('.form_radio_btn');
  //class
  radioTypeTickets.forEach((item) => {
    item.addEventListener('click', () => {
      radioTypeTickets.forEach((el) => el.querySelector('input[type="radio"]').removeAttribute('checked'));
      let itemValue = item.querySelector('input[type="radio"]').value;
      document.querySelector('.flight_class').textContent = itemValue;

      radioTypeTickets.forEach((el) => {
        el.querySelector('label').classList.remove('active_radio');
        if (el.querySelector('input[type="radio"]').value == itemValue) {
          el.querySelector('input[type="radio"]').setAttribute('checked', true);
          el.querySelector('label').classList.add('active_radio');
        }
      });
    });
    item.querySelector('label').classList.remove('active_radio');
    if (item.querySelector('input[type="radio"]').checked) {
      item.querySelector('label').classList.add('active_radio');
    }
  });

  const fly_trip_type = document.querySelectorAll('input[name=fly_trip_type]');
  fly_trip_type.forEach((el) => {
    el.addEventListener('change', () => {
      for (let i = 0; i < fly_trip_type.length; i++) {
        fly_trip_type[i].nextElementSibling.classList.remove('active_radio');
      }
      changeFrlyTripType(el);
    });
    el.nextElementSibling.classList.remove('active_radio');
    if (el.checked) {
      el.nextElementSibling.classList.add('active_radio');
    }
  });
  changeFrlyTripType(fly_trip_type[0]);

  //заполнение поля с общим количеством пассажиров

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function (event) {
    if (!event.target.closest('.drop')) {
      let dropdowns = document.getElementsByClassName('block-drop-down');
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
          openDropdown.closest('.drop').querySelector('.block_photo').classList.remove('open');
        }
      }
    }

    const activeSearchInput = document.querySelectorAll('.search-input.active');

    if (activeSearchInput) {
      activeSearchInput.forEach((item) => {
        const autocomBox = item.querySelector('.autocom-box');

        if (autocomBox.classList.contains('active')) {
          const itemParentInputs = item.querySelectorAll('input');

          const list = autocomBox.querySelectorAll('li');
          list.forEach((li) => {
            if (
              itemParentInputs[0].value !== '' &&
              itemParentInputs[1].value !== '' &&
              itemParentInputs[2].value !== '' &&
              itemParentInputs[3].value !== ''
            ) {
              if (
                !(
                  itemParentInputs[0].value == li.querySelector('h5').textContent &&
                  itemParentInputs[1].value == li.querySelector('h4').textContent &&
                  itemParentInputs[2].value == li.querySelector('h5 span').textContent &&
                  itemParentInputs[3].value == li.getAttribute('class')
                )
              ) {
                itemParentInputs[0].value = '';
                itemParentInputs[1].value = '';
                itemParentInputs[2].value = '';
                itemParentInputs[3].value = '';
              }
            } else {
              itemParentInputs[0].value = '';
              itemParentInputs[1].value = '';
              itemParentInputs[2].value = '';
              itemParentInputs[3].value = '';
            }
          });
        }
        item.classList.remove('active');
        autocomBox.classList.remove('active');
      });
    }

    if (event.target.classList.contains('switch') || event.target.closest('.switch')) {
      const parent = event.target.closest('.container-field-row');
      const element1 = parent.querySelector('.input_from').value;
      const elementCityName1 = parent.querySelector('.cityAirport').value;
      const elementCityCode1 = parent.querySelector('.cityCode').value;
      const elementCityEntitiId1 = parent.querySelector('.originEntityId').value;
      const element2 = parent.querySelector('.input_to').value;
      const elementCityName2 = parent.querySelector('.cityAirportTo').value;
      const elementCityCode2 = parent.querySelector('.cityCodeTo').value;
      const elementCityEntitiId2 = parent.querySelector('.destinationEntityId').value;

      parent.querySelector('.input_from').value = element2;
      parent.querySelector('.cityAirport').value = elementCityName2;
      parent.querySelector('.cityCode').value = elementCityCode2;
      parent.querySelector('.originEntityId').value = elementCityEntitiId2;

      parent.querySelector('.input_to').value = element1;
      parent.querySelector('.cityAirportTo').value = elementCityName1;
      parent.querySelector('.cityCodeTo').value = elementCityCode1;
      parent.querySelector('.destinationEntityId').value = elementCityEntitiId1;
    }

    event.stopPropagation();
  };
};
