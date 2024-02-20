import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell } from 'react-icons/fa';
import { RiAddCircleLine, RiUserAddLine, RiUserLine } from 'react-icons/ri';
import './Navbar.css';

const Navbar = () => {
  return (
    // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
    //   <a  className="navbar-brand" href="https://enchanting-vacherin-0b9f11.netlify.app/">
    //     <FaDumbbell className="icon" /> Fit-Track
    //   </a>
    //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav mr-auto">
    //       <li className="nav-item">
    //         <a exact className="nav-link" href="https://enchanting-vacherin-0b9f11.netlify.app/">
    //           <FaDumbbell className="icon" /> Exercises List
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="https://enchanting-vacherin-0b9f11.netlify.app/create">
    //           <RiAddCircleLine className="icon" /> Create Exercise Log
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="https://enchanting-vacherin-0b9f11.netlify.app/user">
    //           <RiUserAddLine className="icon" /> Create User
    //         </a>
    //       </li>
    //       <li className="nav-item">
    //         <a className="nav-link" href="https://enchanting-vacherin-0b9f11.netlify.app/users">
    //           <RiUserLine className="icon" /> Users
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </nav>
    <div className='navbar navbar-dark bg-dark navbar-expand-lg'>
        <ul className='navbar-nav mr-auto'>
          <Link to='https://enchanting-vacherin-0b9f11.netlify.app/' className='nav-link'> <FaDumbbell className="icon" /> Exercise-Tracker </Link>
          <Link to='https://enchanting-vacherin-0b9f11.netlify.app/' className='nav-link'>  <FaDumbbell className="icon" /> Exercises List </Link>
          <Link to='https://enchanting-vacherin-0b9f11.netlify.app/create' className='nav-link'> <RiAddCircleLine className="icon" /> Create Exercise Log </Link>
          <Link to='https://enchanting-vacherin-0b9f11.netlify.app/user' className='nav-link'> <RiUserAddLine className="icon" /> Create User </Link>
          <Link to='https://enchanting-vacherin-0b9f11.netlify.app/users' className='nav-link'>  <RiUserLine className="icon" /> Users </Link>
        </ul>
    </div>
  );
};

export default Navbar;
