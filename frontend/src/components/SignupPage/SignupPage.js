import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupPage.css';
import server from '../../API/server';
import axios from 'axios';
function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fileImage, setFileImage] = useState('');
  const [EmailErrors, setEmailErrors] = useState('');
  const [NicknameErrors, setNicknameErrors] = useState('');
  const [PasswordErrors, setPasswordErrors] = useState('');
  const [PasswordConErrors, setPasswordConErrors] = useState('');
  // 파일 저장
  const saveFileImage = (event) => {
    setFileImage(event.target.files[0]);
  };

  const onNameHandler = (event) => {
    setNicknameErrors(NicknameVaildation(event.target.value));
    setName(event.currentTarget.value);
  };
  const EmailVaildation = (email) => {
    let emailError = '';
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!email) {
      emailError = '이메일은 필수입니다.';
    } else if (!regex.test(email)) {
      emailError = '이메일 형식이 알맞지 않습니다.';
    }

    return emailError;
  };
  const NicknameVaildation = (name) => {
    let NicknameError = '';
    const regex = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

    if (!name) {
      NicknameError = '닉네임은 필수입니다.';
    } else if (!regex.test(name)) {
      NicknameError =
        '닉네임은 한글, 영문, 숫자만 가능하며 2-10자리 가능합니다.';
    }

    return NicknameError;
  };
  const PasswordValidation = (password) => {
    let passwordError = '';
    if (!password) {
      passwordError = '비밀번호는 필수입니다.';
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

    return confirmPasswordError;
  };

  const onEmailHandler = (event) => {
    setEmailErrors(EmailVaildation(event.target.value));

    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPasswordErrors(PasswordValidation(event.target.value));
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setPasswordConErrors(ConPasswordValidation(password, event.target.value));

    setConfirmPassword(event.currentTarget.value);
  };

  let navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('username', email);
    formData.append('nickname', name);
    formData.append('password', password);
    formData.append('passwordconfirm', confirmPassword);
    formData.append('photo', fileImage);

    if (
      !EmailErrors &&
      !PasswordConErrors &&
      !PasswordConErrors &&
      !NicknameErrors
    ) {
      await axios
        .post(server.BASE_URL + server.ROUTES.signup, formData)
        .then((res) => {
          console.log(res);

          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="wrap">
      <div className="signup">
        <form onSubmit={onSubmit}>
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
          <div style={{ color: 'red', fontSize: '12px' }}>{NicknameErrors}</div>
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
            <button type="submit">가입하기</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupPage;
