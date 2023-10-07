import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'
import { loginStyle, backgroundStyle } from '../Css/Backround';
import registerUser from './signupService';


function SignUp() {

  const [Login, setLogin] = useState({
    Email: '',
    Password: '',
    Name: '',
  });
  const [emailExists, setemailExists] = useState('');

  const handleSignUp = async (login) => {
    const response = await registerUser(login);
    if (response === 400) {
      setemailExists('User with this email already exists !!');
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...Login,
      [name]: value,
    });
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
      <div className="signup">
        <h1 id='heading'>Sign Up</h1>

        {emailExists &&
          <div style={{ backgroundColor: 'black', borderRadius: '4px' }}>
            <p style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>{emailExists}</p>
          </div>
        }
        <div className='Fields'>
          <p style={{ fontWeight: 'bold' }}>Full Name:</p>
          <input
            type="text"
            name="Name"
            value={Login.Name}
            onChange={handleInputChange}
          />
          <p style={{ fontWeight: 'bold' }}>Email:</p>
          <input
            autoComplete="email"
            type="email"
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
          <input
            type="password"
            name="Password"
            value={Login.Password}
            onChange={handleInputChange}
          />
          <br /><br /><br />

          <div className='Buttons'>

            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className='button'
              id='register'
              onClick={() => handleSignUp(Login)}
              disabled={emailError !== ''}>
              Submit</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/signin" className="button" id="signin" >
              Back
            </Link>
          </div>

        </div>
      </div>
      <div style={backgroundStyle}>
      </div>
    </div>
  );
}

export default SignUp;
