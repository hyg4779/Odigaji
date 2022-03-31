import React from 'react';
import './Rating.css';
import { AddSelCity } from './SurveyAxios';

function Rating({ tour, tours, setTours }) {
  const stars = [1, 2, 3, 4, 5];

  function chooseStar(idx) {
    const tempTours = [...tours];
    const findIdx = tours.findIndex(
      (ele) => ele.name === tour.name && ele.province === tour.province
    );
    tempTours[findIdx] = { ...tempTours[findIdx], rate: idx };
    setTours(tempTours);
    AddSelCity(tempTours[findIdx])
      .then((response) => {
        console.log('지역 데이터 전송', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
