import React from 'react';
import { Image, Row, Col, Container, Table, Button } from 'react-bootstrap';
function TravelDetail() {
  let tempdata = [
    '임진각 관광지',
    '경기도 파주시 문산읍 임진각로 177',
    '공공 편익시설 정보 : 관리사무실+관광안내매표소1층+화장실3동+홍보관1층+상황실2층+오수처리장1층+기반시설(도로+광장+주차장)',
    '관광지 소개: 는 평화와 환경의 중요성을 전달하는 경기평화센터가 있다. 또한, 철마는 달리고 싶다 철도중단점, 북한 실향민을 위한 망배단, 미얀마 아웅산 순국외교사절 위령탑, 한국전쟁의 대표 유산으로서 50여년 만에 개방이 된 자유의 다리와 한반도의 지령을 본딴 통일연못, 평화의 종, 미국군 참전기념비 등이 있는 통일안보 관광지이다. 더불어 남북교류 및 화해협력의 장소로 통일관련행사를 많이 치르고 있다. 판문점처럼 복잡한 허가절차를 필요로 하지 않는 관광지로서 경기도내에서 가장 외국인이 많이 찾는 곳이 되었다. 최근 소규모 어린이 놀이시설을 개발하여 바이킹, 미니열차 등을 이용할수 있다.',
    'TELL : 031-950-1871 ',
    '주차가능수 : 2091 ',
  ];
  return (
    <div className="TravelDetail">
      <Row>
        <Col>
          <Image src="/img/수원시.jpg" roundedCircle />
        </Col>
        <Col>
          <Image src="/img/수원시.jpg" roundedCircle />
        </Col>
      </Row>
      <Container>
        <Table striped bordered hover>
          <tbody>
            {tempdata.map((data, idx) => {
              return (
                <tr key={idx}>
                  <td>{data}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Container>
        <Button variant="secondary">**시목록으로</Button>{' '}
      </Container>
    </div>
    // end TravelDetail div
  );
}
export default TravelDetail;
