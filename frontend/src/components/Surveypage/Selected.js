import React from 'react';

function Selected({ selected }) {
  return (
    <div>
      {selected.map((ele, idx) => {
        return (
          <>
            <div key={idx}>{ele}</div>
            <input type="range" min="1" max="5"></input>
            <button>X</button>
          </>
        );
      })}
    </div>
  );
}

export default Selected;
