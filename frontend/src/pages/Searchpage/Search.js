import React from 'react';
import SearchMap from '../../components/Searchpage/SearchMap';
import SearchContent from '../../components/Searchpage/SearchContent';
import './Search.css';

function Search() {
  return (
    <div className="Search">
      <SearchMap />
      <SearchContent />
    </div>
  );
}

export default Search;
