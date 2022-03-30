import React, { useEffect, useState } from 'react';
import './Survey.css';
import Intro from '../../components/Surveypage/Intro';
import Question from '../../components/Surveypage/Question';
import TourList from '../../components/Surveypage/TourList';
import { AllCitiesList } from '../../components/Surveypage/SurveyAxios';

function Survey() {
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
  const questionList = [
    '가장 좋아하는 계절',
    '산과 바다 중에 더 좋아하는 장소',
    '도시와 시골 중 더 좋은 곳',
    '여행갈 때 같이갈 사람',
    '여행지를 선정할 때 가장 중요한 것',
    '가장 마음에 드는 그림',
    '가장 마음에 드는 영화',
    '여행지에서 사용하는 교통수단',
    '여행을 준비할 때',
    '일상 스타일',
  ];
  const [tourData, setTourData] = useState([]);
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
    AllCitiesList()
      .then((response) => {
        console.log('여행지 전체 목록 가져오기 성공', response.data);
        setTourData(response.data);
      })
      .catch((error) => {
        console.log('여행지 전체 목록 가져오기 실패', error);
      });
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
          <div
            className="Survey-progress-bg"
            style={{ width: `${String(pageIndex * 7.7)}vw` }}
          ></div>
        </>
      )}
      {pageIndex === -1 && <Intro nextPage={nextPage} />}
      {pageIndex >= 0 && pageIndex <= 9 && (
        <Question
          surveyData={surveyData}
          questionList={questionList}
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
        />
      )}
    </div>
  );
}

export default Survey;
