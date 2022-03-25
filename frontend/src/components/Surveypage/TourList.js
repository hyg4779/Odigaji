import React, { useState } from 'react';
import './TourList.css';
import Search from './Search';
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
  const [inputWord, setInputWord] = useState('');
  const [selected, setSelected] = useState([]);
  const [words, setWords] = useState([]);
  const [tourList, setTourList] = useState(tourData);

  function matchData(event) {
    const inputData = event.target.value;
    const inputLength = event.target.value.length;

    setInputWord(inputData);
    if (inputLength === 0) {
      // 아무것도 입력하지 않은 상태에서는 빈 배열로 바꿔준다
      setWords([]);
    } else {
      // 사용자가 입력한 단어로 시작하는 지역을 가진 배열로 바꿔준다
      const wordDatas = tourList.filter(
        (target) => target.substring(0, inputLength) === inputData
      );
      setWords(wordDatas);
    }
  }

  function enterKey() {
    if (window.event.keyCode === 13) {
      if (!tourData.includes(inputWord)) {
        alert('저희 서비스에는 해당 지역이 없습니다');
      } else if (selected.includes(inputWord)) {
        alert('이미 한 번 선택하신 지역입니다.');
      } else {
        setSelected(selected.concat(inputWord));
        setWords([]);
        setInputWord('');
        setTourList(tourList.filter((data) => data !== inputWord));
      }
    }
  }

  function addKey() {
    if (inputWord.length >= 1) {
      setSelected(selected.concat(inputWord));
      setWords([]);
      setInputWord('');
      setTourList(tourList.filter((data) => data !== inputWord));
    }
  }

  function selectOption(event) {
    setInputWord(event.target.value);
  }

  return (
    <div className="Tourlist">
      <div className="Tourlist-input">
        <input
          type="search"
          value={inputWord}
          onChange={matchData}
          onKeyUp={enterKey}
          style={{ width: '100px' }}
        />
        {words.length > 0 && (
          <Search
            words={words}
            setInputWord={setInputWord}
            setWords={setWords}
          />
        )}
        <button onClick={addKey}>추가하기</button>
      </div>
      <select onChange={selectOption}>
        <option value="">지역을 선택하세요</option>
        {tourList.map((data, idx) => {
          return <option key={idx}>{data}</option>;
        })}
      </select>
      <Selected selected={selected} />
    </div>
  );
}

export default TourList;
