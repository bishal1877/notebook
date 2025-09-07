import React from 'react'
import Notes from './components/Notes';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Addnotes from './components/Addnotes';
import Nava from './components/Nava';
import Combine from './components/Combine';
import Login from './components/Login';
import Signup from './components/Signup';
import Notestate from './Context/Notestate';


function App () {
  return (
    <>
    <Router>
    <Nava/>
   <Routes>
    <Route path='/' element={  <>
    <Combine/>
    </> } />
    
    <Route path='/login' element={<Login/> }/>
          <Route path='/signup' element={<Signup/> }/>
       </Routes>
   </Router>
   </>
  );
}

export default App;