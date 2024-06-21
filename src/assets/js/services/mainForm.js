import dropsContainerTemplate from '../../../templates/mainForm/dropsContainer.ejs';
import standartFormTemplate from '../../../templates/mainForm/standartForm.ejs';
import formTemplate from '../../../templates/mainForm/form.ejs';
import passengerFieldTemplate from '../../../templates/mainForm/passengerField.ejs';
import { inputTel } from './phones';

export const initMainForm = () => {
  // Function to create the main form
  function createMainForm(selector, formType) {
    const formContainer = document.querySelector(selector);
    
    if (formContainer) {
      const passengersData = [
        { label: 'Adults', aged: '(12+ years)', id: 'adults', value: '1', class: 'adults' },
        { label: 'Children', aged: '(2-11 years)', id: 'children', value: '0', class: 'children' },
        { label: 'Infants', aged: '(Under 2 years)', id: 'infants', value: '0', class: 'infants' }
      ];

      const dropsContainer = dropsContainerTemplate({
          passengers: passengersData.map((passenger) => passengerFieldTemplate(passenger)).join('\n')
      })

      const formHtml = formTemplate({
        baseUrl: '/',
        dropsContainer,
        standartForm: standartFormTemplate({
          formType,
          dropsContainer
        }),
        formName: 'searchflights'
      }).trim();
      
      formContainer.innerHTML = formHtml;

      // Additional logic for form initialization based on formType
      if (formType === 2) {
        inputTel('.form-valid-tab');
      }

      // Add your other event listeners and JS logic here
    }

  }

  // Logic to determine where to create the form
  if (document.querySelector('#sectionMainForm')) {
    createMainForm('#sectionMainForm', 1);
  } else {
    createMainForm('#sectionFillQuote', 2);
    inputTel('.form-valid-tab');
  }
  //   const baseUrl = '/';
  //   window.baseUrl = baseUrl;
  //   if (document.querySelector('#sectionMainForm')) {
  //     createMainForm('#sectionMainForm', 1);
  //   } else {
  //     createMainForm('#sectionFillQuote', 2);
  //     document.addEventListener('DOMContentLoaded', () => {

  //       inputTel('.form-valid-tab');
  //     });
  //   }

  //   function createMainForm(parent, passengers_position) {
  //     const sectionMainForm = document.querySelector(parent);

  //     let fromSearchResult,
  //       toSearchResult,
  //       form_name,
  //       drops_container_1 = '',
  //       drops_container_2 = '',
  //       standart_form = '',
  //       title = '';
  //     let drops_container = `<div class="drops_container">
  //     <div class="field block_arrow drop passengers_drop">
  //         <div class="flex block_with_arrow">
  //             <div class="block_input">
  //                 <p class="name_block">Passenger</p>
  //                 <div class="flex passenger_field">
  //                     <p class="block_input__passenger">
  //                         <span class="active number_passengers-all">1</span>
  //                         |
  //                         <span class="flight_class">Business</span>
  //                     </p>

  //                     <div class="block_photo">
  //                         <div class="icon">
  //                             <i class="icon-arrow-bottom"></i>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //         <div class="block-drop-down">
  //             <div class="passenger">
  //                 <div class="drop-passenger-title">Passenger</div>
  //                 <div class="passenger_field">
  //                     <div class="field__inf">
  //                         <p>Adults</p>
  //                         <p class="field__inf__aged">Aged 13+</p>
  //                     </div>

  //                     <div class="field__num">
  //                         <div class="quantity_inner">
  //                             <div class="bt_minus">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  //                                     height="24" width="24" aria-hidden="true"
  //                                     fill="currentcolor" color="#006dd2" tabindex="-1"
  //                                     focusable="false" role="img"
  //                                     class="Svg-sc-12lgb6u-0 gHvJpT RadioMinus__SvgRadioMinus-sc-pyt6vi-0 leZWKJ">
  //                                     <path
  //                                         d="M7 11v2h10v-2H7zm5-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z">
  //                                     </path>
  //                                 </svg>
  //                             </div>
  //                             <div class="quantity_inner_label">
  //                                 <input id="adults" name="adults" type="hidden" value="1"
  //                                     class="quantity adult" />
  //                                 <label for="adults" class="quantity_label">1</label>
  //                             </div>
  //                             <div class="bt_plus">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  //                                     height="24" width="24" aria-hidden="true"
  //                                     fill="currentcolor" color="#006dd2" tabindex="-1"
  //                                     focusable="false" role="img"
  //                                     class="Svg-sc-12lgb6u-0 gHvJpT RadioPlus__SvgRadioPlus-sc-g798wf-0 cyONYp">
  //                                     <path
  //                                         d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z">
  //                                     </path>
  //                                 </svg>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>

  //                 <div class="passenger_field">
  //                     <div class="field__inf">
  //                         <p>Children</p>
  //                         <p class="field__inf__aged">Aged 2-12</p>
  //                     </div>

  //                     <div class="field__num">
  //                         <div class="quantity_inner">
  //                             <div class="bt_minus">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  //                                     height="24" width="24" aria-hidden="true"
  //                                     fill="currentcolor" color="#006dd2" tabindex="-1"
  //                                     focusable="false" role="img"
  //                                     class="Svg-sc-12lgb6u-0 gHvJpT RadioMinus__SvgRadioMinus-sc-pyt6vi-0 leZWKJ">
  //                                     <path
  //                                         d="M7 11v2h10v-2H7zm5-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z">
  //                                     </path>
  //                                 </svg>
  //                             </div>
  //                             <div class="quantity_inner_label">
  //                                 <input id="children" name="children" type="hidden" value="0"
  //                                     class="quantity children" />
  //                                 <label for="children" class="quantity_label">0</label>
  //                             </div>
  //                             <div class="bt_plus">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  //                                     height="24" width="24" aria-hidden="true"
  //                                     fill="currentcolor" color="#006dd2" tabindex="-1"
  //                                     focusable="false" role="img"
  //                                     class="Svg-sc-12lgb6u-0 gHvJpT RadioPlus__SvgRadioPlus-sc-g798wf-0 cyONYp">
  //                                     <path
  //                                         d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z">
  //                                     </path>
  //                                 </svg>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>

  //                 <div class="passenger_field">
  //                     <div class="field__inf">
  //                         <p>Infants</p>
  //                         <p class="field__inf__aged">Under 2</p>
  //                     </div>

  //                     <div class="field__num">
  //                         <div class="quantity_inner">
  //                             <div class="bt_minus">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  //                                     height="24" width="24" aria-hidden="true"
  //                                     fill="currentcolor" color="#006dd2" tabindex="-1"
  //                                     focusable="false" role="img"
  //                                     class="Svg-sc-12lgb6u-0 gHvJpT RadioMinus__SvgRadioMinus-sc-pyt6vi-0 leZWKJ">
  //                                     <path
  //                                         d="M7 11v2h10v-2H7zm5-9C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z">
  //                                     </path>
  //                                 </svg>
  //                             </div>
  //                             <div class="quantity_inner_label">
  //                                 <input id="infants" name="infants" type="hidden" value="0"
  //                                     class="quantity infants" />
  //                                 <label for="infants" class="quantity_label">0</label>
  //                             </div>
  //                             <div class="bt_plus">
  //                                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
  //                                     height="24" width="24" aria-hidden="true"
  //                                     fill="currentcolor" color="#006dd2" tabindex="-1"
  //                                     focusable="false" role="img"
  //                                     class="Svg-sc-12lgb6u-0 gHvJpT RadioPlus__SvgRadioPlus-sc-g798wf-0 cyONYp">
  //                                     <path
  //                                         d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z">
  //                                     </path>
  //                                 </svg>
  //                             </div>
  //                         </div>
  //                     </div>
  //                 </div>
  //             </div>
  //             <div class="class_f">
  //                 <div class="drop-passenger-title">Class</div>
  //                 <div class="class_field">
  //                     <div class="form_radio_btn">
  //                         <input id="radio-1" type="radio" name="type_ticket" value="Business"
  //                             checked="true" />
  //                         <label for="radio-1">Business</label>
  //                     </div>

  //                     <div class="form_radio_btn">
  //                         <input id="radio-2" type="radio" name="type_ticket" value="First" />
  //                         <label for="radio-2">First</label>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // </div>`;
  //     if (passengers_position === 1) {
  //       form_name = 'findFlightTickets';
  //       drops_container_1 = drops_container;
  //       standart_form = `<div class="form-main-btn-block">
  //             <button class="button btn-main-form">Get a Free Quote</button>
  //         </div>`;
  //     } else {
  //       title = `<div class="search-results-title">Get Your Free Quote</div>`;
  //       form_name = 'flightTickets';
  //       drops_container_2 = drops_container;
  //       standart_form = `
  //         <div class="container-field" >
  //             <div class="field_calendar">
  //             <div class="flex flex-two-fields">
  //                 <div class="flex">
  //                     <div class="field ">
  //                         <p>
  //                             <label for="name">Name</label>
  //                             <input type="text" name="name" id="name"
  //                             data-validation="required|min[3]"  placeholder="First, Last Name">
  //                         </p>
  //                     </div>
  //                 </div>
  //                 ${drops_container_2}
  //                 </div>
  //             </div>

  //         </div>
  //         <div class="container-field" >
  //             <div class="field_calendar">
  //                 <div class="flex flex-two-fields">
  //                     <div class="field">
  //                         <p>
  //                             <label for="phone">Phone number</label>
  //                             <input type="tel"
  //                             data-validation="required|min[3]" name="phone" id="phone" class="phone" >
  //                         </p>
  //                     </div>

  //                     <div class="field ">
  //                         <p>
  //                             <label for="email">Email address</label>
  //                             <input type="email"
  //                             data-validation="required|mail" name="email" id="email"  placeholder="Enter email address">
  //                         </p>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>

  //         <div class="container-field" style="margin:10px 0;">

  //             <label for="modal_checkbox-5">
  //                 <span class="text">
  //                 ** By submitting my details I agree to be contacted to discuss my travel plans
  //                     <a href="../privacyPolicy" target="blank">Privacy Policy</a>
  //                 </span>
  //             </label>
  //         </div>
  //             <button class="button  btn-fill" id="submit_flight" name="submit_flight">Submit</button>
  //         `;
  //     }

  //     sectionMainForm.innerHTML = `${title}	<div class="section-special-offer-main">
  //     <div class="save-up">Save up to $3,000</div>
  //     <form class="form-valid-tab white mainForm" id="searchflights" novalidate name="${form_name}">
  //         <div class="fly-trip-types">
  //             <div class="fly-trip-type-block">
  //                 <input
  //                     id="fly-trip-radio-1"
  //                     type="radio"
  //                     name="fly_trip_type"
  //                     value="Round-trip"
  //                     class="fly-trip-radio"
  //                     checked="true"
  //                 />
  //                 <label for="fly-trip-radio-1">
  //                     <span class="fly-trip-type">
  //                         <span class="icon">
  //                             <i class="icon-round-trip"></i>
  //                         </span>
  //                         <p>Round-trip</p>
  //                     </span>
  //                 </label>
  //             </div>

  //             <div class="fly-trip-type-block">
  //                 <input
  //                     id="fly-trip-radio-2"
  //                     type="radio"
  //                     name="fly_trip_type"
  //                     class="fly-trip-radio"
  //                     value="One-way"
  //                 />
  //                 <label for="fly-trip-radio-2">
  //                     <span class="fly-trip-type">
  //                         <span class="icon">
  //                             <i class="icon-direct-flight"></i>
  //                         </span>
  //                         <p>One-way</p>
  //                     </span>
  //                 </label>
  //             </div>

  //             <div class="fly-trip-type-block">
  //                 <input
  //                     id="fly-trip-radio-3"
  //                     type="radio"
  //                     name="fly_trip_type"
  //                     class="fly-trip-radio"
  //                     value="Multi-city"
  //                 />
  //                 <label for="fly-trip-radio-3">
  //                     <span class="fly-trip-type">
  //                         <span class="icon">
  //                             <i class="icon-airplane-2"></i>
  //                         </span>
  //                         <p>Multi-city</p>
  //                     </span>
  //                 </label>
  //             </div>
  //         </div>
  //         <div class="fly-trip-content">
  //             <div class="fly-trip-pane" data-container-field-row-id="0">
  //                 <div class="container-field container-field-row" >
  //                     <div class="block-city-row">
  //                         <div class="btn_switch switch">
  //                             <img src="/assets/icons/exchange-alt.svg" alt="exchange" width="32" height="32"  />
  //                         </div>

  //                         <div class="field  city">
  //                             <div class="flex">
  //                                 <div class="block_input">
  //                                     <p class="name_block">From</p>
  //                                     <div class="search-input">
  //                                         <input
  //                                             name="flight[0]['from']"
  //                                             type="text"
  //                                             class="input_from input-from-switch"
  //                                             placeholder="Enter City or Airport"
  //                                             autocomplete="off"
  //                                             data-validation="required|min[3]"
  //                                         />
  //                                         <input
  //                                             name="flight[0]['cityAirport']"
  //                                             type="hidden"
  //                                             class="cityAirport input_airport"
  //                                         />
  //                                         <input
  //                                             name="flight[0]['cityCode']"
  //                                             type="hidden"
  //                                             class="cityCode"
  //                                             data-validation="required"
  //                                         />

  //                                         <input
  //                                             name="flight[0]['originEntityId']"
  //                                             type="hidden"
  //                                             class="originEntityId"
  //                                         />
  //                                         <div class="autocom-box"></div>
  //                                         <div class="loading-container" class="hidden"></div>
  //                                     </div>
  //                                 </div>

  //                                 <div class="block_photo">
  //                                     <div class="icon">
  //                                         <img
  //                                             src="${baseUrl}assets/mainForm/img/airplane-1.svg"
  //                                             alt="Airplane"
  //                                             title="Airplane"
  //                                             class="from_airplane_img"
  //                                         />
  //                                     </div>
  //                                 </div>
  //                             </div>
  //                         </div>

  //                         <div class="field  city">
  //                             <div class="flex">
  //                                 <div class="block_input">
  //                                     <p class="name_block">To</p>
  //                                     <div class="search-input">
  //                                         <input
  //                                             name="flight[0]['to']"
  //                                             type="text"
  //                                             class="input_to input-to-switch"
  //                                             placeholder="Enter City or Airport"
  //                                             autocomplete="off"
  //                                             data-validation="required|min[3]"
  //                                         />
  //                                         <input
  //                                             name="flight[0]['cityAirportTo']"
  //                                             type="hidden"
  //                                             class="cityAirportTo input_airport"
  //                                         />
  //                                         <input
  //                                             name="flight[0]['cityCodeTo']"
  //                                             type="hidden"
  //                                             class="cityCodeTo"
  //                                             data-validation="required"
  //                                         />
  //                                         <input
  //                                             name="flight[0]['destinationEntityId']"
  //                                             type="hidden"
  //                                             class="destinationEntityId"
  //                                         />
  //                                         <div class="autocom-box"></div>
  //                                         <div class="loading-container" class="hidden"></div>
  //                                     </div>
  //                                 </div>

  //                                 <div class="block_photo">
  //                                     <div class="icon icon_to">
  //                                         <img
  //                                             src="${baseUrl}assets/mainForm/img/airplane-1.svg"
  //                                             alt="Airplane"
  //                                             title="Airplane"
  //                                             class="to_airplane_img"
  //                                         />
  //                                     </div>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     </div>

  //                     <div class="field_calendar">
  //                         <div class="flex flex_decoration input-group input-daterange jDaterange">
  //                             <div class="field ">
  //                                 <div class="block_input">
  //                                     <p class="name_block">Departure</p>
  //                                     <div class="date">
  //                                         <input
  //                                             class="input_departure inputDate from "
  //                                             name="flight[0]['date_start']"
  //                                             placeholder="Select date"
  //                                             type="text"
  //                                             autocomplete="off"
  //                                             data-validation="required|date"
  //                                         />
  //                                         <span class="input-group-addon">
  //                                             <i class="icon-calendar"></i>
  //                                         </span>
  //                                     </div>
  //                                 </div>
  //                             </div>

  //                             <div class="field  field_return">
  //                                 <div class="block_input block_return">
  //                                     <p class="name_block">Return</p>
  //                                     <div class="date" data-date-format="mm-dd-yyyy">
  //                                         <input
  //                                             class="input_return inputDate to"
  //                                             name="flight[0]['date_end']"
  //                                             placeholder="Select date"
  //                                             type="text"
  //                                             autocomplete="off"

  //                                             data-validation="required|date"
  //                                         />
  //                                         <span class="input-group-addon">
  //                                             <i class="icon-calendar"></i>
  //                                         </span>
  //                                     </div>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                         ${drops_container_1}
  //                     </div>

  //                 </div>

  //             </div>
  //         </div>

  //         ${standart_form}

  //     </form>
  // </div>`;
  //   }
};
