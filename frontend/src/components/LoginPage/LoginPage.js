import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };
  let navigate = useNavigate();
  const onClick = () => {
    navigate('/signup');
  };

  return (
    <div className="wrap">
      <div className="login">
        {/* <h1>오디가지</h1> */}
        <form>
          <div className="login_id">
            <h5>이메일</h5>
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onEmailHandler}
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
            />
          </div>
          <div className="clearfix">
            <div className="btn">
              <button type="submit" onSubmit={onSubmit}>
                로그인
              </button>
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
