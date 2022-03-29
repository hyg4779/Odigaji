import React, { useEffect, useState } from 'react';
import './Question.css';

function Question({
  surveyData,
  pageIndex,
  tastes,
  nextPage,
  beforePage,
  startPage,
  tasteSurveys,
}) {
  const [selectName, setSelectName] = useState();
  const imgCnt = surveyData[pageIndex].length;

  function alertMessage() {
    alert('항목을 선택해주세요!');
  }

  useEffect(() => {
    // 하나의 컴포넌트를 이용해서 10개의 설문을 진행하기 때문에
    // pageIndex 가 변경될 때마다 imageName을 초기화하지 않으면 다음 설문에 영향을 주게 된다
    const temp = tastes[pageIndex];
    if (temp === undefined) {
      setSelectName();
    } else {
      setSelectName(temp.name);
    }
  }, [tastes, pageIndex]);

  return (
    <div className="Question">
      <div
        className={'Question-img-list'}
        style={{ columnGap: imgCnt === 4 ? '5vw' : '3vw' }}
      >
        {surveyData[pageIndex].map((data, idx) => {
          return (
            <img
              className={
                selectName === data.name
                  ? 'Question-selected-img'
                  : 'Question-img'
              }
              onClick={() => tasteSurveys(pageIndex, data.id, data.name)}
              // onClick={selectImage(idx)} 를 했을 때는 무한 루프에 빠진다
              // 위의 경우에는 함수를 호출하는 동작이 되어버리므로 호출 => 동작하여 state 변경 => 렌더링 후 또 호출 => 동작하여 state 변경 ...
              key={idx}
              alt={data.name}
              src={process.env.PUBLIC_URL + data.img}
            />
          );
        })}
      </div>
      <div className="Question-button-group">
        <button onClick={beforePage} className="Question-button">
          이전
        </button>
        <button
          onClick={selectName ? nextPage : alertMessage}
          className="Question-button"
        >
          다음
        </button>
        <button onClick={startPage} className="Question-button-reset">
          처음으로
        </button>
      </div>
    </div>
  );
}

export default Question;
