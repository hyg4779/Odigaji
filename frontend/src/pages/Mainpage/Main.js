import React from 'react';
import Intro from '../../components/Mainpage/Intro';
import Popular from '../../components/Mainpage/Popular';
import './Main.css';

function Main() {
  // 아래 두 개의 데이터는 나중에 DB에서 받아오게 수정해야 함
  // 지역의 이름과 해당 지역의 사진을 같이 받아와야 함
  const randomData = ['대전'];
  const popularData = ['이천', '여주', '대전', '제주', '서귀포', '부산'];

  return (
    <div className="Main">
      <Intro randomData={randomData} />
      <Popular popularData={popularData} />
    </div>
  );
}

export default Main;
