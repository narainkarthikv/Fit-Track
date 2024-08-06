import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ isAuthenticated, setIsAuthenticated, setUserID }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const userResponse = await fetch(`${backendURL}/api/user/`, {
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
    <div className="container-fluid">
      <form className="p-3 form-outline position-absolute top-50 start-50 translate-middle border border-3 border-primary rounded-5 text-center font-weight-bold" onSubmit={onSubmit}>
        <h1 className='loginform-header text-center mb-4'>Login Page</h1>

        <div className="form-group row mb-3">
          <label className='col-sm-4 col-form-label' htmlFor="email">Email:</label>
          <div className="col-sm-8">
            <input
              id="email"
              className='form-control'
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group row mb-4">
          <label className='col-sm-4 col-form-label' htmlFor="password">Password:</label>
          <div className="col-sm-8">
            <input
              id="password"
              className='form-control'
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className={`btn btn-primary w-100 ${isSubmitting ? 'loading' : ''}`} type="submit" disabled={isSubmitting}>
          {isSubmitting ? (<div className="spinner-border spinner-border-sm text-light" role="status"><span className="sr-only">Loading...</span></div>) : 'Login'}
        </button>

        {error && <div className="loginform-error-msg mt-3 text-danger text-center">{error}</div>}

        <div className="text-center mt-3">
          Don't have an account? <Link className="loginform-signup-btn" to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>


  );
};

export default Login;
