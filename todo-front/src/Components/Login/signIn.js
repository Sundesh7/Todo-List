import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginStyle, backgroundStyle } from '../Css/Backround';
import signinUser from './signinService';

function Login() {
  const [Login, setLogin] = useState({
    Email: '',
    Password: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...Login,
      [name]: value,
    });
  }
  const [emailExists, setemailExists] = useState('');

  const handleSignIn = async (login) => {
    const response = await signinUser(login);
    if (response === 400) {
      setemailExists('Wrong Password');
    } else if (response === 404) {
      setemailExists('User does not exist');
    }
  };

  const [emailError, setEmailError] = useState('');
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      setEmailError('Email is invalid');
    } else {
      setEmailError('');
    }
  };
  return (
    <div style={loginStyle}>
      <div className="login">
        <h1 id="heading">Sign In</h1>
        {emailExists &&
          <div style={{ backgroundColor: 'black', borderRadius: '4px' }}>
            <p style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>{emailExists}</p>
          </div>
        }
        <div className="Fields">
          <p style={{ fontWeight: 'bold' }}>Email:</p>
          <input type="email"
            name="Email"
            value={Login.Email}
            onChange={(e) => {
              handleInputChange(e);
              validateEmail(e.target.value);
            }}
          />
          {emailError && (
            <p style={{ color: 'white', fontSize: '15px', fontWeight: 'bold' }}>ⓧ {emailError}</p>
          )}
          <p style={{ fontWeight: 'bold' }}>Password:</p>
          <input type="Password" name="Password" value={Login.Password} onChange={handleInputChange} />

          <br /><br />
          <div className='Buttons'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className='button'
              onClick={() => handleSignIn(Login)}
              disabled={emailError !== ''}
            >
              Sign In
            </button> &nbsp;&nbsp;&nbsp;

            <Link to="/signup" className="button" id="signup" >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div style={backgroundStyle}></div>
    </div>
  );
}

export default Login;
