import { Row, Table, Col, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../API/server';
function Board() {
  let navigate = useNavigate();
  let params = useParams();
  let tmpdata = [
    '임진각여행기',
    '임진각여행기',
    '임진각여행기',
    '임진각여행기',
    '임진각여행기',
    '임진각여행기',
  ];
  const writeReview = () => {
    navigate('/local/travelDetail/board/write');
  };
  const getLoadReviews = async (cityId) => {
    await axios
      .get(server.BASE_URL + server.ROUTES.review + cityId + '/')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLoadReviews(params.cityId);
  }, []);
  return (
    <div>
      <Row>
        <Col className="text-lg-end">
          <h1>관광지 리뷰게시판</h1>
        </Col>
      </Row>
      <Row className="align-self-end ">
        <Col className=" m-5 text-lg-end" onClick={writeReview}>
          <Button variant="secondary">글쓰기</Button>{' '}
        </Col>
      </Row>
      <div>
        <Table striped bordered hover className="m-5 ">
          <tbody className="bg-secondary m-5">
            {tmpdata.map((data, idx) => {
              return (
                <tr key={idx} className="m-5">
                  <td className="bg-secondary m-5 p-3 align-self-center border-5">
                    {data} {idx + 1}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Board;
