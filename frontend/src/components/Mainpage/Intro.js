import React from 'react';
import './Intro.css';

function Intro({ randomData }) {
  return (
    <div className="Intro">
      <div className="Intro-text">
        <div className="Intro-text-header">
          <div>오디가지와 함께</div>
          <div>나와 맞는 여행지를</div>
          <div>찾아보세요</div>
        </div>
        <div className="Intro-text-content">
          <div>나와 취향이 비슷한 사람들이 많이 갔던 여행지를 추천해드려요</div>
          <div>해당 여행지의 인기명소를 추천해드려요</div>
          <div>실제로 다녀온 사람들의 관광지 리뷰도 공유해요</div>
        </div>
        <button className="Intro-button">추천받기</button>
      </div>
      <div className="Intro-image">{randomData}</div>
    </div>
  );
}

export default Intro;
