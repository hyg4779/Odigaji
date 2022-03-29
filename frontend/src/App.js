import './App.css';
import { Outlet } from 'react-router-dom';
import Nav from './pages/Mainpage/Nav';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
