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
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
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
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <form
        className="p-5 bg-secondary text-white rounded-4 m-2"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mb-4">Sign Up</h1>

        {/* Username Input */}
        <div className="form-group mb-3">
          <label htmlFor="username" className="visually-hidden">
            Username
          </label>
          <input
            id="username"
            className="form-control bg-dark text-white border border-secondary"
            type="text"
            placeholder="Enter your Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email Input */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <input
            id="email"
            className="form-control bg-dark text-white border border-secondary"
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <input
            id="password"
            className="form-control bg-dark text-white border border-secondary"
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password Input */}
        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="visually-hidden">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            className="form-control bg-dark text-white border border-secondary"
            type="password"
            placeholder="Confirm your Password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <div className="text-danger text-center mb-3">{error}</div>}

        <button className="btn btn-danger w-100" type="submit">Sign Up</button>

        <div className="text-center mt-4">
          <small className="text-dark">
            Already have a Fit-Track account?{' '}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
