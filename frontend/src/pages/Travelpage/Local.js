import { Container, Image, Row, Table, Col, Button } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../../API/server';
import { Link, useParams } from 'react-router-dom';

function MovetravelPage(id) {
  window.location.href = 'travelDetail/' + id + '/';
}

function MoveBoardPage(id) {
  window.location.href = 'travelDetail/board/' + id + '/';
}

function visited() {
  console.log('visited button clicked');
  axios.get();
}

function Local() {
  let params = useParams();
  const cityId = params.cityId; // 시 아이디를 url에서 받아옴
  const [id, setId] = useState(null); //시 아이디
  const [info, setInfo] = useState(null); // 시 정보
  const [name, setName] = useState(null); // 시 명
  const [papulation, setPapulation] = useState(null); // 시 인구
  const [province, setProvince] = useState(null); // 도 명
  const [area, setArea] = useState(null); // 시 넓이
  const [travelList, setTravelList] = useState(null); // 시 내 관광지목록

  useEffect(() => {
    //렌더링 이후에 실행되는 함수
    //
    axios
      .get(server.BASE_URL + server.ROUTES.cities + cityId + '/' + 'get-city/')
      .then((res) => {
        console.log(res);
        setId(res.data.id);
        setInfo(res.data.info);
        setPapulation(res.data.population);
        setName(res.data.name);
        setProvince(res.data.province);
        setArea(res.data.area);
        setTravelList(res.data.att_data);
        // console.log(typeof travelList, typeof tempdata);
        // console.log(travelList, tempdata);
      });
  }, []);
  return (
    <div className="TravelDetail m-5 pt-5">
      <div className="list">
        <Row className="h3">
          <Col sm={4} className="bg-secondary text-white m-2">
            {name} 관광지 목록
          </Col>
          <Col sm={4} className="bg-secondary text-white m-2">
            인구수 : {papulation}
          </Col>
          <Col sm={2} className="bg-secondary text-white m-2">
            면적 : {area}
          </Col>
        </Row>
      </div>
      <div className="listContents">
        <Row>
          <Col>
            {/* 나중에 백엔드 이미지 업로드되면 수정할것!!! 백엔드 api완성되면 추가할것(아마 주말에 할듯?) */}
            <Image src="/img/수원시.jpg" rounded />
          </Col>
          <Col>
            <div className="cityintro bg-secondary text-white m-2">{info}</div>
          </Col>
        </Row>
      </div>
      {/* 부트스트랩 테이블 넣을자리!!! */}
      <Table striped bordered hover className="m-5">
        <tbody>
          {/* &&양옆에 2개쓰면  */}
          {travelList &&
            travelList.map((data, idx) => {
              return (
                //무명함수 호출안하면 강제로 이동한다....
                <tr key={idx} onClick={() => MovetravelPage(data.id)}>
                  <td className="m-2">{data.name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <Container>
        <Button variant="secondary" onClick={() => MoveBoardPage(id)}>
          리뷰 게시판 이동
        </Button>{' '}
        <Button variant="success" onClick={() => visited()}>
          방문
        </Button>
      </Container>
    </div>

    // end TravelDetail Div
  );
}

export default Local;
