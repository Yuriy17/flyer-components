//форма на главной станице
const dataLayer = window.dataLayer;

export async function formSubmit(json) {
  // TODO: uncomment when added isSubscription and findPersonInPipedrive vars if require
  // if (isSubscription == 1 && findPersonInPipedrive != 0) {
  //   return;
  // }
  let name = json['name'],
    phone = json['phone'],
    full_phone = json['full_phone'],
    city = json['city'],
    email = json['email'],
    email__active = json['email_active'];

  const request = {
    name: name === undefined ? null : name,
    phone: phone === undefined ? null : full_phone,
    email: email === undefined ? (email__active === undefined ? '' : email__active) : email,
    city: city === undefined ? null : city,
  };
  let response = await fetch('../../send_mail_lead.php', {
    method: 'POST',
    body: JSON.stringify(request),
  });

  if (response.ok) {
    dataLayer.push({ event: 'form_sent' });
  } else {
    alert('Код ошибки: ' + response.status);
  }
}

// форма с информацией о билете
export async function formSubmitTicket() {
  const ticket = new FormData(document.forms['flightTickets']);
  const sendTicket = await fetch('../../send_mail-ticket-flight.php', {
    method: 'POST',
    body: ticket,
  });
  if (sendTicket.ok) {
    dataLayer.push({ event: 'form_sent' });
  } else {
    alert('Код ошибки: ' + sendTicket.status);
  }
}
