import React, { useEffect, useState } from 'react';
import SearchMap from '../../components/Searchpage/SearchMap';
import SearchContent from '../../components/Searchpage/SearchContent';
import { provinceCities } from '../../components/Randompage/Randomaxios';
import './Search.css';

function Search() {
  const [cityData, setCityData] = useState([]);
  const [cityShow, setCityShow] = useState(false);
  const [cityId, setCityId] = useState(-1);

  function cityMap(id) {
    setCityId(id);
    provinceCities(id)
      .then((response) => {
        console.log('도시 정보 받아오기 성공', response.data);
        setCityData(response.data);
      })
      .catch((error) => {
        console.log('도시 정보 받아오기 실패', error);
      });
    if (id !== 100) {
      setCityShow(true);
    } else {
      setCityShow(false);
    }
  }

  function backWhole() {
    setCityShow(false);
    setCityData([]);
    setCityId(-1);
  }

  useEffect(() => {}, [cityId, cityData]);

  return (
    <div className="Search">
      <SearchMap
        cityId={cityId}
        cityData={cityData}
        cityShow={cityShow}
        cityMap={cityMap}
        setCityShow={setCityShow}
        backWhole={backWhole}
      />
      <SearchContent
        cityId={cityId}
        cityMap={cityMap}
        cityData={cityData}
        backWhole={backWhole}
      />
    </div>
  );
}

export default Search;
