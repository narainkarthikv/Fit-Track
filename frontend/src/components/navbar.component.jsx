import React from 'react';
import { FaDumbbell } from 'react-icons/fa';
import { RiUserLine } from 'react-icons/ri';
import './css/navbar.component.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <a className="nav-board" href="https://narainkarthikv-fit-track.netlify.app/">
        <FaDumbbell className='icon'/> Fit Track
      </a>
      <a className="nav-items" href="https://narainkarthikv-fit-track.netlify.app/">
        <FaDumbbell className='icon' /> <span className="nav-hide">Exercises</span>
      </a>
      <a className="nav-items" href="https://narainkarthikv-fit-track.netlify.app/users">
        <RiUserLine className='icon' />  <span className="nav-hide">Users</span>
      </a>
    </div>
  );
};

export default Navbar;