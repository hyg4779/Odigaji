import axios from 'axios';
import React, { useState } from 'react';
import server from '../../API/server';

function Review({ reviewData, CityData }) {
  console.log(reviewData);

  return (
    <div className="ReviewListContainer">
      <div className="Reviewtitle">작성한 관광지 리뷰</div>
      <div className="ListTitle">
        <div className="headRegion">지역</div>
        <div className="headtitle">작성한 리뷰 제목</div>
        <div className="headtime">작성일자</div>
      </div>
      {reviewData.map((data, key) => {
        console.log(data);
        return (
          <div key={key} className="item">
            <div className="region">{data.city}</div>
            <div className="textTitle">{data.title}</div>
            <div className="time">{data.updated}</div>
          </div>
        );
      })}
    </div>
  );
}
export default Review;
