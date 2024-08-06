//SF adding leads
//Sales Force API
export async function addLeadToSalesForce(json) {
  json['formtype'] = 'lead';
  json['utmSource'] = localStorage.getItem('utm_source') != 'undefined' ? localStorage.getItem('utm_source') : 'organic';
  json['utm_medium'] = localStorage.getItem('utm_medium') != 'undefined' ? localStorage.getItem('utm_medium') : '';

  json['utm_campaign'] = localStorage.getItem('utm_campaign') != 'undefined' ? localStorage.getItem('utm_campaign') : '';
  json['utm_content'] = localStorage.getItem('utm_content') != 'undefined' ? localStorage.getItem('utm_content') : '';
  json['utm_term'] = localStorage.getItem('utm_term') != 'undefined' ? localStorage.getItem('utm_term') : '';
  await fetch(`https://flyer-club.com/flightbooking/salesforce_auth.php`, {
    //https://flyer-club.com/
    method: 'POST',
    body: JSON.stringify(json),
  })
    .then(async (response) => {
      console.log('🚀 ~ .then ~ response:', response);
      //location.href = "../thankyouorder/";
    })
    .catch(async (error) => {
      console.log('🚀 ~ addLeadToSalesForce ~ error:', error);
      //location.href = "../thankyouorder/";
    });
}
