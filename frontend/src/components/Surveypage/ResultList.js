import React from 'react';
import { Carousel } from 'react-bootstrap';
import DetailMap from './DetailMap';
import server from '../../API/server';
import './ResultList.css';

function ResultList({ surveyResult }) {
  return (
    <div className="ResultList">
      <DetailMap />
      <Carousel interval={null}>
        {/* interval : 자동으로 넘어가는 시간간격(null은 비활성화) */}
        {surveyResult.map((item) => {
          return (
            <Carousel.Item key={item.id}>
              <img
                className="ResultList-img"
                alt={item.name}
                src={server.BASE_URL + item.photo}
              />
              <Carousel.Caption>
                <div>
                  {item.province_data.name} {item.name}
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ResultList;
