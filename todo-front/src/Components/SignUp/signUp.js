import React, { useEffect, useState } from 'react';
import '../../App.css'
import { loginStyle,backgroundStyle } from '../Css/Backround';
import registerUser from './signupService';


function SignUp() {
  
    // Initialize task state with default values
    const [Login, setLogin] = useState({  
      Email: '',
      Password: '',
      Name: '',
    });
    const handleInputChange = (e) => {
      const {name,value } = e.target;
      // Handle checkbox separately
      console.log(name,value);  
        setLogin({
          ...Login,
          [name]: value,
        });
    };
  return (
      <div style={loginStyle}>
      <div className="signup">
        <h1 id = 'heading'>Sign Up</h1>

        <div className='Fields'>
        <p style={{fontWeight:'bold'}}>Full Name:</p>
                <input
                type="text"
                name="Name"
                value={Login.Name}
                onChange={handleInputChange}
              />
        <p style={{fontWeight:'bold'}}>Email:</p>
                <input
                type="Email"
                name="Email"
                value={Login.Email}
                onChange={handleInputChange}
              />
        <p style={{fontWeight:'bold'}}>Password:</p>
                <input
                type="Password"
                name="Password"
                value={Login.Password}
                onChange={handleInputChange}
              />
        <br/><br/><br/>
        <div className='Buttons'>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='button' id='register' onClick={()=>registerUser(Login)}>Finish</button>
        </div>
        </div>
    </div>
    <div style={backgroundStyle}>
    </div>
    </div>
  );
}

export default SignUp;
