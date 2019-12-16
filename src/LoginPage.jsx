import React from 'react';

function LoginPage(props) {
  return (
    <form onSubmit={props.onLogin}>
      <h1>Please enter the username and password</h1>
      <div><input type="text" placeholder="Enter Username" name = "username" /></div>
      <div><input type="password" placeholder=" Enter password" name = "password" /></div>
      <div><input type="submit" value="Search"/></div>
      {props.error && <div className="error">{props.error}</div>}         
    </form>
  );
}

export default LoginPage;