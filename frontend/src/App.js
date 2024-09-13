import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './pages/NavBar';
import HomePage from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');
  
  return (
    <Router>
      <div className='App'>
        {isLoggedIn && <NavBar user={userID} />}
        <Routes>
          <Route path='/login' element={isLoggedIn ? <HomePage /> : <Login isAuthenticated={isLoggedIn} setIsAuthenticated={setIsLoggedIn} setUserID={setUserID} />} />
          <Route exact path={`/${userID}`} element={isLoggedIn ? <HomePage user={userID} /> : <Navigate to='/login' />} />
          <Route path={`/${userID}/edit`} element={<SignUp />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
