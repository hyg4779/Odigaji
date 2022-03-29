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
      { id: 1, name: '봄', img: 'img/spring.jpg' },
      { id: 2, name: '여름', img: 'img/summer.jpg' },
      { id: 3, name: '가을', img: 'img/autumn.jpg' },
      { id: 4, name: '겨울', img: 'img/winter.jpg' },
    ],
    [
      { id: 5, name: '산', img: 'img/mountain.jpg' },
      { id: 6, name: '바다', img: 'img/sea.jpg' },
    ],
    [
      { id: 7, name: '도시', img: 'img/city.jpg' },
      { id: 8, name: '시골', img: 'img/country.jpg' },
    ],
    [
      { id: 9, name: '혼자', img: 'img/alone.jpg' },
      { id: 10, name: '친구', img: 'img/friends.jpg' },
      { id: 11, name: '연인', img: 'img/couple.jpg' },
      { id: 12, name: '가족', img: 'img/family.jpg' },
    ],
    [
      { id: 13, name: '풍경', img: 'img/nature.jpg' },
      { id: 14, name: '음식', img: 'img/food.jpg' },
      { id: 15, name: '액티비티', img: 'img/activity.jpg' },
      { id: 16, name: '힐링', img: 'img/relax.jpg' },
    ],
    [
      { id: 17, name: '별이 빛나는 밤', img: 'img/starrynight.jpg' },
      { id: 18, name: '그랑드자트섬의 일요일 오후', img: 'img/grande.jpg' },
      { id: 19, name: '메모리 지속성의 붕괴', img: 'img/memory.jpg' },
      { id: 20, name: '민중을 이끄는 자유의 여신', img: 'img/liberty.jpg' },
    ],
    [
      { id: 21, name: '기생충', img: 'img/parasite.jpg' },
      { id: 22, name: '토이스토리', img: 'img/toystory.jpg' },
      { id: 23, name: '인터스텔라', img: 'img/interstellar.jpg' },
      { id: 24, name: '건축학개론', img: 'img/건축학개론.jpg' },
      { id: 25, name: '분노의 질주', img: 'img/분노의질주.jpg' },
      { id: 26, name: '극한직업', img: 'img/극한직업.jpg' },
    ],
    [
      { id: 27, name: '자가용', img: 'img/car.jpg' },
      { id: 28, name: '대중교통', img: 'img/bus.jpg' },
      { id: 29, name: '도보', img: 'img/walking.jpg' },
    ],
    [
      { id: 30, name: '계획', img: 'img/plan.jpg' },
      { id: 31, name: '즉흥', img: 'img/생각없음.jpg' },
    ],
    [
      { id: 32, name: '아침형 인간', img: 'img/early.jpg' },
      { id: 33, name: '저녁형 인간', img: 'img/night.jpg' },
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

  let leftLoc = String(13 + pageIndex * 7.7) + 'vw';
  // survey-bar 의 left 값이 15vw 로 되어 있다
  // 10개의 취향 설문 + 1개의 지역 설문이 진행되니까
  // 11번째 페이지에서 진행도가 맨 끝으로 가 있어야 한다

  function nextPage() {
    setPageIndex(pageIndex + 1);
  }

  function beforePage() {
    if (pageIndex >= 1) {
      setPageIndex(pageIndex - 1);
    }
  }

  function startPage() {
    setPageIndex(0);
  }

  function tasteSurveys(pageIndex, imageId, imageName) {
    // 취향 질문의 답변을 배열 형태로 저장하는 함수
    const newTaste = {
      id: imageId,
      name: imageName,
    };
    if (pageIndex < tastes.length) {
      // 한 번 진행한 취향을 바꾸는 경우
      const tempTastes = [...tastes];
      tempTastes[pageIndex] = newTaste;
      setTastes(tempTastes);
    } else {
      // 새로운 취향 설문을 진행한 경우
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
      {pageIndex >= 0 && (
        <>
          <div className="Survey-bar" />
          <img
            className="Survey-progress"
            style={{ position: 'absolute', left: leftLoc }}
            alt="오디가지"
            src={process.env.PUBLIC_URL + 'img/오디가지.png'}
          />
        </>
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
          pageIndex={pageIndex}
          tourData={tourData}
          tours={tours}
          beforePage={beforePage}
          startPage={startPage}
          setTours={setTours}
          provinceData={provinceData}
        />
      )}
    </div>
  );
}

export default Survey;
