import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

function RouletteDo({
  selectProvince,
  provinceSpin,
  setProvinceSpin,
  setRandomResult,
}) {
  const data = [
    { option: '강원도', id: 1 },
    { option: '경기도', id: 2 },
    { option: '경상남도', id: 3 },
    { option: '경상북도', id: 4 },
    { option: '전라남도', id: 5 },
    { option: '전라북도', id: 6 },
    { option: '충청남도', id: 7 },
    { option: '충청북도', id: 8 },
    { option: '자치시도', id: 100 },
  ];

  const [prizeNumber, setPrizeNumber] = useState(0);

  function handleSpinClick() {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    // 도, 자치시도를 새롭게 뽑으니까 시, 군 데이터도 초기값으로 돌려줘야한다.
    setRandomResult(['어디로', '갈까요']);
    setPrizeNumber(newPrizeNumber);
    selectProvince(data[newPrizeNumber].id);
    setProvinceSpin(true);
  }

  return (
    <div align="center">
      <Wheel
        className="wheel"
        mustStartSpinning={provinceSpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor={['#f2f2f2']}
        outerBorderWidth={[10]}
        innerBorderColor={['#f2f2f2']}
        radiusLineColor={['#dedede']}
        radiusLineWidth={[10]}
        textColors={['white']}
        fontSize={[20]}
        backgroundColors={[
          '#CAB8FF',
          '#8A53FF',
          '#7535FE',
          '#AA14F0',
          '#BC8CF2',
        ]}
        onStopSpinning={() => {
          setProvinceSpin(false);
          const newRandomResult = [data[prizeNumber].option, ''];
          setRandomResult(newRandomResult);
        }}
      />
      <button onClick={handleSpinClick}>시작하기</button>
    </div>
  );
}

export default RouletteDo;
