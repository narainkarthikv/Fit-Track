import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaRunning, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import ProgressBar from 'react-bootstrap/ProgressBar';

const SignUp = () => {
  const backendURL = process.env.REACT_APP_API_URL;
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [progress, setProgress] = useState(0); 
  const [message, setMessage] = useState('Let’s Get Started!'); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle input change and update progress
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));

    // Calculate progress based on the number of fields filled
    const filledFields = Object.values({ ...formState, [name]: value }).filter(
      (field) => field !== ''
    ).length;
    const newProgress = (filledFields / 4) * 100;
    setProgress(newProgress);
    updateMessage(newProgress);
  };

  // Update message based on progress
  const updateMessage = (progress) => {
    if (progress === 0) setMessage("Let's Get Started!");
    else if (progress <= 25) setMessage('Warming Up!');
    else if (progress <= 50) setMessage('Hitting Your Stride!');
    else if (progress <= 75) setMessage('Almost There!');
    else setMessage('Final Stretch!');
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
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#d3d3d3' }}>
      <form
        className="p-5 bg-light rounded shadow-lg text-center"
        style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}
        onSubmit={handleSubmit}
      >
        {/* Icon and Title */}
        <div className="mb-4">
          <FaRunning size={50} color="#ff6f61" aria-hidden="true" />
          <h1 className="mt-2" style={{ color: '#ff6f61' }}>Join Fit-Track</h1>
          <p className="text-muted">Your fitness journey starts here!</p>
        </div>

        {/* Progress Bar */}
        <ProgressBar now={progress} className="mb-3" animated style={{ height: '10px', borderRadius: '5px' }} />
        <div className="text-muted mb-3">{message}</div>

        {/* Username Input */}
        <div className="form-group mb-3">
          <label htmlFor="username" className="visually-hidden">
            Username
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaUser />
              </span>
            </div>
            <input
              id="username"
              className="form-control border-secondary"
              type="text"
              placeholder="Username"
              name="username"
              value={formState.username}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Username input"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="form-group mb-3">
          <label htmlFor="email" className="visually-hidden">
            Email
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaEnvelope />
              </span>
            </div>
            <input
              id="email"
              className="form-control border-secondary"
              type="email"
              placeholder="Email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Email input"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="form-group mb-3">
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaLock />
              </span>
            </div>
            <input
              id="password"
              className="form-control border-secondary"
              type="password"
              placeholder="Password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Password input"
            />
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="visually-hidden">
            Confirm Password
          </label>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <FaLock />
              </span>
            </div>
            <input
              id="confirmPassword"
              className="form-control border-secondary"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={handleChange}
              required
              aria-required="true"
              aria-label="Confirm password input"
            />
          </div>
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button className="btn btn-danger btn-block mb-4" type="submit">
          Start Your Journey
        </button>

        <div className="text-muted small">
          Already have an account?{' '}
          <Link to="/login" className="text-primary" aria-label="Login">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
