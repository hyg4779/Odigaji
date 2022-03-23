import React from 'react';
import './Question.css';

function Question({ pageIndex, nextPage, beforePage, startPage }) {
  const surveyData = [
    [
      { name: '봄', img: 'logo192.png' },
      { name: '여름', img: 'logo192.png' },
      { name: '가을', img: 'logo192.png' },
      { name: '겨울', img: 'logo192.png' },
    ],
    [
      { name: '산', img: '/img/수원시.jpg' },
      { name: '바다', img: '/img/수원시.jpg' },
    ],
  ];

  return (
    <div className="Question">
      <div>{pageIndex + 1}번째 질문입니다</div>
      <div>
        {surveyData[pageIndex % 2 ? 1 : 0].map((data, idx) => {
          return (
            <img
              key={idx}
              alt="설문용 사진입니다"
              src={process.env.PUBLIC_URL + data.img}
            />
          );
        })}
      </div>
      <div>
        <button onClick={beforePage}>이전</button>
        {pageIndex < 9 ? (
          <button onClick={nextPage}>다음</button>
        ) : (
          <button>결과</button>
        )}
      </div>
      <button onClick={startPage}>처음으로</button>
    </div>
  );
}

export default Question;
