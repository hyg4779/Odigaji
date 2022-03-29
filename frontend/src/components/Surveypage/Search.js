import React from 'react';
import './TourList.css';

function Search({ words, setInputWord, setWords }) {
  function clickItem(word) {
    setInputWord(word);
    setWords([]);
  }

  return (
    <div className="Tourlist-input-list">
      {words.map((word, idx) => {
        return (
          <div key={idx} onClick={() => clickItem(word)}>
            {word}
          </div>
        );
      })}
    </div>
  );
}

export default Search;
