import React, { useEffect, useState } from 'react';
import './Question.css';

function Question({
  pageIndex,
  nextPage,
  beforePage,
  startPage,
  changeImages,
}) {
  const [imageNumber, setImageNumber] = useState(-1);
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

  function selectImage(number) {
    setImageNumber(number);
    changeImages(pageIndex, number);
  }

  useEffect(() => {
    // 하나의 컴포넌트를 이용해서 10개의 설문을 진행하기 때문에
    // pageIndex 가 변경될 때마다 imageNumber를 초기화하지 않으면 다음 설문에 영향을 주게 된다
    setImageNumber(-1);
  }, [pageIndex]);

  return (
    <div className="Question">
      <div>{pageIndex + 1}번째 질문입니다</div>
      <div>
        {surveyData[pageIndex % 2 ? 1 : 0].map((data, idx) => {
          return (
            <img
              className={
                imageNumber === idx ? 'Question-selected-img' : 'Question-img'
              }
              onClick={() => selectImage(idx)}
              // onClick={selectImage(idx)} 를 했을 때는 무한 루프에 빠진다
              // 위의 경우에는 함수를 호출하는 동작이 되어버리므로 호출 => 동작하여 state 변경 => 렌더링 후 또 호출 => 동작하여 state 변경 ...
              key={idx}
              alt="설문용 사진입니다"
              src={process.env.PUBLIC_URL + data.img}
            />
          );
        })}
      </div>
      <div>{imageNumber + 1}번째 사진을 눌렀습니다</div>
      <div>
        <button onClick={beforePage}>이전</button>
        {pageIndex < 9 ? (
          <button onClick={imageNumber !== -1 ? nextPage : null}>다음</button>
        ) : (
          <button>결과</button>
        )}
      </div>
      <button onClick={startPage}>처음으로</button>
    </div>
  );
}

export default Question;
