import { Container, Image, Row, Table, Col, Button } from 'react-bootstrap';
import React from 'react';
function Local() {
  let tempdata = ['수원화성', '수원화성2', '수원화성3'];
  return (
    <div className="TravelDetail">
      <div className="list">
        <Row>
          <Col sm={6}>수원 관광지 목록</Col>
          <Col sm={3}>인구수 : 4만</Col>
          <Col sm={3}>면적 : 23000M^2</Col>
        </Row>
      </div>
      <div className="listContents">
        <Row>
          <Col>
            <Image src="/img/수원시.jpg" roundedCircle />
          </Col>
          <Col>
            <div className="cityintro">
              도시소개 : 수원시(水原市)는 대한민국 경기도 서남부에 있는
              특례시이자 경기도청 소재지이다. 동쪽으로는 용인시, 서쪽으로는
              안산시, 남쪽으로는 화성시, 북쪽으로 의왕시와 접한다. 시청 소재지는
              팔달구 인계동이며, 장안구, 권선구, 팔달구, 영통구의 4개 일반구가
              설치되어 있다.
            </div>
          </Col>
        </Row>
      </div>
      {/* 부트스트랩 테이블 넣을자리!!! */}
      <Table striped bordered hover>
        <tbody>
          {/* {props.tempdata.map((data,index)) => {
            (<tr key={index}>
            <td> data={data}</td>
            </tr>)
          }} */}

          {tempdata.map((data, idx) => {
            return (
              <tr key={idx}>
                <td>{data}</td>
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
