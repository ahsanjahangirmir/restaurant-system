import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Landing.css'; // Make sure the path to your CSS file is correct

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // State hooks for the login form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State hooks for the sign-up form
  const [name, setName] = useState('');
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [error, setError] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        username: loginUsername,
        password: loginPassword
      });
      // Handle successful login
      console.log(response.data);
      // Redirect to the home page after successful login
      if (response.data.user.role == "Customer")
      {
        navigate('/customer-home', { state: { username: loginUsername}});
      }
      else{
        navigate('/emp-home', { state: { username: loginUsername}});
      }
    } catch (error) {
      // Handle login error
      console.error('Error:', error.response.data);
      setError('Invalid username or password');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (signUpPassword !== reEnterPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/users/signup', {
        name: name,
        username: signUpUsername,
        password: signUpPassword
      });
      // Handle successful sign-up
      console.log(response.data);
      // Redirect to the home page after successful sign-up
      
      navigate('/customer-home', { state: { username: signUpUsername } });
    } catch (error) {
      // Handle sign-up error
      console.error('Error:', error.response.data);
      setError(error.response.data.error || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <div className="container">
      <div style={{ minHeight: '100vh', paddingTop: '20px' }}>
        {/* Material UI header component */}
        <Container maxWidth="md">
          <Typography variant="h3" align="center" color={'#EEEEEE'} letterSpacing={'5px'} fontFamily={'Courier New'} marginTop={'50px'}>
            Restaurant App 
          </Typography>
        </Container>

        {/* Centered forms with space between them */}
        <Container maxWidth="md" style={{ marginTop: '0px', display: 'flex', justifyContent: 'space-around' }}>
          <div className="form-container" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Login Form */}
            <div className="login-box" style={{ marginBottom: '20px' }}>
              <form onSubmit={handleLoginSubmit}>
                <div className="user-box">
                  <input
                    type="text"
                    name="loginUsername"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    required
                  />
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input
                    type="password"
                    name="loginPassword"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <label>Password</label>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="center">
                  <button type="submit">LOGIN</button>
                  <span></span>
                </div>
              </form>
            </div>

            {/* Sign Up Form */}
            <div className="reg-box">
              <form onSubmit={handleSignUpSubmit}>
                <div className="userreg-box">
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label>Name</label>
                </div>
                <div className="userreg-box">
                  <input
                    type="text"
                    name="signUpUsername"
                    value={signUpUsername}
                    onChange={(e) => setSignUpUsername(e.target.value)}
                    required
                  />
                  <label>Username</label>
                </div>
                <div className="userreg-box">
                  <input
                    type="password"
                    name="signUpPassword"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                  <label>Password</label>
                </div>
                <div className="userreg-box">
                  <input
                    type="password"
                    name="reEnterPassword"
                    value={reEnterPassword}
                    onChange={(e) => setReEnterPassword(e.target.value)}
                    required
                  />
                  <label>Re-enter Password</label>
                </div>
                {error && <div className="error-message">{error}</div>}
                <div className="center">
                  <button type="submit">SIGN UP AS CUSTOMER</button>
                  <span></span>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
