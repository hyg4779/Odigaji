import { Row, Table, Col, Button, Pagination, PageItem } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../API/server';
import './Board.css';

function Board() {
  let navigate = useNavigate();
  let params = useParams();
  const itemsPerPage = 5;
  const [reviewdata, setReviewdata] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [offsetValue, setOffsetValue] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const writeReview = () => {
    navigate('/local/travelDetail/board/write');
  };

  const getLoadReviews = async (cityId) => {
    console.log(
      server.BASE_URL + server.ROUTES.review + cityId + '/1/?page_num=1'
    );
    await axios
      .get(server.BASE_URL + server.ROUTES.review + cityId + '/1/?page_num=1')
      .then((response) => {
        console.log(response);
        setReviewdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getLoadReviews(params.cityId);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(reviewdata.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(reviewdata.length / itemsPerPage));
    setOffsetValue(endOffset);
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % reviewdata.length;

    setItemOffset(newOffset);
  };
  let items = [];
  let active = 1;
  for (let number = 1; number <= offsetValue; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

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
                {reviewdata &&
                  reviewdata.map((data) => {
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
          </Row>
        </div>

        <Row className="align-self-end ">
          <Col className=" m-5 text-lg-end" onClick={writeReview}>
            <Button variant="secondary">글쓰기</Button>{' '}
          </Col>
        </Row>
        <Pagination>
          <Pagination.First />
          <Pagination.Prev />

          {items}

          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </div>
    </div>
  );
}

export default Board;
