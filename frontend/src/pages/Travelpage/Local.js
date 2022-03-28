import { Container, Image, Row, Table, Col, Button } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../../API/server';
import { useParams } from 'react-router-dom';

function Local() {
  //도시 DB연동을 위한 변수선언

  // 과거데이터
  let citydata = [
    '수원 관광지 목록',
    '인구수 : 4만',
    '면적 : 23000M^2',
    '/img/수원시.jpg',
    '도시소개 : 수원시(水原市)는 대한민국 경기도 서남부에 있는 \
  특례시이자 경기도청 소재지이다. 동쪽으로는 용인시, 서쪽으로는\
  안산시, 남쪽으로는 화성시, 북쪽으로 의왕시와 접한다. 시청 소재지는\
  팔달구 인계동이며, 장안구, 권선구, 팔달구, 영통구의 4개 일반구가\
  설치되어 있다.',
  ];

  let tempdata = ['수원화성', '수원화성2', '수원화성3'];
  let params = useParams();
  const cityId = params.cityId;
  const [id, setId] = useState(null);
  const [info, setInfo] = useState(null);
  const [name, setName] = useState(null);
  const [papulation, setPapulation] = useState(null);
  const [province, setProvince] = useState(null);
  const [area, setArea] = useState(null);
  const [travelList, setTravelList] = useState(null);
  useEffect(() => {
    axios
      .get(server.BASE_URL + server.ROUTES.cities + cityId + '/' + 'get_city/')
      .then((res) => {
        console.log(res);
        setId(res.data[0].id);
        setInfo(res.data[0].info);
        setPapulation(res.data[0].population);
        setName(res.data[0].name);
        setProvince(res.data[0].province);
        setArea(res.data[0].area);
        setTravelList(res.data[1]);
        console.log(res.data[1]);
        console.log(travelList);
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
            {/* 나중에 백엔드 이미지 업로드되면 수정할것!!! */}
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
          {/* 나중에 관광지 목록 받아서 처리할것!! */}
          {tempdata.map((data, idx) => {
            return (
              <tr key={idx}>
                <td className="m-2">{data}</td>
                {/* {travelList[0].id} */}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Container>
        <Button variant="secondary">리뷰 게시판 이동</Button>{' '}
      </Container>
    </div>

    // end TravelDetail Div
  );
}

export default Local;
