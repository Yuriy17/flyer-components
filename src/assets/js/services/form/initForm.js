import { unfade, fadeOut, preloader } from '../initPreloader';
import { addLeadToSalesForce } from '../metrics';
import { addDynamicGroup } from './addDynamicGroup';
import { formSubmit } from './formSubmit';
import { fieldsSetupValidation, setupStaticFields } from './setupFields';

export const initForm = async (formElement) => {
  if (formElement) {
    let validationStarted = false;
    let dynamicFieldCounter = 0;
    let libObjects = {};

    const addDynamicGroupCallback = async ({ dynamicGroupsElement }) => {
      const { dynamicGroup, dynamicLibObjects } = await addDynamicGroup({
        parentElement: dynamicGroupsElement,
        groupIndex: dynamicFieldCounter,
        formElement,
      });
      dynamicLibObjects && Object.assign(libObjects, dynamicLibObjects);

      dynamicFieldCounter++;

      return dynamicGroup;
    };

    const dynamicGroupsElement = formElement.querySelector('.dynamic-groups');
    // const fieldLibsNames = ['phone', 'date'];
    const initLibsObject = () => {
      // Initialize static lib fields
      const fieldNames = Object.keys(formElement.elements).filter((word) => isNaN(word));
      Object.assign(
        libObjects,
        setupStaticFields({
          fieldNames: fieldNames,
          formElement,
        })
      );
    };
    initLibsObject();
    if (dynamicGroupsElement) {
      const dynamicGroupElement = await addDynamicGroupCallback({ dynamicGroupsElement });
      const addFieldButton = dynamicGroupElement?.querySelector('.dynamic-group__button-add');

      addFieldButton?.addEventListener('click', () => addDynamicGroupCallback({ dynamicGroupsElement }));
    }

    formElement.addEventListener('submit', async (event) => {
      event.preventDefault();
      const fields = formElement.querySelectorAll('[data-validate]');

      // add change listener if not added before and trigger validation
      const isValidate = fieldsSetupValidation({
        fields,
        validationStarted: true,
        trigger: true,
        addListener: !validationStarted,
        libObjects,
      });
      formElement.dataset.validationStarted = 'true';
      validationStarted = true;
      console.log(`Form is ${isValidate ? 'valid' : 'invalid'}`);
      if (isValidate) {
        await unfade(preloader);
        try {
          const formName = formElement.getAttribute('name');
          let messageTitle = 'We appreciate your inquiry!';
          let message = 'You will be contacted by one of our travel experts shortly.';
          let isSubscription = 0;

          if (formElement.classList.contains('mainForm')) {
            // await setPreloader('loading');

            const formEl = new FormData(formElement);
            const formElements = Object.fromEntries(formEl.entries());

            // const passengerValue = document.querySelector('.number_passengers-all').textContent.trim();
            const passengerValue = formElements.passenger.split('|')[0].trim();

            const objFrom = [],
              objTo = [],
              objDepartureDate = [],
              objReturnDate = [];
            let totalDepartureCount = 1;
            const formResultObj = { ...formElements };
            formResultObj.fly_trip_type = formElement.dataset.value;
            const splitedPhone = formResultObj.phone.replaceAll('-', '').split(' ');
            splitedPhone.shift();
            formResultObj.phone = splitedPhone.join(''); 
            formResultObj.passenger && delete formResultObj.passenger;
                        
            if (dynamicGroupsElement) {
              const rowsOfDeparture = dynamicGroupsElement.querySelectorAll('.dynamic-group');
              totalDepartureCount = rowsOfDeparture.length;
            }
            for (let i = 0; i < totalDepartureCount; i++) {
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
              const dateNameField = `flight[${i}]['date']`;
              formResultObj[dateNameField] && delete formResultObj[dateNameField];
              const dateValues = libObjects[dateNameField].selectedDates;
              const startDate = dateValues[0].toLocaleDateString();
              if (dateValues.length === 2) {
                const endDate = dateValues[1].toLocaleDateString();
                objReturnDate.push({
                  date: endDate,
                });
                formResultObj[`flight[${i}]['date_end']`] = endDate;
              }
              formResultObj[`flight[${i}]['date_start']`] = startDate;
              objDepartureDate.push({
                date: startDate,
              });
            }
            
            console.log("🚀 ~ formElement.addEventListener ~ formResultObj:", formResultObj);

            const formData = {
              flyTripType: {
                flyTripType: formElement.dataset.value,
              },
              from: objFrom,
              to: objTo,
              departureDate: objDepartureDate,
              returnDate: objReturnDate,
              passenger: {
                type: formElement.dataset.value,
                allPassenger: passengerValue,
                adults: formElements.adults,
                children: formElements.children,
                infants: formElements.infants,
              },
            };


            localStorage.setItem('flightTicketInfo', JSON.stringify(formData));
            await fadeOut(preloader);
            // if (formName !== 'flightTickets') {
              // await setPreloader('searching');
              // await findFlights({
              //   flyTripType: formElements.fly_trip_type,
              //   from: objFrom,
              //   to: objTo,
              //   departureDate: objDepartureDate,
              //   returnDate: objReturnDate,
              //   type_ticket: formElement.dataset.value,
              //   adults: formElements.adults,
              //   children: formElements.children,
              //   infants: formElements.infants,
              //   sortBy: 'fastest',
              // });
              // await redirectToHowToBook();
            //   return;
            // } else {
              // await setPreloader('loading');
            //   const formEl = new FormData(formElement);
            //   const json = Object.fromEntries(formEl.entries());

            //   // let findPersonInPipedrive = 0;
            //   isSubscription = 0;
            //   // await formSubmitTicket(json);
            //   await addLeadToSalesForce(json);
            // }
          } else {
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
        } catch (error) {
          console.log('🚀 ~ formElement.addEventListener ~ error:', error);
          await fadeOut(preloader);
        }
      }
    });
  }
};
