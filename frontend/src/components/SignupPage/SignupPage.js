import React, { useState, useEffect } from 'react';
import './SignupPage.css';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fileImage, setFileImage] = useState('');
  const [EmailErrors, setEmailErrors] = useState('');
  const [PasswordErrors, setPasswordErrors] = useState('');
  const [PasswordConErrors, setPasswordConErrors] = useState('');
  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  // const deleteFileImage = () => {
  //   URL.revokeObjectURL(fileImage);
  //   setFileImage('');
  // };

  const onNameHandler = (event) => {
    console.log(event);
    setName(event.currentTarget.value);
  };
  const EmailVaildation = (email) => {
    let emailError = '';
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!email) {
      emailError = '이메일은 필수 입니다.';
    } else if (!regex.test(email)) {
      emailError = '이메일 형식이 알맞지 않습니다.';
    }

    return emailError;
  };
  const PasswordValidation = (password) => {
    let passwordError = '';
    if (!password) {
      passwordError = '비밀번호는 필수 입니다.';
    } else if (password.length < 6) {
      passwordError = '비밀번호가 너무 짧습니다.';
    }
    return passwordError;
  };
  const ConPasswordValidation = (password, value) => {
    let confirmPasswordError = '';
    if (password !== value) {
      confirmPasswordError = '비밀번호가 다릅니다.';
    }
    console.log(confirmPasswordError);

    return confirmPasswordError;
  };

  const onEmailHandler = (event) => {
    setEmailErrors(EmailVaildation(event.target.value));

    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    console.log(event);
    setPasswordErrors(PasswordValidation(event.target.value));
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    console.log(event);
    setPasswordConErrors(ConPasswordValidation(password, event.target.value));

    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(EmailErrors, PasswordErrors, PasswordConErrors);
  };

  return (
    <div className="wrap">
      <div className="signup">
        <form>
          <div className="email">
            <input
              name="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onEmailHandler}
              required
              autoComplete="off"
            />
          </div>
          <div style={{ color: 'red', fontSize: '12px' }}>{EmailErrors}</div>
          <div className="name">
            <input
              name="name"
              type="text"
              placeholder="닉네임"
              value={name}
              onChange={onNameHandler}
              required
              autoComplete="off"
            />
          </div>

          <div className="password">
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
          <div style={{ color: 'red', fontSize: '12px' }}>{PasswordErrors}</div>
          <div className="confirm-password">
            <input
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              required
              autoComplete="off"
            />
          </div>
          <div style={{ color: 'red', fontSize: '12px' }}>
            {PasswordConErrors}
          </div>

          <div className="img-upload">
            {/* {fileImage && <img alt="sample" src={fileImage} />} */}
            <div>
              <input
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={saveFileImage}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="btnSignup">
            <button type="submit" onSubmit={onSubmit}>
              가입하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupPage;
