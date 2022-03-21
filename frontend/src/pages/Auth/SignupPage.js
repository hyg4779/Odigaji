import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fileImage, setFileImage] = useState('');

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage('');
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert('비밀번호 확인은 같아야 합니다.');
    }
  };

  return (
    <div>
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
            name="name"
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={onNameHandler}
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
          <input
            name="confirmPassword"
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
          />
        </div>

        <div>
          {fileImage && <img alt="sample" src={fileImage} />}
          <div>
            <input
              name="imgUpload"
              type="file"
              accept="image/*"
              onChange={saveFileImage}
            />

            <button onClick={() => deleteFileImage()}>삭제</button>
          </div>
        </div>
        <div>
          <button type="submit" onSubmit={onSubmit}>
            가입하기
          </button>
        </div>
      </form>
    </div>
  );
}
export default SignupPage;
