import React from 'react';
import './Intro.css';

function Intro({ nextPage }) {
  return (
    <div className="Survey-intro">
      <div className="Survey-intro-header">오디가지</div>
      <button className="Survey-intro-button" onClick={nextPage}>
        시작하기
      </button>
    </div>
  );
}

export default Intro;
