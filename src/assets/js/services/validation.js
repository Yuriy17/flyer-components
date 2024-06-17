import { unfade, setPreloader, fade } from './preloader.js';
import { formSubmit, formSubmitTicket } from './send-mail.js';

// Your validation code here...
export const initValidation = () => {

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async function (e) {
      console.log(e.currentTarget);
      console.log(e);
      alert('sdf')
      alert(e.toJSON())
      e.preventDefault();
      const formFields = Array.from(form.elements);
      let isValidate = true;
      let errorValid, errorValidText, error_block, errorNumberValid;

      if (form.classList.contains('white')) {
        errorValid = 'errorValid_1';
        errorValidText = 'errorValidText_1';
        error_block = 'error_block_1';
        errorNumberValid = 'errorNumberValid_1';
      } else {
        errorValid = 'errorValid_2';
        errorValidText = 'errorValidText_2';
        error_block = 'error_block_2';
        errorNumberValid = 'errorNumberValid_2';
      }

      form.querySelectorAll(`.${errorValid}`).forEach((item) => item.classList.remove(errorValid));
      form.querySelectorAll(`.${errorValidText}`).forEach((item) => item.classList.remove(errorValidText));
      form.querySelectorAll(`.${error_block}`).forEach((item) => item.remove());

      formFields.forEach((item) => {
        if (!item.hasAttribute('disabled') && item.hasAttribute('data-validation')) {
          let checkValidate = main_validation(item, errorValid, errorNumberValid, error_block);
          if (!checkValidate) {
            isValidate = false;
          }
        }
      });

      if (isValidate) {
        await unfade(preloader);

        const formName = form.getAttribute('name');
        const formType = form.classList.contains('mainForm');
        let messageTitle = 'We appreciate your inquiry!';
        let message = 'You will be contacted by one of our travel experts shortly.';

        if (!formType) {
          await setPreloader('loading');
          const formEl = new FormData(form);
          const json = Object.fromEntries(formEl.entries());

          let findPersonInPipedrive = 0;
          let isSubscription = 0;

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
          await setPreloader('loading');

          const passengerValue = document.querySelector('.number_passengers-all').textContent.trim();
          const formEl = new FormData(form);
          const formElements = Object.fromEntries(formEl.entries());
          const rowsOfDeparture = document.querySelectorAll('[data-container-field-row-id]');
          const totalDepartureCount =
            rowsOfDeparture[rowsOfDeparture.length - 1].getAttribute('data-container-field-row-id');
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
                entityId: formElements[`flight[${i}]['originEntityId']`]
              });
              objTo.push({
                cityName: formElements[`flight[${i}]['to']`],
                airportName: formElements[`flight[${i}]['cityAirportTo']`],
                cityCode: formElements[`flight[${i}]['cityCodeTo']`],
                entityId: formElements[`flight[${i}]['destinationEntityId']`]
              });
              objDepartureDate.push({
                date: formElements[`flight[${i}]['date_start']`]
              });
            }
          }
          objReturnDate.push({
            date: formElements["flight[0]['date_end']"]
          });

          const formData = {
            flyTripType: {
              flyTripType: formElements.fly_trip_type
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
              infants: formElements.infants
            }
          };
          localStorage.setItem('flightTicketInfo', JSON.stringify(formData));
          if (formName !== 'flightTickets') {
            await setPreloader('searching');
            await findFlights(
              formElements.fly_trip_type,
              objFrom,
              objTo,
              objDepartureDate,
              objReturnDate,
              formElements.type_ticket,
              formElements.adults,
              formElements.children,
              formElements.infants,
              'fastest'
            );
            await redirectToHowToBook();
            return;
          } else {
            await setPreloader('loading');
            const formEl = new FormData(form);
            const json = Object.fromEntries(formEl.entries());

            let findPersonInPipedrive = 0;
            let isSubscription = 0;
            await formSubmitTicket(json);
            await addLeadToSalesForce(json);
          }
        }
        if (isSubscription === 0) {
          await redirectToThankYou();
        } else {
          let modalSuccess = document.querySelector('.modal-success');
          modalSuccess.querySelector('.success-title').textContent = messageTitle;
          modalSuccess.querySelector('.section-contact__description').textContent = message;
          modalSuccess.style.display = 'block';
          await fade(preloader, false);
        }
      }
    });
  });

  async function redirectToHowToBook() {
    location.href = '../booking/#searchflights';
  }
  async function redirectToThankYou() {
    location.href = '../thankyou/';
  }

  function validateText(item, countChars) {
    let isValidate = false;
    const value = item.value;
    isValidate = value.length >= countChars;
    if (item.closest('.date')) {
      isValidate = isValidDate(value);
    }
    return isValidate;
  }

  function validateTextMax(value, countChars) {
    return value.length <= countChars;
  }

  function validateMail(email) {
    if (email.trim() === 'florante_torres@yahoo.com') {
      return false;
    }
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

  function isValidDate(dateString) {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;
    const parts = dateString.split('/');
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);
    if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;
    const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;
    return day > 0 && day <= monthLength[month - 1];
  }

  const mainRules = {
    required: 'Field is required!',
    mail: 'Incorrect Format',
    min: 'Minimum field length ',
    max: 'Maximum field length ',
    countChars: 'Required number of characters in the field',
    phone: 'Invalid phone number format',
    select: 'Please select from list',
    date: 'Please enter a valid date'
  };

  function main_validation(item, errorValid, errorNumberValid, error_block) {
    let isValidate = false;
    const validate = item
      .getAttribute('data-validation')
      .split(',')
      .map((item) => item.trim());
    if (validate.includes('text')) {
      isValidate = validateText(item, parseInt(validate[validate.indexOf('text') + 1], 10));
    }
    if (validate.includes('phone')) {
      isValidate = validatePhone(item);
    }
    if (validate.includes('mail')) {
      isValidate = validateMail(item.value);
    }
    if (validate.includes('min')) {
      isValidate = validateText(item, parseInt(validate[validate.indexOf('min') + 1], 10));
    }
    if (validate.includes('max')) {
      isValidate = validateTextMax(item.value, parseInt(validate[validate.indexOf('max') + 1], 10));
    }
    if (validate.includes('date')) {
      isValidate = isValidDate(item.value);
    }
    if (validate.includes('select')) {
      isValidate = item.options[item.selectedIndex].value !== '0';
    }
    if (!isValidate) {
      item.classList.add(errorValid);
      if (validate.includes('min')) {
        item
          .closest('form')
          .insertAdjacentHTML(
            'beforeend',
            `<div class="${error_block}">${mainRules.min}${validate[validate.indexOf('min') + 1]}</div>`
          );
      }
      if (validate.includes('max')) {
        item
          .closest('form')
          .insertAdjacentHTML(
            'beforeend',
            `<div class="${error_block}">${mainRules.max}${validate[validate.indexOf('max') + 1]}</div>`
          );
      }
      if (validate.includes('countChars')) {
        item
          .closest('form')
          .insertAdjacentHTML(
            'beforeend',
            `<div class="${error_block}">${mainRules.countChars}${validate[validate.indexOf('countChars') + 1]}</div>`
          );
      }
      if (validate.includes('phone')) {
        item.closest('form').insertAdjacentHTML('beforeend', `<div class="${error_block}">${mainRules.phone}</div>`);
      }
      if (validate.includes('mail')) {
        item.closest('form').insertAdjacentHTML('beforeend', `<div class="${error_block}">${mainRules.mail}</div>`);
      }
      if (validate.includes('required')) {
        item.closest('form').insertAdjacentHTML('beforeend', `<div class="${error_block}">${mainRules.required}</div>`);
      }
      if (validate.includes('date')) {
        item.closest('form').insertAdjacentHTML('beforeend', `<div class="${error_block}">${mainRules.date}</div>`);
      }
      if (validate.includes('select')) {
        item.closest('form').insertAdjacentHTML('beforeend', `<div class="${error_block}">${mainRules.select}</div>`);
      }
    }
    return isValidate;
  }

  function validatePhone(phone) {
    return String(phone)
      .toLowerCase()
      .match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
  }
};
