import React, { useState } from 'react';
import './Rating.css';

function Rating() {
  const stars = [1, 2, 3, 4, 5];
  const [realIdx, setRealIdx] = useState(1);
  const [tempIdx, setTempIdx] = useState(0);

  function overStar(idx) {
    setTempIdx(idx);
    console.log(tempIdx);
  }

  function outStar() {
    setTempIdx(0);
  }

  function chooseStar(idx) {
    console.log('별 클릭');
    setRealIdx(idx);
  }

  function isFill(idx) {
    if (idx <= realIdx) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="Rating">
      <div>평점</div>
      <div className="Rating-star">
        {stars.map((idx) => {
          return (
            <div
              key={idx}
              onMouseOver={() => overStar(idx)}
              onMouseOut={() => outStar()}
              onClick={() => chooseStar(idx)}
            >
              {isFill(idx) ? <div>★</div> : <div>☆</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Rating;
