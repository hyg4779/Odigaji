import React from 'react';
import PopularItem from './PopularItem';
import './Popular.css';

function Popular({ popularData }) {
  return (
    <div className="Popular">
      <div>인기있는 여행지</div>
      {popularData.map((data, idx) => {
        return <PopularItem key={idx} data={data} />;
      })}
    </div>
  );
}
export default Popular;
