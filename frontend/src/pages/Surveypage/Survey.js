import React, { useEffect, useState } from 'react';
import './Survey.css';
import Intro from '../../components/Surveypage/Intro';
import Question from '../../components/Surveypage/Question';
import TourList from '../../components/Surveypage/TourList';

function Survey() {
  const provinceData = {
    1: '강원도',
    2: '경기도',
    3: '경상남도',
    4: '경상북도',
    5: '전라남도',
    6: '전라북도',
    7: '충청남도',
    8: '충청북도',
    100: '자치시도',
  };
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
  const tourData = [
    { id: 1, name: '이천', province: 2 },
    { id: 2, name: '인천', province: 100 },
    { id: 3, name: '광주', province: 2 },
    { id: 4, name: '강릉', province: 1 },
    { id: 5, name: '대전', province: 100 },
    { id: 6, name: '대구', province: 100 },
    { id: 7, name: '부산', province: 100 },
    { id: 8, name: '양양', province: 1 },
    { id: 9, name: '양구', province: 1 },
    { id: 10, name: '구미', province: 4 },
    { id: 11, name: '광주', province: 100 },
  ];

  const [pageIndex, setPageIndex] = useState(-1);
  const [tastes, setTastes] = useState([]);
  const [tours, setTours] = useState([]);

  let leftLoc = String(15 + pageIndex * 7.5) + 'vw';

  function nextPage() {
    setPageIndex(pageIndex + 1);
  }

  function beforePage() {
    setPageIndex(pageIndex - 1);
  }

  function startPage() {
    setPageIndex(-1);
    setTastes([]);
  }

  function tasteSurveys(pageIndex, imageName) {
    // 취향 질문의 답변을 배열 형태로 저장하는 함수
    const newTaste = {
      id: pageIndex,
      imageName: imageName,
    };
    if (pageIndex + 1 <= tastes.length) {
      // 이미 한 번 선택했던 페이지로 돌아온 경우
      console.log('기존 설문 수정');
      const beforeTastes = tastes.filter((taste) => taste.id !== pageIndex);
      setTastes(beforeTastes.concat(newTaste));
    } else {
      console.log('새로운 설문 추가');
      setTastes(tastes.concat(newTaste));
    }
  }

  useEffect(() => {
    setPageIndex(-1);
    setTastes([]);
    setTours([]);
  }, []);

  return (
    <div className="Survey">
      {pageIndex !== -1 && (
        <div>
          <div className="Survey-bar" />
          <div
            className="Survey-progress"
            style={{ position: 'absolute', left: leftLoc }}
          />
        </div>
      )}
      {pageIndex === -1 && <Intro nextPage={nextPage} />}
      {pageIndex >= 0 && pageIndex <= 9 && (
        <Question
          surveyData={surveyData}
          pageIndex={pageIndex}
          tastes={tastes}
          nextPage={nextPage}
          beforePage={beforePage}
          startPage={startPage}
          tasteSurveys={tasteSurveys}
        />
      )}
      {pageIndex >= 10 && (
        <TourList
          tourData={tourData}
          tours={tours}
          setTours={setTours}
          provinceData={provinceData}
        />
      )}
    </div>
  );
}

export default Survey;
