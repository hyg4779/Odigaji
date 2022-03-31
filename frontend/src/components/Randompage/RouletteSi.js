import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

function RouletteSi({
  cities,
  provinceSpin,
  citySpin,
  setCitySpin,
  randomResult,
  setRandomResult,
}) {
  const data = [
    { option: '이천', id: 1, photo: '' },
    { option: '여주', id: 1, photo: '' },
    { option: '파주', id: 1, photo: '' },
    { option: '용인', id: 1, photo: '' },
    { option: '수원', id: 1, photo: '' },
    { option: '성남', id: 1, photo: '' },
    { option: '의정부', id: 1, photo: '' },
    { option: '안양', id: 1, photo: '' },
    { option: '부천', id: 1, photo: '' },
    { option: '광주', id: 1, photo: '' },
    { option: '고양', id: 1, photo: '' },
    { option: '평택', id: 1, photo: '' },
    { option: '시흥', id: 1, photo: '' },
    { option: '안성', id: 1, photo: '' },
    { option: '오산', id: 1, photo: '' },
    { option: '하남', id: 1, photo: '' },
    { option: '화성', id: 1, photo: '' },
  ];

  const [prizeNumber, setPrizeNumber] = useState(0);

  function handleSpinClick() {
    if (!provinceSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setCitySpin(true);
    }
  }

  return (
    <div align="center">
      <Wheel
        className="wheel"
        mustStartSpinning={citySpin}
        prizeNumber={prizeNumber}
        data={data}
        outerBorderColor={['#f2f2f2']}
        outerBorderWidth={[10]}
        innerBorderColor={['#f2f2f2']}
        radiusLineColor={['#dedede']}
        radiusLineWidth={[10]}
        textColors={['white']}
        fontSize={[20]}
        // perpendicularText={[true]}
        backgroundColors={[
          '#CAB8FF',
          '#8A53FF',
          '#7535FE',
          '#AA14F0',
          '#BC8CF2',
        ]}
        onStopSpinning={() => {
          setCitySpin(false);
          const newResult = [...randomResult];
          newResult[1] = data[prizeNumber].option;
          setRandomResult(newResult);
        }}
      />
      <button onClick={handleSpinClick}>시작하기</button>
    </div>
  );
}

export default RouletteSi;
