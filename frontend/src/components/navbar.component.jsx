import React from 'react';
import { FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './css/navbar.component.css';

const Navbar = ({ user }) => { 
 
  return (
    <div className="navbar">
      <Link className="nav-brand" to={`/${user}`}>
        <FaDumbbell className='icon'/> Fit Track
      </Link>
      <div className="nav-profile">
        <FaUserAlt className="profile-icon" />
        <div className="dropdown">
          <Link className="dropdown-item" to={`/${user}/edit`}><span>Edit Profile</span></Link>
          <a href='/login' className="dropdown-item"><span>Logout</span></a> 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
