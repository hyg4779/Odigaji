import { Row, Table, Col, Button, Pagination, PageItem } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../API/server';
import './Board.css';
function Board() {
  let navigate = useNavigate();
  let params = useParams();
  let active = 2;
  let items = [];

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
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }
  const paginationBasic = (
    <div>
      <Pagination>{items}</Pagination>
    </div>
  );
  console.log(reviewdata);
  useEffect(() => {
    getLoadReviews(params.cityId);
  }, []);
  return (
    <div className="Board">
      <div className="BoardWrap">
        <div className="BoardContainer">
          <Row>
            <Col md={12}>
              <h3>관광지 리뷰 </h3>
            </Col>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>제목</th>
                  <th>작성일</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {reviewdata.map((data) => {
                  return (
                    <tr key={data.id}>
                      <td>{data.id}</td>
                      <td className="left">{data.title}</td>
                      <td>{data.updated}</td>
                      <td>{data.city}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            {paginationBasic}
          </Row>
        </div>

        <Row className="align-self-end ">
          <Col className=" m-5 text-lg-end" onClick={writeReview}>
            <Button variant="secondary">글쓰기</Button>{' '}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Board;
