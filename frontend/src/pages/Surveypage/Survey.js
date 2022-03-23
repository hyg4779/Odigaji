import React, { useEffect, useState } from 'react';
import './Survey.css';
import Intro from '../../components/Surveypage/Intro';
import Question from '../../components/Surveypage/Question';

function Survey() {
  const [pageIndex, setPageIndex] = useState(-1);
  let leftLoc = String(22.5 + pageIndex * 7.5) + 'vw';

  function nextPage() {
    setPageIndex(pageIndex + 1);
  }

  function beforePage() {
    setPageIndex(pageIndex - 1);
  }

  function startPage() {
    setPageIndex(-1);
  }

  useEffect(() => {
    setPageIndex(-1);
  }, []);

  return (
    <div className="Survey">
      <div className="Survey-bar" />
      <div
        className="Survey-progress"
        style={{ position: 'absolute', left: leftLoc }}
      />
      {pageIndex === -1 && <Intro nextPage={nextPage} />}
      {pageIndex !== -1 && (
        <Question
          pageIndex={pageIndex}
          nextPage={nextPage}
          beforePage={beforePage}
          startPage={startPage}
        />
      )}
    </div>
  );
}

export default Survey;
