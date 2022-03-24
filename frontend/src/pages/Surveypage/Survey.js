import React, { useEffect, useState } from 'react';
import './Survey.css';
import Intro from '../../components/Surveypage/Intro';
import Question from '../../components/Surveypage/Question';

function Survey() {
  const [pageIndex, setPageIndex] = useState(-1);
  const [surveys, setSurveys] = useState([]);

  let leftLoc = String(22.5 + pageIndex * 7.5) + 'vw';

  function nextPage() {
    setPageIndex(pageIndex + 1);
  }

  function beforePage() {
    setPageIndex(pageIndex - 1);
  }

  function startPage() {
    setPageIndex(-1);
    setSurveys([]);
  }

  function changeSurveys(pageIndex, imageName) {
    const newSurvey = {
      id: pageIndex,
      imageName: imageName,
    };
    if (pageIndex + 1 <= surveys.length) {
      // 이미 한 번 선택했던 페이지로 돌아온 경우
      const beforeSurveys = surveys.filter((survey) => survey.id !== pageIndex);
      setSurveys(beforeSurveys.concat(newSurvey));
    } else {
      console.log('새로운 설문 추가');
      setSurveys(surveys.concat(newSurvey));
    }
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
          surveys={surveys}
          nextPage={nextPage}
          beforePage={beforePage}
          startPage={startPage}
          changeSurveys={changeSurveys}
        />
      )}
    </div>
  );
}

export default Survey;
