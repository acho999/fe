import './App.scss';
import Login from './components/login/Login';
import Data from './components/data/Data';
import ErrorPage from './components/errors/ErrorPage';
import { useState, createContext } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export const AppContext = createContext();

function App() {

  const [token, setToken] = useState("")

  return (
    <AppContext.Provider value = {{token, setToken}}>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} setToken={setToken}/>
          <Route path='/data' element={<Data />} token={token}/>
          <Route path='*' element={<ErrorPage />}/>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
