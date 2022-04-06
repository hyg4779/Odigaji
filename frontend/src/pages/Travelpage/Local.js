/*global kakao*/
import { Table } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import server from '../../API/server';
import { Link, useParams } from 'react-router-dom';
import TravelRating from '../../components/Travelcomponents/TravelRating';
import './Local.css';
import LocalModal from '../../components/Travelpage/LocalModal';
function MovetravelPage(id) {
  window.location.href = 'travelDetail/' + id + '/';
}

function MoveBoardPage(id) {
  window.location.href = 'travelDetail/board/' + id + '/';
}

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
  const [localImg, setLocalImg] = useState(null); // 시 로고 이미지
  const [avg_rate, setAvg_rate] = useState(null);
  const [rating, setRating] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  //////////////////// URL //////////////////////////////////////
  const cityUrl =
    server.BASE_URL + server.ROUTES.allCities + cityId + '/' + 'get-city/';
  const visitedUrl =
    server.BASE_URL + server.ROUTES.allCities + cityId + '/is-visited/';
  let isLogin = sessionStorage.getItem('jwt');

  const randerMap = (att_ListData) => {
    console.log(att_ListData);
    var mapContainer2 = document.getElementById('map2'), // 지도를 표시할 div
      mapOption2 = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    var map2 = new kakao.maps.Map(mapContainer2, mapOption2); // 지도를 생성합니다
    // 마커가 표시될 위치입니다
    att_ListData &&
      att_ListData.forEach((data, key) => {
        console.log(data);
        var markerPosition = new kakao.maps.LatLng(
          data.latitude,
          data.longitude
        );
        var marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map2);
      });
    // var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    // 마커를 생성합니다
    // var marker = new kakao.maps.Marker({
    //   position: markerPosition,
    // });
    // 마커가 지도 위에 표시되도록 설정합니다
  };
  useEffect(() => {
    isLogin = sessionStorage.getItem('jwt');
    let att_ListData = [];
    const jwt = sessionStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : '';
    //도시정보 가져오기!!!
    axios.get(cityUrl).then((res) => {
      setId(res.data.id);
      setInfo(res.data.info);
      setPapulation(res.data.population);
      setName(res.data.name);
      setProvince(res.data.province_data.name);
      setArea(res.data.area);
      setTravelList(res.data.att_data);

      res.data.att_data.map((data) => {
        att_ListData.push({
          latitude: data.latitude,
          longitude: data.longitude,
        });
        // console.log(data.latitude, data.longitude);
      });
      setLocalLogo(res.data.photo);
      setLocalImg(res.data.background_photo);
      setAvg_rate(res.data.avg_rate);
    });
    //내 별점 가져오기
    axios
      .get(visitedUrl)
      .then((res) => {
        setRating(res.data.rate);
        if (res.status === 200) {
          isLogin = true;
        }
      })
      .catch((err) => {
        isLogin = false;
      });
    randerMap(att_ListData);
  }, [isLogin]);

  return (
    <div className="LocalContainer">
      <div className="DetailContent">
        <div className="LocalInfoBox">
          <div className="LocalWrap">
            <img className="localImage" src={server.BASE_URL + localImg} />
            <div className="LocalInfo">
              <div className="LocalTitle">
                {(province === '자치 시도' ? '' : province) + '\n' + name}
                {rating != null ? (
                  <img className="visitedMedal" src="\img\메달.png"></img>
                ) : (
                  ''
                )}
                <img
                  className="LocalLogoImg"
                  src={server.BASE_URL + localLogo}
                ></img>
              </div>
              <div className="spaceArea"></div>
              <div className="LcoalText">{info}</div>
              <div className="spaceArea"></div>
              <div>인구수 : 약 {papulation} 명 </div>
              <div>면적 : {area} m2</div>
            </div>
          </div>

          <div className="RatingArea">
            <div className="RatingTitle">
              <span className="avg">평균 평점</span>
              <TravelRating
                cityId={cityId}
                rating={avg_rate}
                setRating={setRating}
              />
            </div>
            {isLogin != null ? (
              rating != null ? (
                <div className="RatingTitle2">
                  <span className="avg">나의 평점</span>
                  <TravelRating
                    cityId={cityId}
                    rating={rating}
                    setRating={setRating}
                  />
                </div>
              ) : (
                <button className="MyRatingTitle2" onClick={openModal}>
                  다녀온 곳 등록
                </button>
              )
            ) : (
              ''
            )}
          </div>
        </div>
        <LocalModal
          open={modalOpen}
          close={closeModal}
          cityId={cityId}
          rating={rating}
          setRating={setRating}
          province={province}
          name={name}
        ></LocalModal>
        <div className="LocalInfoBox2">
          <div className="LocalAttraction">{name} 추천 여행지</div>
          <div className="IntoReview">
            <button
              className="reviewButton"
              onClick={() => MoveBoardPage(params.cityId)}
            >
              리뷰 게시판
            </button>
          </div>
          <div id="map2" style={{ width: '100%', height: '350px' }}></div>
          <Table striped bordered hover>
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
        </div>
      </div>
      <div className="modal">
        <div className="modal_body">Modal</div>
      </div>
    </div>
  );
}

export default Local;
