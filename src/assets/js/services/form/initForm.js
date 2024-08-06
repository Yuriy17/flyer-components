import { unfade, fadeOut, preloader } from '../initPreloader';
import { addLeadToSalesForce } from '../metrics';
import { addDynamicGroup } from './addDynamicGroup';
import { formSubmit } from './formSubmit';
import { fieldsSetupValidation, setupStaticFields } from './setupFields';

export const initForm = async (formElement) => {
  if (formElement) {
    let validationStarted = false;
    let dynamicFieldCounter = 0;

    const addDynamicGroupCallback = async ({ dynamicGroupsElement }) => {
      const dynamicField = await addDynamicGroup({
        parentElement: dynamicGroupsElement,
        groupIndex: dynamicFieldCounter,
        formElement,
      });
      dynamicFieldCounter++;

      return dynamicField;
    };
    let libsObject;
    const dynamicGroupsElement = formElement.querySelector('.dynamic-groups');
    const fieldLibsNames = ['phone', `flight[0]['date']`];
    if (dynamicGroupsElement) {
      const dynamicGroupElement = await addDynamicGroupCallback({ dynamicGroupsElement });
      const addFieldButton = dynamicGroupElement?.querySelector('.dynamic-group__button-add');
      addFieldButton?.addEventListener('click', () => addDynamicGroupCallback({ dynamicGroupsElement }));
      fieldLibsNames.push('passenger');
 
    } 
    // Initialize static lib fields
    
    libsObject = setupStaticFields({
      fieldNames: fieldLibsNames,
      formElement,
    });

    formElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      const fields = formElement.querySelectorAll('[data-validate]');

      // add change listener if not added before and trigger validation
      const isValidate = fieldsSetupValidation({
        fields,
        validationStarted: true,
        trigger: true,
        addListener: !validationStarted,
        libsObject,
      });
      formElement.dataset.validationStarted = 'true';
      validationStarted = true;
      alert(`Form is ${isValidate ? 'valid' : 'invalid'}`);
      if (isValidate) {
        await unfade(preloader);

        const formName = formElement.getAttribute('name');
        const formType = formElement.classList.contains('mainForm');
        let messageTitle = 'We appreciate your inquiry!';
        let message = 'You will be contacted by one of our travel experts shortly.';
        let isSubscription = 0;

        if (!formType) {
          // await setPreloader('loading');
          const formEl = new FormData(formElement);
          const json = Object.fromEntries(formEl.entries());

          // TODO: uncomment when added logic for findPersonInPipedrive vars if require
          // let findPersonInPipedrive = 0;

          if (formName === 'subscription') {
            isSubscription = 1;
            messageTitle = 'Thanks for the subscription!';
            message = 'Please find confirmation email in your inbox.';
            localStorage.setItem('subscribed', '1');
          } else {
            await formSubmit(json);
            await addLeadToSalesForce(json);
          }
        } else {
          // await setPreloader('loading');

          const passengerValue = document.querySelector('.number_passengers-all').textContent.trim();
          const formEl = new FormData(formElement);
          const formElements = Object.fromEntries(formEl.entries());
          const rowsOfDeparture = document.querySelectorAll('[data-container-field-row-id]');
          const totalDepartureCount = rowsOfDeparture[rowsOfDeparture.length - 1].getAttribute('data-container-field-row-id');
          const objFrom = [],
            objTo = [],
            objDepartureDate = [],
            objReturnDate = [];

          for (let i = 0; i <= totalDepartureCount; i++) {
            if (document.querySelector(`[data-container-field-row-id="${i}"]`)) {
              objFrom.push({
                cityName: formElements[`flight[${i}]['from']`],
                airportName: formElements[`flight[${i}]['cityAirport']`],
                cityCode: formElements[`flight[${i}]['cityCode']`],
                entityId: formElements[`flight[${i}]['originEntityId']`],
              });
              objTo.push({
                cityName: formElements[`flight[${i}]['to']`],
                airportName: formElements[`flight[${i}]['cityAirportTo']`],
                cityCode: formElements[`flight[${i}]['cityCodeTo']`],
                entityId: formElements[`flight[${i}]['destinationEntityId']`],
              });
              objDepartureDate.push({
                date: formElements[`flight[${i}]['date_start']`],
              });
            }
          }
          objReturnDate.push({
            date: formElements["flight[0]['date_end']"],
          });

          const formData = {
            flyTripType: {
              flyTripType: formElements.fly_trip_type,
            },
            from: objFrom,
            to: objTo,
            departureDate: objDepartureDate,
            returnDate: objReturnDate,
            passenger: {
              type: formElements.type_ticket,
              allPassenger: passengerValue[0],
              adults: formElements.adults,
              children: formElements.children,
              infants: formElements.infants,
            },
          };
          localStorage.setItem('flightTicketInfo', JSON.stringify(formData));
          if (formName !== 'flightTickets') {
            // await setPreloader('searching');
            // await findFlights({
            //   flyTripType: formElements.fly_trip_type,
            //   from: objFrom,
            //   to: objTo,
            //   departureDate: objDepartureDate,
            //   returnDate: objReturnDate,
            //   type_ticket: formElements.type_ticket,
            //   adults: formElements.adults,
            //   children: formElements.children,
            //   infants: formElements.infants,
            //   sortBy: 'fastest',
            // });
            // await redirectToHowToBook();
            return;
          } else {
            // await setPreloader('loading');
            const formEl = new FormData(formElement);
            const json = Object.fromEntries(formEl.entries());

            // let findPersonInPipedrive = 0;
            isSubscription = 0;
            // await formSubmitTicket(json);
            await addLeadToSalesForce(json);
          }
        }
        if (isSubscription === 0) {
          // await redirectToThankYou();
        } else {
          let modalSuccess = document.querySelector('.modal-success');
          modalSuccess.querySelector('.success-title').textContent = messageTitle;
          modalSuccess.querySelector('.section-contact__description').textContent = message;
          modalSuccess.style.display = 'block';
          await fadeOut(preloader);
        }
      }
    });
  }
};
