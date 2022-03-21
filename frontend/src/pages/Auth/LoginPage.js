import React, { useState } from 'react';

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

  return (
    <div>
      <h1>오디가지</h1>
      <form>
        <div>
          <input
            name="email"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={onEmailHandler}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onPasswordHandler}
          />
        </div>
        <div>
          <button type="submit" onSubmit={onSubmit}>
            로그인
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
