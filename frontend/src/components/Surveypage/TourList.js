import React, { useState } from 'react';
import './TourList.css';
import Selected from './Selected';

function TourList() {
  const tourData = [
    '이천',
    '인천',
    '여주',
    '강릉',
    '대전',
    '대구',
    '부산',
    '부천',
    '양양',
    '양구',
    '구미',
  ];
  const [selected, setSelected] = useState([]);

  function addTour(event) {
    event.preventDefault();
    const inputWord = event.target[0].value;
    if (inputWord.length === 0) return;
    if (!tourData.includes(inputWord)) {
      alert('저희 서비스에는 해당 지역이 없습니다');
    } else if (selected.includes(inputWord)) {
      alert('이미 한 번 선택하신 지역입니다.');
    } else {
      setSelected(selected.concat(inputWord));
      event.target[0].value = '';
    }
  }

  function makeList() {
    return tourData.map((data, idx) => {
      return (
        <option key={idx} disabled={selected.includes(data)}>
          {data}
        </option>
      );
    });
  }

  return (
    <div className="Tourlist">
      <form onSubmit={(event) => addTour(event)}>
        <input list="tourInput" style={{ width: '100px' }} />
        <datalist id="tourInput">{makeList()}</datalist>
        <button>추가하기</button>
      </form>
      <Selected selected={selected} />
    </div>
  );
}

export default TourList;
