import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nava from './components/Nava';
import Combine from './components/Combine';
import Login from './components/Login';
import Signup from './components/Signup';
import Notestate from './components/Notestate';
import Aleert from './components/Aleert'


function App () {
  return (
    <>
    <Notestate>
    <Router><Nava/>
    <Aleert />
   <Routes>
    <Route path='/home' element={  <>
    <Combine/>
    </> } />
    
    <Route path='/' element={<Login/> }/>
          <Route path='/signup' element={<Signup/> }/>
       </Routes>
   </Router>
   </Notestate>
   </>
  );
}

export default App;