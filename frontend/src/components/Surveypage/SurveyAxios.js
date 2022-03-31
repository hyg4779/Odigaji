import axios from 'axios';
import server from '../../API/server';

const allCitiesUrl = server.BASE_URL + server.ROUTES.allCities;
const selCityUrl = server.BASE_URL + server.ROUTES.selCity;
const userData = sessionStorage.getItem('jwt');

function AllCitiesList() {
  return axios.get(allCitiesUrl);
}

function AddSelCity(data) {
  const cityData = {
    city: data.id,
    rate: data.rate,
  };
  return axios.post(selCityUrl, cityData, {
    headers: {
      Authorization: `Bearer ${userData}`,
    },
  });
}

export { AllCitiesList, AddSelCity };
