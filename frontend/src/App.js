import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './pages/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');

  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserID('');
    navigate('/'); // Redirect to root route after logging out
  };

  return (
    <div className="App">
      {isLoggedIn && <NavBar user={userID} handleLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <Login
                isAuthenticated={isLoggedIn}
                setIsAuthenticated={setIsLoggedIn}
                setUserID={setUserID}
              />
            )
          }
        />
        <Route
          exact
          path={`/${userID}`}
          element={isLoggedIn ? <Home user={userID} /> : <Navigate to="/login" />}
        />
        <Route path={`/${userID}/edit`} element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add a redirect to root for any undefined routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
