import { useState, useRef } from 'react';
import React from 'react';

function ChangeInfo() {
  const userNick = ['유저네임'];
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  );
  const fileInput = useRef(null);

  const onChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
    console.log(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="My">
      <div className="TitleContainer">
        <div>
          <div className="profileBox">
            <img className="profileImg" src={Image} />

            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
          </div>
        </div>
      </div>
      <div className="userContainer">
        <div className="userTitle">
          <div className="userName">유저네임</div>
          <button
            className="ProfileChange"
            onClick={() => fileInput.current.click()}
          >
            프로필 변경
          </button>
        </div>
      </div>

      <div className="ActivityContainer"></div>
    </div>
  );
}
export default ChangeInfo;
