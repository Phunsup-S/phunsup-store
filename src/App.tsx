import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import Navbar from './components/Navbar';
import { Routes,Route,Link} from "react-router-dom";
import Detail from './components/Detail';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={ <FirstPage/>}/>
      <Route path="Detail/:id" Component={Detail} />
      </Routes>
    </div>
  );
}

export default App;
