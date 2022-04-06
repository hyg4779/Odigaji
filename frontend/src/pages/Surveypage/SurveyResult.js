import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Surveypage/Loading';
import ResultList from '../../components/Surveypage/ResultList';
import { AddTaste } from '../../components/Surveypage/SurveyAxios';
import './SurveyResult.css';

function SurveyResult() {
  const defaultData = [
    { id: 1, name: '강원도', count: 0, cities: [] },
    { id: 2, name: '경기도', count: 0, cities: [] },
    { id: 3, name: '경상남도', count: 0, cities: [] },
    { id: 4, name: '경상북도', count: 0, cities: [] },
    { id: 5, name: '전라남도', count: 0, cities: [] },
    { id: 6, name: '전라북도', count: 0, cities: [] },
    { id: 7, name: '충청남도', count: 0, cities: [] },
    { id: 8, name: '충청북도', count: 0, cities: [] },
    { id: 54, name: '광주광역시', count: 0, cities: [] },
    { id: 55, name: '대구광역시', count: 0, cities: [] },
    { id: 56, name: '대전광역시', count: 0, cities: [] },
    { id: 57, name: '부산광역시', count: 0, cities: [] },
    { id: 58, name: '서울특별시', count: 0, cities: [] },
    { id: 59, name: '세종특별자치시', count: 0, cities: [] },
    { id: 60, name: '울산광역시', count: 0, cities: [] },
    { id: 61, name: '인천광역시', count: 0, cities: [] },
    { id: 85, name: '제주특별자치도', count: 0, cities: [] },
  ];

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [resultData, setResultData] = useState([]);

  function devideData(inputData) {
    const tempData = [...defaultData];
    for (let index = 0; index < 17; index++) {
      const cityId = defaultData[index].id;
      if (cityId <= 8) {
        const cityData = inputData.filter((ele) => {
          return ele.province_data.id === cityId;
        });
        tempData[index].count = cityData.length;
        tempData[index].cities = cityData;
      } else {
        const cityData = inputData.filter((ele) => {
          return ele.id === cityId;
        });
        tempData[index].count = cityData.length;
        tempData[index].cities = cityData;
      }
    }
    setResultData(tempData);
  }

  useEffect(() => {
    AddTaste(location.state)
      .then((response) => {
        console.log('추천 결과 받아오기 성공', response.data);
        devideData(response.data);
      })
      .catch((error) => {
        console.log('추천 결과 받아오기 실패', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="SurveyResult">
      {loading && <Loading setLoading={setLoading} />}
      {!loading && <ResultList resultData={resultData} />}
    </div>
  );
}

export default SurveyResult;
