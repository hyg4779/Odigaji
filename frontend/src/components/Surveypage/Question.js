import React, { useEffect, useState } from 'react';
import './Question.css';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

function Question({
  surveyData,
  questionList,
  pageIndex,
  tastes,
  nextPage,
  beforePage,
  startPage,
  lastPage,
  tasteSurveys,
  mouseX,
  mouseY,
  textIdx,
  textShow,
  buttonOver,
  buttonOut,
}) {
  const [selectName, setSelectName] = useState();
  const imgCnt = surveyData[pageIndex].length;
  const textList = [
    '처음으로',
    '이전으로',
    '다음으로',
    '진행한 마지막 설문으로',
  ];

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
      <div className="Question-header">{questionList[pageIndex]}</div>
      <div className={'Question-img-list'}>
        {surveyData[pageIndex].map((data) => {
          return (
            <div
              key={data.id}
              style={{
                width: imgCnt === 6 ? '33%' : '40%',
                height: imgCnt === 2 ? '60vh' : '40vh',
                position: 'relative',
              }}
            >
              <img
                className={
                  selectName === data.name
                    ? 'Question-selected-img'
                    : 'Question-img'
                }
                onClick={() =>
                  tasteSurveys(pageIndex, data.title, data.id, data.name)
                }
                // onClick={selectImage(idx)} 를 했을 때는 무한 루프에 빠진다
                // 위의 경우에는 함수를 호출하는 동작이 되어버리므로 호출 => 동작하여 state 변경 => 렌더링 후 또 호출 => 동작하여 state 변경 ...
                alt={data.name}
                src={process.env.PUBLIC_URL + data.img}
                loading="lazy"
              />
              <div className="Question-img-name">{data.name}</div>
            </div>
          );
        })}
      </div>
      {textShow && (
        <div
          className="Question-tooltip"
          style={{ top: `${mouseY}px`, left: `${mouseX}px` }}
        >
          {textList[textIdx]}
        </div>
      )}
      <div className="Question-button-group">
        <FaAngleDoubleLeft
          onClick={startPage}
          onMouseMove={(event) => buttonOver(event, 0)}
          onMouseOut={() => buttonOut()}
          className="Question-button"
        />
        <FaAngleLeft
          onClick={beforePage}
          onMouseMove={(event) => buttonOver(event, 1)}
          onMouseOut={() => buttonOut()}
          className="Question-button"
        />
        <FaAngleRight
          onClick={selectName ? nextPage : alertMessage}
          onMouseMove={(event) => buttonOver(event, 2)}
          onMouseOut={() => buttonOut()}
          className="Question-button"
        />
        <FaAngleDoubleRight
          onClick={lastPage}
          onMouseMove={(event) => buttonOver(event, 3)}
          onMouseOut={() => buttonOut()}
          className="Question-button"
        />
      </div>
    </div>
  );
}

export default Question;
