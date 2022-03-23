import React from 'react';
import './Random.css';
import Roulette from '../../components/Randompage/Roulette';

function Random() {
  return (
    <div className="Random">
      <div className="Random-header">지금 당장 떠나보세요</div>
      <Roulette />
      <button>시작하기</button>
    </div>
  );
}

export default Random;
