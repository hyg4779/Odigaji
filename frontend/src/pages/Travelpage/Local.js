import { Container, Image, Row, Table, Col, Button } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../../API/server';
import { Link, useParams } from 'react-router-dom';
import TravelRating from '../../components/Travelcomponents/TravelRating';

function MovetravelPage(id) {
  window.location.href = 'travelDetail/' + id + '/';
}

function MoveBoardPage(id) {
  window.location.href = 'travelDetail/board/' + id + '/';
}

// function visited() {
//   console.log('visited button clicked');
//   const jwt = sessionStorage.getItem('jwt');
//   axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';

//   axios
//     .post(server.BASE_URL + server.ROUTES.selCity, {
//       city: cityId,
//       rate: 5,
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   // 나중에 방문처리 할것!!!
//   // axios.get();
// }
let cityId;
function Local() {
  let params = useParams();
  cityId = params.cityId; // 시 아이디를 url에서 받아옴
  const [id, setId] = useState(null); //시 아이디
  const [info, setInfo] = useState(null); // 시 정보
  const [name, setName] = useState(null); // 시 명
  const [papulation, setPapulation] = useState(null); // 시 인구
  const [province, setProvince] = useState(null); // 도 명
  const [area, setArea] = useState(null); // 시 넓이
  const [travelList, setTravelList] = useState(null); // 시 내 관광지목록
  const [localLogo, setLocalLogo] = useState(null); // 시 로고 이미지
  const [avg_rate, setAvg_rate] = useState(null);
  const [rating, setRating] = useState(null);

  //////////////////// URL //////////////////////////////////////
  const cityUrl =
    server.BASE_URL + server.ROUTES.allCities + cityId + '/' + 'get-city/';
  const visitedUrl = 'http://localhost:8000/api/cities/21/is-visited/';
  let isLogin = sessionStorage.getItem('jwt');
  useEffect(() => {
    //렌더링 이후에 실행되는 함수

    //로그인 정보 주입!!!
    isLogin = sessionStorage.getItem('jwt');

    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';
    //도시정보 가져오기!!!
    axios.get(cityUrl).then((res) => {
      console.log(res);
      setId(res.data.id);
      setInfo(res.data.info);
      setPapulation(res.data.population);
      setName(res.data.name);
      setProvince(res.data.province);
      setArea(res.data.area);
      setTravelList(res.data.att_data);
      setLocalLogo(res.data.photo);
      setAvg_rate(res.data.avg_rate);
      console.log(server.BASE_URL + localLogo);
    });
    //내 별점 가져오기
    axios
      .get(visitedUrl)
      .then((res) => {
        console.log(res);
        setRating(res.data.rate);
        if (res.status === 200) {
          isLogin = true;
        }
      })
      .catch((err) => {
        console.log(err);
        isLogin = false;
      });
    console.log(isLogin);
  }, [isLogin]);
  return (
    <div className="TravelDetail m-5 pt-5">
      <div className="list">
        <Row className="h3">
          <Row>
            <Col className="bg-secondary text-white m-2">
              {name} 관광지 목록
            </Col>
          </Row>
          <Col className="bg-secondary text-white m-2">
            인구수 : {papulation}
          </Col>
          <Col className="bg-secondary text-white m-2">면적 : {area}</Col>
          <Col className="bg-secondary text-white m-2">
            별점 : {avg_rate} / 5
          </Col>
        </Row>
      </div>
      <div className="listContents">
        <Row>
          <Col>
            {/* 나중에 백엔드 이미지 업로드되면 수정할것!!! 백엔드 api완성되면 추가할것(아마 주말에 할듯?) */}
            <Image src={server.BASE_URL + localLogo} rounded />
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
        <Button
          variant="secondary"
          onClick={() => MoveBoardPage(params.cityId)}
        >
          리뷰 게시판 이동
        </Button>{' '}
        {/* <Button variant="success" onClick={() => visited()}>
          방문
        </Button> */}
      </Container>
      {/* 로그인여부에따라 별점 평가 기능 활성/ 비활성화 */}
      <div className="bg-secondary">
        {isLogin != null ? (
          <TravelRating cityId={cityId} rating={rating} setRating={setRating} />
        ) : null}
      </div>
    </div>

    // end TravelDetail Div
  );
}

export default Local;
