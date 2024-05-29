import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstPage from './components/FirstPage';
import Navbar from './components/Navbar';
import { Routes,Route,Link} from "react-router-dom";
import Detail from './components/Detail';
import AdminPage from './components/AdminPage';
import AlbumCreate from './components/AlbumCreate';
import AlbumEdit from './components/AlbumEdit';
import { UserProvider } from './components/UserContext';
function App() {
  return (
    <UserProvider>
    <div className="App">
      <Navbar/>
      <Routes>
      <Route path="/" element={ <FirstPage/>}/>
      <Route path="/Admin" element={ <AdminPage/>}/>
      <Route path="/Create" element={ <AlbumCreate/>}/>
      <Route path="Detail/:id" Component={Detail} />
      <Route path="Edit/:id" Component={AlbumEdit} />
      </Routes>
    </div>
    </UserProvider>
  );
}

export default App;
