import React from 'react';
import server from '../../API/server';
function visitedCity({ selCityData }) {
  console.log(selCityData);

  const starRating = (num) => {
    let result = [];
    for (let i = 0; i < num; i++) {
      result.push(<span className="star-ratings-fill">★</span>);
    }
    return result;
  };
  const starNoneRating = (num) => {
    let result = [];
    for (let i = num; i < 5; i++) {
      result.push(<span>★</span>);
    }
    return result;
  };
  return (
    <div className="VisitedCityContainer">
      <div className="title">다녀온 도시</div>
      <div className="status">
        {selCityData.map((data, key) => {
          return (
            <div key={key} className="item">
              <div>
                <img
                  className="number"
                  src={server.BASE_URL + data.city_data.photo}
                ></img>
                <div className="text">{data.city_data.name}</div>
                <div className="star-ratings">
                  <div className="starLine">
                    {starRating(data.rate)}
                    {starNoneRating(data.rate)}
                  </div>
                </div>
              </div>
              <div className="space"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default visitedCity;
