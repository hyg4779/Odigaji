import React from 'react';
import './TourList.css';
import Rating from './Rating';

function TourList({ tourData, tours, setTours, provinceData }) {
  function isVisit(name, province) {
    // 이미 방문했다고 추가한 지역인지 판단하는 함수
    return tours.find(
      (tour) => tour.name === name && tour.province === province
    );
  }

  function isInTourData(name, province) {
    // 지역 데이터로 가지고 있는 지역인지 판단하는 함수
    return tourData.find(
      (tour) => tour.name === name && tour.province === province
    );
  }

  function provinceKey(province) {
    // 행정구역 기준을 숫자로 바꿔주는 함수
    return Number(
      Object.keys(provinceData).find((key) => provinceData[key] === province)
    );
  }

  function addTour(event) {
    event.preventDefault();
    const inputWords = event.target[0].value.split(' - ');
    const inputName = inputWords[0];
    const inputProvince = provinceKey(inputWords[1]);
    const newTour = {
      name: inputName,
      province: inputProvince,
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
        !(tour.name === target.name && tour.province === target.province)
    );
    setTours(newTours);
  }

  function makeList() {
    return tourData.map((data) => {
      return (
        <option
          key={data.id}
          id={data.id}
          disabled={isVisit(data.name, data.province)}
        >
          {data.name} - {provinceData[data.province]}
        </option>
      );
    });
  }

  return (
    <div className="Tourlist">
      <div>다녀온 지역과 평점을 자유롭게 등록해주세요</div>
      <form onSubmit={(event) => addTour(event)}>
        <input list="tourInput" className="Tourlist-input" />
        <datalist id="tourInput">{makeList()}</datalist>
        <button>추가하기</button>
      </form>
      <div>
        {tours.map((tour, idx) => {
          return (
            <div className="Tourlist-item" key={idx}>
              <div>
                {tour.name} - {provinceData[tour.province]}
              </div>
              <Rating tour={tour} tours={tours} setTours={setTours} />
              <button onClick={() => deleteTour(tour)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TourList;
