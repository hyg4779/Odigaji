import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css';
import server from '../../API/server';

function Intro({ randomData, moveCity }) {
  console.log('인트로 컴포넌트 렌더');
  return (
    <div className="Intro">
      <div className="Intro-bg-item"></div>
      <div className="Intro-text">
        <div className="Intro-text-header">
          <div>오디가지와 함께</div>
          <div>나와 맞는 여행지를</div>
          <div>찾아보세요</div>
        </div>
        <div className="Intro-text-content">
          <div>나와 취향이 비슷한 사람들이</div>
          <div>많이 갔던 여행지를 추천해요</div>
          <div>여행지의 인기명소를 추천해요</div>
          <div>생생한 관광지 리뷰도 공유해요</div>
        </div>
        {/* <button className="Intro-button">추천받기</button> */}
        <Link className="Intro-button" to="/survey">
          추천받기
        </Link>
      </div>
      <img
        className="Intro-image"
        alt="대표이미지"
        src={server.BASE_URL + randomData.background_photo}
        onClick={() => moveCity(randomData.id)}
        loading="lazy"
      />
    </div>
  );
}

export default Intro;
