import React, { useEffect, useState } from 'react';
import './Survey.css';
import Intro from '../../components/Surveypage/Intro';
import Question from '../../components/Surveypage/Question';

function Survey() {
  const [pageIndex, setPageIndex] = useState(-1);
  const [images, setImages] = useState([]);

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

  function changeImages(pageIndex, imageNumber) {
    if (pageIndex + 1 <= images.length) {
      // 이미 한 번 선택했던 페이지로 돌아온 경우
      setImages(...images.filter((image) => image.id !== pageIndex), {
        id: pageIndex,
        imageId: imageNumber,
      });
    } else {
      console.log(images);
      const newImage = {
        id: pageIndex,
        imageId: imageNumber,
      };
      setImages(images.concat(newImage));
    }
    console.log(images);
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
          changeImages={changeImages}
        />
      )}
    </div>
  );
}

export default Survey;
