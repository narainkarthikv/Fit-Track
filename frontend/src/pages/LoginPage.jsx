import React, { useState, useCallback } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Login = ({ isAuthenticated, setIsAuthenticated, setUserID }) => {
  // Combined state for email and password
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backendURL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Handler for input changes
  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));
  }, []);

  // Function to handle login logic
  const handleLogin = useCallback(async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // First API call to login
      const loginResponse = await fetch(`${backendURL}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.message || 'Login failed');
      }

      // Second API call to fetch user details
      const userResponse = await fetch(`${backendURL}/api/user/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // If using token-based auth
        },
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || 'Error fetching user details');
      }

      const users = await userResponse.json();
      const user = users.find((user) => user.email === credentials.email);

      if (user) {
        setIsAuthenticated(true);
        setUserID(user._id);
        navigate(`/${user._id}`);
      } else {
        throw new Error('User not found');
      }
    } catch (err) {
      setError(err.message || 'Invalid user or password');
    } finally {
      setIsSubmitting(false);
    }
  }, [backendURL, credentials, navigate, setIsAuthenticated, setUserID]);

  // Handler for form submission
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { email, password } = credentials;

      if (email && password) {
        handleLogin();
      } else {
        setError('Please enter both email and password');
      }
    },
    [credentials, handleLogin]
  );

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-dark">
      <form
        className="p-5 bg-secondary text-white rounded-4 m-2"
        onSubmit={onSubmit}
      >
        <h1 className="text-center mb-4">Sign In</h1>

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
            value={credentials.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password Input */}
        <div className="form-group mb-4">
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>
          <input
            id="password"
            className="form-control bg-dark text-white border border-secondary"
            type="password"
            placeholder="Enter your Password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          className="btn btn-danger w-100"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div
              className="spinner-border spinner-border-sm text-light"
              role="status"
              aria-hidden="true"
            >
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Error Message */}
        {error && (
          <div className="text-danger text-center mt-3">{error}</div>
        )}

        {/* Signup Link */}
        <div className="text-center mt-4">
          <small className="text-dark">
            New to Fit-Track?{' '}
            <Link className="text-primary" to="/signup">
              Sign Up Now
            </Link>
          </small>
        </div>
      </form>
    </div>
  );
};

export default Login;
