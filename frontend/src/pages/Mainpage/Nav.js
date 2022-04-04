import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Nav.css';

function Nav() {
  let navigate = useNavigate();
  const isLogin = sessionStorage.getItem('jwt') ? true : false;
  function logout(event) {
    if (window.confirm('정말로 로그아웃하실 건가요?')) {
      event.preventDefault();
      sessionStorage.removeItem('jwt');
      navigate('/');
    }
  }
  return (
    <div className="Nav">
      <NavLink className="Nav-item" to="/">
        메인페이지
      </NavLink>
      <div className="Nav-list">
        <NavLink className="Nav-item" to="/search">
          직접찾기
        </NavLink>
        <NavLink className="Nav-item" to="/random">
          랜덤여행지
        </NavLink>
        <NavLink className="Nav-item" to="/survey">
          맞춤여행지
        </NavLink>
        {isLogin ? (
          <NavLink className="Nav-item" to="/mypage">
            마이페이지
          </NavLink>
        ) : (
          <NavLink className="Nav-item" to="/signup">
            회원가입
          </NavLink>
        )}
      </div>
      {isLogin ? (
        <button className="Nav-item" onClick={(event) => logout(event)}>
          로그아웃
        </button>
      ) : (
        <NavLink className="Nav-item" to="/login">
          로그인
        </NavLink>
      )}
    </div>
  );
}

export default Nav;
