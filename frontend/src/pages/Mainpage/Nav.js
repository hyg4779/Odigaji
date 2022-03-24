import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <div className="Nav">
      <NavLink className="Nav-item" to="/">
        메인페이지
      </NavLink>
      <div className="Nav-list">
        <NavLink className="Nav-item" to="/">
          직접찾기
        </NavLink>
        <NavLink className="Nav-item" to="/random">
          랜덤여행지
        </NavLink>
        <NavLink className="Nav-item" to="/survey">
          맞춤여행지
        </NavLink>
        <NavLink className="Nav-item" to="/signup">
          회원가입
        </NavLink>
      </div>
      <NavLink className="Nav-item" to="/login">
        로그인
      </NavLink>
    </div>
  );
}

export default Nav;
