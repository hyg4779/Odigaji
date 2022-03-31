/*global kakao*/
import React, { useEffect, useState } from 'react';
import { Image, Row, Col, Container, Table, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TravelDetail.css';
import server from '../../API/server';
function goback() {
  window.history.back();
}
function TravelDetail() {
  let params = useParams();
  const attractionId = params.attractionId;
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [facilities, setFacilities] = useState();
  const [parking_lot, setParking_lot] = useState();
  const [tel, setTel] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [city, setCity] = useState();
  const [province, setProvince] = useState();
  let attractionDetail;
  console.log(attractionId);
  console.log(latitude);
  console.log(longitude);
  //랜더링 이후 실행되는 함수
  useEffect(() => {
    axios
      .get(
        server.BASE_URL +
          server.ROUTES.allCities +
          attractionId +
          server.ROUTES.attraction

        // 'http://127.0.0.1:8000/api/cities/505/get-attraction/'
      )
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setAddress(res.data.address);
        setFacilities(res.data.facilities);
        setParking_lot(res.data.parking_lot);
        setTel(res.data.tel);
        setLatitude(res.data.latitude);
        setLongitude(res.data.longitude);
        setCity(res.data.city);
        setProvince(res.data.province);
        attractionDetail = res.data;
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(res.data.latitude, res.data.longitude),
          level: 3,
        };
        var map = new kakao.maps.Map(container, options);
        var markerPosition = new kakao.maps.LatLng(
          res.data.latitude,
          res.data.longitude
        );
        var marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
        var iwContent = '<div style="padding:5px;">' + res.data.name + '</div>';
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker);
        });
        kakao.maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close();
        });
      });
  }, []);
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
          <div id="map"></div>
        </Col>
      </Row>
      <Container>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>관광지명</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>주소</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>편의시설</td>
              <td>{facilities}</td>
            </tr>
            <tr>
              <td>주차가능수</td>
              <td>{parking_lot}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>{tel}</td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <Container>
        <Button variant="secondary" onClick={() => goback()}>
          **시목록으로
        </Button>{' '}
      </Container>
    </div>
    // end TravelDetail div
  );
}
export default TravelDetail;
