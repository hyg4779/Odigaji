import { Row, Table, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../API/server';
import './Board.css';
function Board() {
  let navigate = useNavigate();
  let params = useParams();
  const [reviewdata, setReviewdata] = useState([]);

  const writeReview = () => {
    navigate('/local/travelDetail/board/write');
  };
  const getLoadReviews = async (cityId) => {
    await axios
      .get(server.BASE_URL + server.ROUTES.review + cityId + '/')
      .then((response) => {
        console.log(response);
        setReviewdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(reviewdata);
  useEffect(() => {
    getLoadReviews(params.cityId);
  }, []);
  return (
    <div className="BoardWrap">
      <ul>
        <li>관광지 리뷰 </li>

        <li>
          Table
          <ul id="ulTable">
            <li>
              <ul>
                <li>No</li>
                <li>제목</li>
                <li>작성일</li>
                <li>작성자</li>
                <li>조회수</li>
              </ul>
            </li>
            <div>
              {reviewdata.map((data) => {
                return (
                  <li key={data.id}>
                    <ul key={data.id}>
                      <li>{data.id}</li>
                      <li className="left">{data.title}</li>
                      <li>{data.updated}</li>
                      <li>{data.city}</li>
                    </ul>
                  </li>
                );
              })}
            </div>
          </ul>
        </li>

        <li>
          <div id="divPaging">
            <div>◀</div>
            <div>
              <b>1</b>
            </div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>▶</div>
          </div>
        </li>

        {/* <li id="liSearchOption">
          <div>
            <select id="selSearchOption">
              <option value="A">제목+내용</option>
              <option value="T">제목</option>
              <option value="C">내용</option>
            </select>
            <input id="txtKeyWord" />
            <input type="button" value="검색" />
          </div>
        </li> */}
      </ul>

      <Row className="align-self-end ">
        <Col className=" m-5 text-lg-end" onClick={writeReview}>
          <Button variant="secondary">글쓰기</Button>{' '}
        </Col>
      </Row>
    </div>
  );
}

export default Board;
