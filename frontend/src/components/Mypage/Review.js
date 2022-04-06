import axios from 'axios';
import React, { useState } from 'react';
import server from '../../API/server';
import { Link } from 'react-router-dom';

function Review({ reviewData, CityData }) {
  console.log(reviewData);
  return (
    <div className="ReviewListContainer">
      <div className="Reviewtitle">관광지 리뷰 목록</div>
      <div className="ReviewWrap">
        <div className="ListTitle">
          <div className="headRegion">지역</div>
          <div className="headtitle">제목</div>
          <div className="headtime">작성일자</div>
        </div>
        {reviewData.map((data, key) => {
          console.log(data);
          return (
            <Link
              to={{ pathname: `/local/travelDetail/board/post/${data.id}` }}
            >
              <div key={key} className="item">
                <div className="region">{data.city.name}</div>
                <div className="textTitle">{data.title}</div>
                <div className="time">{data.updated}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
export default Review;
