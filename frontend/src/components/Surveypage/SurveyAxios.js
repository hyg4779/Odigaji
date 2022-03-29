import axios from 'axios';
import server from '../../API/server';

const allTourUrl = server.BASE_URL + server.ROUTES.allTour;

function AllTourList() {
  return axios.get(allTourUrl);
}

export { AllTourList };
