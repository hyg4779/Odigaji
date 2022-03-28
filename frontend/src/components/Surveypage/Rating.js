import React from 'react';
import './Rating.css';

function Rating({ tour, tours, setTours }) {
  const stars = [1, 2, 3, 4, 5];

  function chooseStar(idx) {
    console.log('별 클릭');
    const tempTours = [...tours];
    const findIdx = tours.findIndex(
      (ele) => ele.name === tour.name && ele.province === tour.province
    );
    tempTours[findIdx] = { ...tempTours[findIdx], rate: idx };
    setTours(tempTours);
  }

  function isFill(idx) {
    if (idx <= tour.rate) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="Rating">
      {stars.map((idx) => {
        return (
          <div key={idx} onClick={() => chooseStar(idx)}>
            {isFill(idx) ? <>★</> : <>☆</>}
          </div>
        );
      })}
    </div>
  );
}

export default Rating;
