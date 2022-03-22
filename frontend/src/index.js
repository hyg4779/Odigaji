import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './pages/Mainpage/Main';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import TravelDetail from './pages/Travelpage/TravelDetail';
import Local from './pages/Travelpage/Local';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="" element={<Main />} />
        <Route path="local" element={<Local />} />
        <Route path="local/travelDetail" element={<TravelDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
