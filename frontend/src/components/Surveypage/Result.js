import React, { useState } from 'react';
import Loading from './Loading';
import ResultList from './ResultList';
import './Result.css';

function Result({ surveyResult }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="Result">
      {loading && <Loading setLoading={setLoading} />}
      {!loading && <ResultList surveyResult={surveyResult} />}
    </div>
  );
}

export default Result;
