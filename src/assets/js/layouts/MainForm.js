import dropsContainerTemplate from 'src/templates/layouts/forms/mainForm/dropsContainer.ejs';
import standartFormTemplate from 'src/templates/layouts/forms/mainForm/standartForm.ejs';
import formTemplate from 'src/templates/layouts/forms/mainForm/form.ejs';
// import sectionTemplate from 'src/templates/layouts/sections/specialOfferMain/specialOfferMain.ejs';
import passengerFieldTemplate from 'src/templates/layouts/forms/mainForm/passengerField.ejs';
import inputTypeTemplate from 'src/templates/layouts/forms/mainForm/typeBlock.ejs';
import { baseUrl } from 'src/assets/js/helpers/constants';
import { inputTel } from '../services/legacy/phones';


export const MainForm = ({ passengersData, formType }) => {
  const dropsContainer = dropsContainerTemplate({
    passengers: passengersData.map((passenger) => passengerFieldTemplate({ ...passenger, baseUrl })).join('\n'),
  });

  // Additional logic for form initialization based on formType
  if (formType === 2) {
    inputTel('.form-valid-tab');
  }

  // sectionTemplate({
  //   env: {
  //     content:
  //   },
  // });
  
  return formTemplate({
    constants: {
      baseUrl,
      formName: 'searchflights',
    },
    dropsContainer,
    standartForm: standartFormTemplate({
      formType,
      dropsContainer,
    }),
    inputRoundTrip: inputTypeTemplate({
      id: 'fly-trip-radio-1',
      name: 'fly-trip-type',
      value: 'Round-trip',
      icon: 'icon-round-trip',
    }),
    inputOneWay: inputTypeTemplate({
      id: 'fly-trip-radio-2',
      name: 'fly-trip-type',
      value: 'One-way',
      icon: 'icon-direct-flight',
    }),
    inputMultiCity: inputTypeTemplate({
      id: 'fly-trip-radio-3',
      name: 'fly-trip-type',
      value: 'Multi-city',
      icon: 'icon-airplane-2',
    }),
  });
};
