import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom'; // Import useParams

function login() {
  return (
      <div className="login">
        <h1 id = 'heading'>Sign In</h1>

        <div className='Fields'>
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
        <br/><br/>
        <div className='Buttons'>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;<button className='button'>Sign In</button> &nbsp;&nbsp;&nbsp;
        <button className='button'>Sign Up</button>
        </div>
        </div>
    </div>
  );
}

export default login;
