import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/navbar.component';
import HomePage from './components/HomePage.component';
import Login from './components/Login.component';
import SignUp from './components/SignUp.component';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');

  return (
    <Router>
      <div className='App'>
        {isLoggedIn && <Navbar user={userID} />}
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
