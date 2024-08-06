import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const backendURL = process.env.REACT_APP_API_URL;
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
      const response = await axios.post(`${backendURL}/api/user/add`, formData);
      console.log('Response from server:', response.data);
      navigate('/login');
    } catch (error) {
      setError('Failed to sign up');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="container-fluid">
      <form className="p-3 form-outline position-absolute top-50 start-50 translate-middle border border-3 border-primary rounded-5 text-center font-weight-bold" onSubmit={handleSubmit}>
        <h2 className='signupform-header mb-4'>Sign Up</h2>

        <div className="form-group row mb-3">
          <label className='col-sm-4 col-form-label' htmlFor="username">Username:</label>
          <div className="col-sm-8">
            <input
              id="username"
              className='form-control'
              type="text"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row mb-3">
          <label className='col-sm-4 col-form-label' htmlFor="email">Email:</label>
          <div className="col-sm-8">
            <input
              id="email"
              className='form-control'
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row mb-3">
          <label className='col-sm-4 col-form-label' htmlFor="password">Password:</label>
          <div className="col-sm-8">
            <input
              id="password"
              className='form-control'
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group row mb-4">
          <label className='col-sm-4 col-form-label' htmlFor="confirmPassword">Confirm Password:</label>
          <div className="col-sm-8">
            <input
              id="confirmPassword"
              className='form-control'
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <div className="text-danger text-center mb-3">Error Found</div>}

        <button className='btn btn-primary w-100 mb-3' type='submit'>Submit</button>

        <div className="text-center">
          Already have an account? <Link className="loginform-signup-btn" to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
