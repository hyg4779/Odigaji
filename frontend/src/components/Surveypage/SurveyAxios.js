import axios from 'axios';
import server from '../../API/server';

const allCitiesUrl = server.BASE_URL + server.ROUTES.allCities;

function AllCitiesList() {
  return axios.get(allCitiesUrl);
}

export { AllCitiesList };
