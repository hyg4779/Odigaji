import React from 'react';
import './PopularItem.css';
import server from '../../API/server';

function PopularItem({ data }) {
  return (
    <img
      className="PopularItem"
      alt={data.name}
      src={server.BASE_URL + data.photo}
      loading="lazy"
    />
  );
}

export default PopularItem;
