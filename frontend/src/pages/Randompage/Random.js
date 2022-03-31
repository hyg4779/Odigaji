import React, { useState } from 'react';
import './Random.css';
import RouletteDo from '../../components/Randompage/RouletteDo';
import RouletteSi from '../../components/Randompage/RouletteSi';
import { provinceCities } from '../../components/Randompage/Randomaxios';

function Random() {
  const [randomResult, setRandomResult] = useState(['어디로', '갈까요']);
  const [cities, setCities] = useState([]);
  const [provinceSpin, setProvinceSpin] = useState(false);
  const [citySpin, setCitySpin] = useState(false);

  function selectProvince(provinceId) {
    provinceCities(provinceId)
      .then((response) => {
        console.log(response.data);
        setCities(response.data);
        console.log(cities);
      })
      .catch((error) => {
        console.log(error);
      });
    setCities(provinceId);
  }

  return (
    <div className="Random">
      <div className="Random-header">랜덤랜덤</div>
      <div className="Random-content">
        <RouletteDo
          selectProvince={selectProvince}
          provinceSpin={provinceSpin}
          setProvinceSpin={setProvinceSpin}
          setRandomResult={setRandomResult}
        />
        <RouletteSi
          cities={cities}
          provinceSpin={provinceSpin}
          citySpin={citySpin}
          setCitySpin={setCitySpin}
          randomResult={randomResult}
          setRandomResult={setRandomResult}
        />
      </div>
      <div>
        {randomResult[0]} {randomResult[1]}
      </div>
    </div>
  );
}

export default Random;
