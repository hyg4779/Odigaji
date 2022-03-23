import React from 'react';
import server from '../../API/server';

function Roulette() {
  console.log(server.BASE_URL + server.ROUTES.login);
  return <div>돌림판</div>;
}

export default Roulette;
