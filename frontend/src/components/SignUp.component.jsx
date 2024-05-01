import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/SignUp.component.css'; 

const SignUp = () => {

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.password !== formState.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { confirmPassword, ...formData } = formState;

    try {
      const response = await axios.post('https://fit-track-epab.onrender.com/api/user/add', formData);
      console.log('Response from server:', response.data);
      navigate('/login'); 
    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <form className='SignUp' onSubmit={handleSubmit}>
      <h2 className='signupform-header'>Sign Up</h2>
      <div className='signupform-group'>
        <label className='signupform-label'>Username:</label>
        <input
          id="username"
          className='signupform-control'
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Email: </label>
        <input
          id="email"
          className='signupform-control'
          type="text"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Password:</label>
        <input
          id="password"
          className='signupform-control'
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
      </div>

      <div className='signupform-group'>
        <label className='signupform-label'>Confirm Password:</label>
        <input
          id="confirmPassword"
          className='signupform-control'
          type="password"
          name="confirmPassword"
          value={formState.confirmPassword}
          onChange={handleChange}
        />
      </div>
        {error && <h1>Error Found</h1>}
      <div className='signupform-submit-container'>
        <button className='signupform-submit-btn' type='submit'>Submit</button>
      </div>

      <div className="loginform-signup">
          Already have an account? <Link className="loginform-signup-btn" to="/login">Login</Link>
        </div>
    </form>
  );
};

export default SignUp;
