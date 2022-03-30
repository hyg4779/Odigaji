import { Row, Table, Col, Button, Pagination, PageItem } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import server from '../../API/server';
import './Board.css';
const ITEMS_PER_PAGE = 10;
const PAGES_PER_LIST = 5;
function Board() {
  let navigate = useNavigate();
  let params = useParams();

  const [totalLength, setTotalLength] = useState();
  const [totalPage, setTotalPage] = useState([]);
  const [reviewData, setReviewdata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClick, setIsClick] = useState(true);
  const writeReview = () => {
    navigate('/local/travelDetail/board/write');
  };

  const makePageArray = () => {
    let pageArray = [];
    for (let i = 1; i <= totalLength; i++) {
      pageArray.push(i);
    }
    setTotalPage(pageArray);
  };

  const getLoadReviews = async (cityId) => {
    await axios
      .get(server.BASE_URL + server.ROUTES.review + cityId + '/')
      .then((response) => {
        setTotalLength(response.data[response.data.length - 1].total_pages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(reviewData);
  useEffect(() => {
    getLoadReviews(params.cityId);
    if (isClick) {
      axios
        .get(
          server.BASE_URL +
            server.ROUTES.review +
            params.cityId +
            '/?page_num=' +
            currentPage
        )
        .then((response) => {
          setReviewdata(response.data);

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      setIsClick(!isClick);
    }

    makePageArray();
  }, [totalLength, isClick]);

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
                {reviewData &&
                  reviewData.map((data, key) => {
                    return (
                      <tr key={key}>
                        <td>{data.id}</td>
                        <td className="left">{data.title}</td>
                        <td>{data.updated}</td>
                        <td>{data.user}</td>
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
      </div>
      <Pagination size="md">
        <Pagination.Prev
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
              setIsClick(true);
            }
          }}
        ></Pagination.Prev>
        {totalPage.map((num) => (
          <Pagination.Item
            key={num}
            onClick={() => {
              setCurrentPage(num);
              setIsClick(true);
            }}
          >
            {num}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => {
            if (currentPage < totalLength) {
              setCurrentPage(currentPage + 1);
              setIsClick(true);
            }
          }}
        ></Pagination.Next>
      </Pagination>
    </div>
  );
}

export default Board;
