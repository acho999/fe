
import { useState, useEffect } from 'react';

function Login() {

  const [response, setResponse] = useState(null);
  const [credentials, setCredentials] = useState({});

  useEffect(()=>{
    console.log(JSON.stringify(credentials));
  },[credentials])

  function handleOnSubmit(event) {
    event.preventDefault();
    console.log('uname - ' + event.currentTarget.elements.uname.value);
    console.log('pass - ' + event.currentTarget.elements.pass.value);
    debugger;
    setCredentials({pass: event.currentTarget.elements.uname.pass, uname: event.currentTarget.elements.uname.value});
    console.log(JSON.stringify({ userName: credentials.uname, password: credentials.pass}));
      fetch(
        //`https://jsonplaceholder.typicode.com/posts?title_like=${query}`
        'http://localhost:8080/users/login', {
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify({ username: event.currentTarget.elements.uname.value, password: event.currentTarget.elements.pass.value}),
        headers: {'Content-Type': 'application/json;charset=utf-8','Access-Control-Allow-Origin':'*','Accept': 'application/json, text/plain, */*'},
      })
      .then(function(resp) {
        console.log('then' + JSON.stringify(resp.json()));
        return resp.json()
      })
      .then(function(data) {
        setResponse(data);
        console.log('Data' + JSON.stringify(data));
      })
      .catch(function(error) {
        console.log(error)
      });
  };

  return (
    <div className="form">
      <form onSubmit={handleOnSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required/>
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  )
}

export default Login