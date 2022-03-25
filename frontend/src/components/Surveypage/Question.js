import React, { useEffect, useState } from 'react';
import './Question.css';

function Question({
  pageIndex,
  surveys,
  nextPage,
  beforePage,
  startPage,
  changeSurveys,
}) {
  const [selectName, setSelectName] = useState();
  const surveyData = [
    [
      { name: '봄', img: 'logo192.png' },
      { name: '여름', img: 'logo192.png' },
      { name: '가을', img: 'logo192.png' },
      { name: '겨울', img: 'logo192.png' },
    ],
    [
      { name: '산', img: 'logo192.png' },
      { name: '바다', img: 'logo192.png' },
    ],
    [
      { name: '도시', img: 'logo192.png' },
      { name: '시골', img: 'logo192.png' },
    ],
    [
      { name: '혼자', img: 'logo192.png' },
      { name: '친구', img: 'logo192.png' },
      { name: '연인', img: 'logo192.png' },
      { name: '가족', img: 'logo192.png' },
    ],
    [
      { name: '풍경', img: 'logo192.png' },
      { name: '음식', img: 'logo192.png' },
      { name: '액티비티', img: 'logo192.png' },
      { name: '힐링', img: 'logo192.png' },
    ],
    [
      { name: '별이 빛나는 밤', img: 'logo192.png' },
      { name: '그랑드자트섬의 일요일 오후', img: 'logo192.png' },
      { name: '메모리 지속성의 붕괴', img: 'logo192.png' },
      { name: '민중을 이끄는 자유의 여신', img: 'logo192.png' },
    ],
    [
      { name: '기생충', img: 'logo192.png' },
      { name: '토이스토리', img: 'logo192.png' },
      { name: '인터스텔라', img: 'logo192.png' },
      { name: '건축학개론', img: 'logo192.png' },
      { name: '분노의 질주', img: 'logo192.png' },
      { name: '극한직업', img: 'logo192.png' },
    ],
    [
      { name: '자가용', img: 'logo192.png' },
      { name: '대중교통', img: 'logo192.png' },
      { name: '도보', img: 'logo192.png' },
    ],
    [
      { name: '즉흥', img: 'logo192.png' },
      { name: '계획', img: 'logo192.png' },
    ],
    [
      { name: '아침형 인간', img: 'logo192.png' },
      { name: '저녁형 인간', img: 'logo192.png' },
    ],
  ];

  useEffect(() => {
    // 하나의 컴포넌트를 이용해서 10개의 설문을 진행하기 때문에
    // pageIndex 가 변경될 때마다 imageNumber를 초기화하지 않으면 다음 설문에 영향을 주게 된다
    const temp = surveys.find((image) => image.id === pageIndex);
    if (temp === undefined) {
      setSelectName();
    } else {
      setSelectName(temp.imageName);
    }
  }, [surveys, pageIndex]);

  return (
    <div className="Question">
      <div>{pageIndex + 1}번째 질문입니다</div>
      <div className="Question-img-list">
        {surveyData[pageIndex].map((data, idx) => {
          return (
            <img
              className={
                selectName === data.name
                  ? 'Question-selected-img'
                  : 'Question-img'
              }
              onClick={() => changeSurveys(pageIndex, data.name)}
              // onClick={selectImage(idx)} 를 했을 때는 무한 루프에 빠진다
              // 위의 경우에는 함수를 호출하는 동작이 되어버리므로 호출 => 동작하여 state 변경 => 렌더링 후 또 호출 => 동작하여 state 변경 ...
              key={idx}
              alt={data.name}
              // src={process.env.PUBLIC_URL + data.img}
            />
          );
        })}
      </div>
      <div>
        <button onClick={beforePage}>이전</button>
        <button onClick={selectName ? nextPage : null}>다음</button>
      </div>
      <button onClick={startPage}>처음으로</button>
    </div>
  );
}

export default Question;
