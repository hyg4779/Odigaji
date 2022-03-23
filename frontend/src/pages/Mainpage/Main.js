import React, { useEffect, useRef, useState } from 'react';
import Intro from '../../components/Mainpage/Intro';
import Popular from '../../components/Mainpage/Popular';
import Point from '../../components/Mainpage/Point';
import './Main.css';

function Main() {
  // 아래 두 개의 데이터는 나중에 DB에서 받아오게 수정해야 함
  // 지역의 이름과 해당 지역의 사진을 같이 받아와야 함
  const randomData = ['대전'];
  const popularData = ['이천', '여주', '대전', '제주', '서귀포', '부산'];
  const mainRef = useRef();
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    function wheelHandler(event) {
      event.preventDefault(); // wheel 이벤트에 의해 새로고침 되는 것을 막아준다
      const { deltaY } = event; // wheel 이벤트 중 deltaY(휠 방향과 정도) 를 이용한다
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
          setPageIndex(2);
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
          setPageIndex(1);
        }
      }
    }

    const mainRefCurrent = mainRef.current;
    mainRefCurrent.addEventListener('wheel', wheelHandler);
    // mainRef를 포함하는 DOM을 할당한 뒤, 해당 DOM에 wheel 이벤트를 부여해준다
    return function () {
      mainRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <div ref={mainRef} className="Main">
      <Point pageIndex={pageIndex} />
      <Intro randomData={randomData} />
      <div className="Divider"></div>
      <Popular popularData={popularData} />
    </div>
  );
}

export default Main;
