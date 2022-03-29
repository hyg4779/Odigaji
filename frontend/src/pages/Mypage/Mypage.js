import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Mypage.css';
import server from '../../API/server';
import { useNavigate } from 'react-router-dom';

function Mypage() {
  let imageCondition = false;
  const Defaultimg =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
  const [Userdata, setUserData] = useState({ hits: [] });

  if (Userdata.photo) {
    imageCondition = true;
  }
  const getUserInfo = async () => {
    const jwt = sessionStorage.getItem('jwt');
    // axios.defaults.headers.common['Authorization'] = jwt
    //   ? `Bearer ${jwt}`
    //   : '';
    await axios
      .get(server.BASE_URL + server.ROUTES.mypage, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let navigate = useNavigate();
  const InfoClick = () => {
    navigate('/mypage/userinfo', { state: Userdata });
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  console.log(Userdata);
  return (
    <div className="My">
      <div className="TitleContainer">
        <div>
          <div className="profileBox">
            <img
              className="profileImg"
              src={
                imageCondition ? server.BASE_URL + Userdata.photo : Defaultimg
              }
            />
          </div>
        </div>
      </div>
      <div className="userContainer">
        <div className="userbutton">
          <div className="userName">{Userdata.username}</div>
          <button onClick={InfoClick} className="Editinfo">
            회원수정
          </button>
        </div>
        <div className="userNick">{Userdata.nickname}</div>
        <div className="userPoint">포인트 {Userdata.point}</div>
      </div>

      <div className="ActivityContainer">
        <div className="item">
          <div className="number">다녀온 도시수</div>
          <div>X</div>
        </div>
        <div className="item">
          <div className="number">관광지 리뷰수</div>
          <div>X</div>
        </div>
        <div className="item">
          <div className="number">작성한 댓글수</div>
          <div>X</div>
        </div>
      </div>

      <div className="VisitedCityContainer">
        <div className="title">다녀온 도시</div>
        <div className="status">
          <div className="item">
            <div>
              <div className="number"></div>
              <div className="text">X</div>
            </div>
            <div className="space"></div>
          </div>
          <div className="item">
            <div>
              <div className="number"></div>
              <div className="text">X</div>
            </div>
            <div className="space"> </div>
          </div>
          <div className="item">
            <div>
              <div className="number"></div>
              <div className="text">X</div>
            </div>
            <div className="space"> </div>
          </div>
        </div>
      </div>
      <div className="ReviewListContainer">
        <div className="Reviewtitle">작성한 관광지 리뷰</div>
        <div className="ListTitle">
          <div className="headRegion">지역</div>
          <div className="headtitle">작성한 리뷰 제목</div>
          <div className="headtime">작성일자</div>
        </div>
        <div className="item">
          <div className="region">대전광역시</div>
          <div className="textTitle">대전 한밭수목원 리뷰</div>
          <div className="time">2022.03.23.10:13</div>
        </div>
      </div>

      <div className="ReviewListContainer">
        <div className="Reviewtitle">작성한 댓글 목록</div>
        <div className="ListTitle">
          <div className="headRegion">게시글</div>
          <div className="headtitle">댓글 내용</div>
          <div className="headtime">작성일자</div>
        </div>
        <div className="item">
          <div className="region">서울 관광하는데 추천 좀..</div>
          <div className="textTitle">서울 경복궁 관광하러 갔는데 좋아요!</div>
          <div className="time">2022.03.23.10:13</div>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
