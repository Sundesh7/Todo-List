import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { loginStyle,backgroundStyle } from '../Css/Backround';
import signinUser from './signinService';

function Login() {
    // Initialize task state with default values
    const [Login, setLogin] = useState({  
      Email: '',
      Password: '',
    });
    const handleInputChange = (e) => {
      const {name,value } = e.target;
      // Handle checkbox separately
      console.log(name,value);  
        setLogin({
          ...Login,
          [name]: value,
        });
      }
  return (
    <div style={loginStyle}>
      <div className="login">
        <h1 id="heading">Sign In</h1>

        <div className="Fields">
          <p style={{ fontWeight: 'bold' }}>Email:</p>
          <input type="email" name="Email" value={Login.Email} onChange={handleInputChange}/>

          <p style={{ fontWeight: 'bold' }}>Password:</p>
          <input type="password" name="Password" value={Login.Password} onChange={handleInputChange}/>

          <br /><br />
          <div className='Buttons'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;<button className='button' onClick={()=>signinUser(Login)}>Sign In</button> &nbsp;&nbsp;&nbsp;
            
            {/* Use Link to navigate to the signup page */}
            <Link to="/signup" className="button" id="signup" >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Apply the background styles to create the blur effect */}
      <div style={backgroundStyle}></div>
    </div>
  );
}

export default Login;
