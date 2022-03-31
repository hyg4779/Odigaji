import React from 'react';
import './TourList.css';
import Rating from './Rating';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from 'react-icons/fa';

function TourList({
  tourData,
  tours,
  beforePage,
  startPage,
  lastPage,
  setTours,
}) {
  function isVisit(name, provinceName) {
    // 이미 방문했다고 추가한 지역인지 판단하는 함수
    return tours.find(
      (tour) => tour.name === name && tour.provinceName === provinceName
    );
  }

  function isInTourData(name, provinceName) {
    // 지역 데이터로 가지고 있는 지역인지 판단하는 함수
    return tourData.find(
      (tour) => tour.name === name && tour.province_data.name === provinceName
    );
  }

  function addTour(event) {
    event.preventDefault();
    const inputWords = event.target[0].value.split('(');
    const inputName = inputWords[0];
    const inputProvince = String(inputWords[1]).slice(0, -1);
    const newTour = {
      name: inputName,
      provinceName: inputProvince,
      rate: 1,
    };

    if (isInTourData(inputName, inputProvince) === undefined) {
      // 지역 데이터에 없는 입력값을 사용한 경우
      alert('서비스에 정보가 없거나 입력 양식이 잘못되었습니다');
    } else {
      setTours(tours.concat(newTour));
      event.target[0].value = '';
    }
  }

  function deleteTour(target) {
    const newTours = tours.filter(
      (tour) =>
        !(
          tour.name === target.name && tour.provinceName === target.provinceName
        )
    );
    setTours(newTours);
  }

  function makeList() {
    return tourData.map((data) => {
      return (
        <option
          key={data.id}
          id={data.id}
          disabled={isVisit(data.name, data.province_data.name)}
        >
          {data.name}({data.province_data.name})
        </option>
      );
    });
  }

  return (
    <div className="Tourlist">
      <div className="Tourlist-header">
        다녀온 지역을 등록하고 평점을 입력해주세요
      </div>
      <div className="Tourlist-content">
        <form onSubmit={(event) => addTour(event)}>
          <input list="tourInput" className="Tourlist-content-input" />
          <datalist id="tourInput">{makeList()}</datalist>
          <button className="Tourlist-content-button">추가하기</button>
        </form>
        <div className="Tourlist-content-items">
          {tours.map((tour, idx) => {
            return (
              <div className="Tourlist-content-item" key={idx}>
                <div>
                  {tour.name}({[tour.provinceName]})
                </div>
                <div className="Tourlist-content-item-rate">
                  <Rating tour={tour} tours={tours} setTours={setTours} />
                  <button
                    onClick={() => deleteTour(tour)}
                    className="Tourlist-content-button"
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Tourlist-button-group">
        <FaAngleDoubleLeft onClick={startPage} className="Tourlist-button" />
        <FaAngleLeft onClick={beforePage} className="Tourlist-button" />
        <FaAngleRight className="Tourlist-button" />
        <FaAngleDoubleRight onClick={lastPage} className="Tourlist-button" />
      </div>
    </div>
  );
}

export default TourList;
