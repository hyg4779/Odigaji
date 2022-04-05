import React from 'react';
import './SearchContent.css';

function SearchContent({ cityId, cityMap, cityData, backWhole }) {
  const provinceData = [
    { id: 1, name: '강원도' },
    { id: 2, name: '경기도' },
    { id: 3, name: '경상남도' },
    { id: 4, name: '경상북도' },
    { id: 5, name: '전라남도' },
    { id: 6, name: '전라북도' },
    { id: 7, name: '충청남도' },
    { id: 8, name: '충청북도' },
    { id: 100, name: '자치시도' },
  ];

  function changeDo(event) {
    if (Number(event.target.value) === 0) {
      backWhole();
    } else {
      cityMap(Number(event.target.value));
    }
  }

  function changeSi(event) {
    console.log(event.target.value);
  }

  return (
    <div className="SearchContent">
      <div className="SearchContent-header">
        <div>지도에서 가보고 싶은</div>
        <div>여행지를 클릭해주세요</div>
      </div>
      <div className="SearchContent-content">
        <div>지도에서 찾기 힘드신가요?</div>
        <div>여행지를 검색한 뒤</div>
        <div>해당 지역을 클릭해보세요</div>
      </div>
      <div>
        <select
          className="SearchContent-Do"
          id="Do-select"
          value={cityId === -1 ? 0 : cityId}
          onChange={(event) => changeDo(event)}
        >
          <option value={0}>지역을 선택하세요</option>;
          {provinceData.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.name}
              </option>
            );
          })}
        </select>
        <select id="Si-select" onChange={(event) => changeSi(event)}>
          <option value={0}>지역을 선택하세요</option>
          {cityData.length >= 1 &&
            cityData.map((data) => {
              return (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
}

export default SearchContent;
