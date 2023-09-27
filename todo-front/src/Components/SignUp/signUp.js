import React, { useEffect, useState } from 'react';
import '../../App.css'
import { loginStyle,backgroundStyle } from '../Css/Backround';
function SignUp() {

  return (
      <div style={loginStyle}>
      <div className="signup">
        <h1 id = 'heading'>Sign Up</h1>

        <div className='Fields'>
        <p style={{fontWeight:'bold'}}>Name:</p>
                <input
                type="text"
                name="Name"
              />
        <p style={{fontWeight:'bold'}}>Email:</p>
                <input
                type="Email"
                name="Email"
              />
        <p style={{fontWeight:'bold'}}>Password:</p>
                <input
                type="Password"
                name="Password"
              />
        <br/><br/><br/>
        <div className='Buttons'>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className='button' id='register'>Finish</button>
        </div>
        </div>
    </div>
    <div style={backgroundStyle}>
    </div>
    </div>
  );
}

export default SignUp;
