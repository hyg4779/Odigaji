import React from 'react';
import './PopularItem.css';

function PopularItem({ data }) {
  return (
    <div className="PopularItem">
      <div className="PopularItem-image"></div>
      <div className="PopularItem-text">{data}</div>
    </div>
  );
}

export default PopularItem;
