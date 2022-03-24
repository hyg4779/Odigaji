import React from 'react';
import './Question.css';

function Intro({ nextPage }) {
  return (
    <div className="Question">
      <div>오디가지</div>
      <button onClick={nextPage}>시작하기</button>
    </div>
  );
}

export default Intro;
