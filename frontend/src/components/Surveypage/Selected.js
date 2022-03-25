import React from 'react';

function Selected({ selected }) {
  return (
    <div>
      {selected.map((ele, idx) => {
        return <div key={idx}>{ele}</div>;
      })}
    </div>
  );
}

export default Selected;
