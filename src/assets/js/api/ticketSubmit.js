import { base_api_url, options } from '../../helpers/constants.js';

export async function findFlights({
  flyTripType,
  from,
  to,
  departureDate,
  returnDate,
  type_ticket,
  adults,
  children,
  infants,
  sortBy,
}) {
  let legs = '';
  //flyTripType = "One-way";
  if (flyTripType === 'Round-trip') {
    let [month_1, day_1, year_1] = departureDate[0]['date'].split('/');
    let [month_2, day_2, year_2] = returnDate[0]['date'].split('/');
    legs = `{"origin":"${from[0]['cityCode']}","originEntityId":"${from[0]['entityId']}","destination":"${to[0]['cityCode']}","destinationEntityId":"${to[0]['entityId']}","date":"${year_1}-${month_1}-${day_1}" },{"origin":"${to[0]['cityCode']}","originEntityId":"${from[0]['entityId']}","destination":"${from[0]['cityCode']}","destinationEntityId":"${to[0]['entityId']}","date":"${year_2}-${month_2}-${day_2}"}`;
  } else if (flyTripType === 'One-way' || flyTripType === 'Multi-city') {
    for (let i = 0; i < departureDate.length; i++) {
      let [month_1, day_1, year_1] = departureDate[i]['date'].split('/');
      legs += `{"origin":"${from[i]['cityCode']}","originEntityId":"${from[i]['entityId']}","destination":"${to[i]['cityCode']}","destinationEntityId":"${to[i]['entityId']}","date":"${year_1}-${month_1}-${day_1}"},`;
    }
    legs = legs.slice(0, -1);
  }
  const legs_encoded = encodeURIComponent(`[${legs}]`);
  const cabinClass = `${type_ticket.toLowerCase()}`;
  const currency = 'USD';
  //const market = "US";
  adults = 1;
  let request = `legs=${legs_encoded}&adults=${adults}&cabinClass=${cabinClass}&currency=${currency}&sortBy=${sortBy}`;
  children > 0 && (request += `&children=${children}`);
  infants > 0 && (request += `&infants=${infants}`);

  const url = `${base_api_url}api/v2/searchFlightsMultiStops?
	${request}`;
  let ticketInfo = [],
    differentPartners = 0,
    ticketInfoUniq = [];
  await fetch(url, options)
    .then((res) => res.json())
    .then((response) => {
      let allFlights = response.message;
      //console.log(allFlights["itineraries"])
      if (allFlights && allFlights['itineraries'].length > 0) {
        for (let i = 0; i < allFlights['itineraries'].length; i++) {
          if (Number(allFlights['itineraries'][i]['price']['raw']) > 2988) {
            const randomMultiplier = Math.random() * (0.99 - 0.95) + 0.95;
            allFlights['itineraries'][i]['price']['raw'] = 2988 * randomMultiplier;
          }
          if (
            ticketInfo.findIndex(
              (item) => item.partner_name === allFlights['itineraries'][i]['legs'][0]['carriers']['marketing'][0]['name']
            ) == -1
          ) {
            differentPartners++;
          }
          ticketInfo.push({
            partner_name: allFlights['itineraries'][i]['legs'][0]['carriers']['marketing'][0]['name'],
            partner_logo: allFlights['itineraries'][i]['legs'][0]['carriers']['marketing'][0]['logoUrl'],
            price: allFlights['itineraries'][i]['price']['raw'] * 0.45,
          });

          if (differentPartners == 4) {
            break;
          }
        }
      }
      if (ticketInfo.length > 4) {
        ticketInfo.forEach((item) => {
          let partner = item['partner_name'];
          if (ticketInfoUniq.findIndex((itemFI) => itemFI.partner_name === partner) == -1) {
            ticketInfoUniq.push(item);
          }
        });
        if (ticketInfoUniq.length < 4) {
          for (let i = ticketInfoUniq.length; i < ticketInfo.length; i++) {
            ticketInfoUniq.push(ticketInfo[i]);
            if (ticketInfoUniq.length >= 4) {
              break;
            }
          }
        }
      } else {
        ticketInfoUniq = ticketInfo;
      }
      localStorage.setItem('lastSearchTicket', JSON.stringify(ticketInfoUniq));
    })
    .catch((err) => console.error(err));
}

export async function findFlightsDetails(itineraryId, leg, children, infants, adults, currency) {
  // TODO uncomment when it require
  // const flightData = {};
  const urlFlightDetails = `${base_api_url}api/v1/getFlightDetails?itineraryId=${itineraryId}&legs=${leg}&children=${children}&infants=${infants}&adults=${adults}&currency=${currency}`;
  await fetch(urlFlightDetails, options)
    .then((res) => res.json())
    .then((response) => {
      let flightInfo = response.data;
      //flightData[i]['data'].push(flightInfo);
      console.log(flightInfo);
    })
    .catch((err) => console.error(err));
  //console.log(flightData);
}
