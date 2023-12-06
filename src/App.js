import './App.css';
import Login from './components/login/Login';
import Data from './components/data/Data';
import ErrorPage from './components/errors/ErrorPage';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/data' element={<Data />}/>
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
