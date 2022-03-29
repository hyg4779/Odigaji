import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import server from '../../API/server';
import axios from 'axios';
// import jwt_decode from 'jwt-decode';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [authTokens, setAuthTokens] = useState('');
  // const [user, setUser] = useState('');
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    await axios
      .post(server.BASE_URL + server.ROUTES.login, formData)
      .then((response) => {
        if (response.status === 200) {
          // setAuthTokens(response.data);
          // //jwt decode 사용
          // setUser(jwt_decode(response.data.access));
          // //Access Token 저장
          sessionStorage.setItem('jwt', response.data.access);
        }

        navigate('/');
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  };
  let navigate = useNavigate();
  const onClick = () => {
    navigate('/signup');
  };

  return (
    <div className="wrap">
      <div className="login">
        {/* <h1>오디가지</h1> */}
        <form onSubmit={onSubmit}>
          <div className="login_id">
            <h5>이메일</h5>
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onEmailHandler}
              required
              autoComplete="on"
            />
          </div>
          <div className="login_pw">
            <h5>비밀번호</h5>
            <input
              name="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onPasswordHandler}
              required
              autoComplete="off"
            />
          </div>
          <div className="clearfix">
            <div className="btn">
              <button type="submit">로그인</button>
            </div>
            <div className="btn" onClick={onClick}>
              <button>회원가입</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
