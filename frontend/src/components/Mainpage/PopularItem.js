import React from 'react';
import './PopularItem.css';
import server from '../../API/server';

function PopularItem({ data, moveCity }) {
  return (
    <img
      className="PopularItem"
      alt={data.name}
      src={server.BASE_URL + data.background_photo}
      loading="lazy"
      onClick={() => moveCity(data.id)}
    />
  );
}

export default PopularItem;
