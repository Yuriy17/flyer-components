//получение всех лидов

import { sendReqSetForm } from './modal';

export async function getLeads() {
  // TODO uncomment when require
  // let utmSource = 2;
  // if (localStorage.getItem('utm_source')) {
  //   utmSource = 1;
  // }

  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  //myHeaders.append("Cookie", "__cf_bm=lMlJ26gNKgDS.d5.ze1Flm_3e7Mo7R1HKkCRZ1p86w4-1689262497-0-ATeCn9bvay7o2tI7ueAS4FnQrIxhxVtkMI0vUMYnvYwt265LqnEdkfUD5BopzHSkn8qH0V0baEu5vz3BVmnVXTw=");
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  let sort = 'add_time DESC';
  await fetch(
    `https://api.pipedrive.com/v1/leads?api_token=af8650bc565f4a29101ddaa8e12bbd62c5bf1f83&af8650bc565f4a29101ddaa8e12bbd62c5bf1f83=<API Key>&limit=25&sort=${sort}`,
    requestOptions
  )
    .then((response) => response.json())
    .then(() =>
      // result
      {
        // TODO uncomment when require
        // let leads = result.data;
        //console.log(leads);
        // if (leads.length > 0) {
        // 	for (let i = 0; i < leads.length; i++) {
        // 		for (let k = 0; k < leadOwners[utmSource].length; k++) {
        // 		}
        // 	}
        // }
      }
    )
    .catch((error) => console.log('error', error));
}

// запрос на отправку данных полета в crm систему (добавление лида)
export async function setFormTicket(data) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append(
    'Cookie',
    '__cf_bm=.ilzYWTcidLWsusPy.xFX.PJikmphUVjTiSqGMcQGRg-1677749423-0-AbYeNEK8lYCO48wl/3n7rFLcBgaNblu3bBVaMLCkExCehccXkH3FU+YFz8+WU9271erDTB6Skcf20yO74uPzM04='
  );

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  await fetch(
    'https://api.pipedrive.com/v1/leads?api_token=af8650bc565f4a29101ddaa8e12bbd62c5bf1f83&af8650bc565f4a29101ddaa8e12bbd62c5bf1f83=<API Key>',
    requestOptions
  )
    .then(async (response) => await response.text())
    .then((result) => result)
    .catch((error) => console.log('error', error));
}

// добавление персоны с такими же данными как у лида
export async function addPersonCRM(data) {
  let findPersonInPipedrive = await getPerson(data);
  if (findPersonInPipedrive && findPersonInPipedrive != undefined && findPersonInPipedrive != 0) {
    await sendReqSetForm(findPersonInPipedrive);
    return;
  }
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Accept', 'application/json');
  myHeaders.append(
    'Cookie',
    '__cf_bm=IyVDSi3O78NqEFiYHCTx3ofzphiTfpd6v2wpjWsz3xA-1678781043-0-AUjsWMcBb3V2pJPp8P4VJJXC4N/Kpx+Ci2PDxbdEXT+1pd5iq70IhwJ6JIwDL/AgpXPkIyWEluUYuEoVUomP/FI='
  );

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
    redirect: 'follow',
  };

  await fetch(
    'https://api.pipedrive.com/v1/persons?api_token=af8650bc565f4a29101ddaa8e12bbd62c5bf1f83&af8650bc565f4a29101ddaa8e12bbd62c5bf1f83=<API Key>',
    requestOptions
  )
    .then(async (response) => await response.json())
    .then(async (result) => {
      await sendReqSetForm(result['data']['id']);
    })
    .catch((error) => console.log('error', error));
}

export async function getPerson(data) {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };
  let person = 0;
  const dataParse = await JSON.parse(data);
  const term = `${dataParse['email'][0]['value']}`;
  await fetch(
    `https://api.pipedrive.com/v1/persons/search?api_token=af8650bc565f4a29101ddaa8e12bbd62c5bf1f83&af8650bc565f4a29101ddaa8e12bbd62c5bf1f83=<API Key>&exact_match=true&limit=1&term=${term}`,
    requestOptions
  )
    .then(async (response) => await response.json())
    .then(async (result) => {
      let personId = result.data;

      if (personId['items'].length > 0) {
        person = personId['items'][0]['item']['id'];
      } else {
        person = 0;
      }
    })
    .catch((error) => {
      console.log('error', error);
      person = 0;
    });
  return person;
}
