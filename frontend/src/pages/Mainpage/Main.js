import React, { useEffect, useRef } from 'react';
import Intro from '../../components/Mainpage/Intro';
import Popular from '../../components/Mainpage/Popular';
import './Main.css';

function Main() {
  // 아래 두 개의 데이터는 나중에 DB에서 받아오게 수정해야 함
  // 지역의 이름과 해당 지역의 사진을 같이 받아와야 함
  const randomData = ['대전'];
  const popularData = ['이천', '여주', '대전', '제주', '서귀포', '부산'];
  const mainRef = useRef();

  useEffect(() => {
    function wheelHandler(event) {
      event.preventDefault();
      const { deltaY } = event;
      const { scrollTop } = mainRef.current;
      const pageH = window.innerHeight;

      if (deltaY > 0 && scrollTop === 0) {
        console.log('스크롤을 내립니다');
        // 스크롤을 내릴 때
        // scrollTop === 0 조건을 걸지 않으면 휠을 연속으로 돌릴 때 버벅거린다
        if (scrollTop >= 0 && scrollTop < pageH) {
          mainRef.current.scrollTo({
            top: pageH + 5,
            left: 0,
            behavior: 'smooth',
          });
        }
      } else if (deltaY < 0 && scrollTop > pageH) {
        console.log('스크롤을 올립니다');
        // 스크롤을 올릴 때
        // scrollTop > pageH 조건을 걸지 않으면 휠을 연속으로 위로 돌릴 때 버벅거린다
        if (scrollTop >= 0 && scrollTop > pageH) {
          mainRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }

    const mainRefCurrent = mainRef.current;
    mainRefCurrent.addEventListener('wheel', wheelHandler);
    return function () {
      mainRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <div ref={mainRef} className="Main">
      <Intro randomData={randomData} />
      <div className="Divider"></div>
      <Popular popularData={popularData} />
    </div>
  );
}

export default Main;
