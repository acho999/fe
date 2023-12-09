import {Link, useNavigate} from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../App';
import "./Login.scss"

function Login(props) {
  const navigate = useNavigate();
  const {setToken} = useContext(AppContext);
  // const [response, setResponse] = useState(null);
  // const [credentials, setCredentials] = useState({});

  // useEffect(()=>{
  //   console.log(JSON.stringify(credentials));
  // },[credentials])

  async function handleOnSubmit(event) {
    event.preventDefault();
    const newCr = {username: event.currentTarget.elements.uname.value, password: event.currentTarget.elements.pass.value}
      const resp = await fetch(
        //`https://jsonplaceholder.typicode.com/posts?title_like=${query}`
        'http://localhost:8080/users/login', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(newCr),
        headers: {'Content-Type': 'application/json;charset=utf-8','Access-Control-Allow-Origin':'*','Accept': 'application/json, text/plain, */*'},
      });

      const jwt = resp.headers.get('Authorization');
      setToken(jwt);
      localStorage.setItem('token', 'Bearer ' + jwt);

      if(jwt){
        navigate('/data');
      }
  };

  return (
    <div className="form">
      <form onSubmit={handleOnSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" className='unameInput' required/>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" className='passInput' name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" className='loginSubmit'/>
        </div>
      </form>
    </div>
  )
}

export default Login