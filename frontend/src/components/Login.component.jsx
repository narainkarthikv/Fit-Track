import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/Login.component.css';

const Login = ({ isAuthenticated, setIsAuthenticated, setUserID }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setIsSubmitting(true);
  
      const response = await fetch('https://fit-track-epab.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userResponse = await fetch(`https://fit-track-epab.onrender.com/api/user/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!userResponse.ok) {
        throw new Error('Error fetching user details');
      }
  
      const users = await userResponse.json();
      setIsAuthenticated(true);
      const user = users.find(user => user.email === email);
      setUserID(user._id);
      navigate(`/${user._id}`);

    } catch (error) {
      setError('Invalid user or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      handleLogin(email, password);
    } else {
      setError('Please enter both user and password');
    }
  };

  return isAuthenticated ? (
    <Link to='/'></Link>
  ) : (
    <div className="Login">
      <form className="LoginForm" onSubmit={onSubmit}>
        <h1 className='loginform-header'>Login Page</h1>

        <div className="loginform-group">
          <label className='loginform-label' htmlFor="email">Email: </label>
          <input
            id="email"
            className='loginform-control'
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="loginform-group">
          <label className='loginform-label' htmlFor="password">Password: </label>
          <input
            id="password"
            className='loginform-control'
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="loginform-submit-container">
          <button className={`loginform-submit-btn ${isSubmitting ? 'loading' : ''}`} type="submit" disabled={isSubmitting}>
            {isSubmitting ? (<div className="loader">Loading...</div>) : 'Login'}
          </button>
        </div>

        {error && <div className="loginform-error-msg">{error}</div>}
        
        <div className="loginform-signup">
          Don't have an account? <Link className="loginform-signup-btn" to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
