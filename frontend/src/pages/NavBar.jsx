import React from 'react';
import { FaDoorOpen, FaPencilAlt, FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex flex-row">
      <BrandLink user={user} />
      <div className="ml-auto d-flex">
        <NavDropdown user={user} handleLogout={handleLogout} />
      </div>
    </nav>
  );
};

const BrandLink = ({ user }) => (
  <Link className="navbar-brand" to={`/${user}`}>
    <FaDumbbell className='mb-1' /> Fit Track
  </Link>
);

const NavDropdown = ({ user, handleLogout }) => (
  <ul className="navbar-nav">
    <li className="nav-item dropdown">
      <button
        className="nav-link dropdown-toggle btn btn-dark"
        id="navbarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <FaUserAlt />
      </button>
      <ul className="dropdown-menu dropdown-menu-end text-center bg-dark" aria-labelledby="navbarDropdown">
        <DropdownItem to={`/${user}/edit`} icon={<FaPencilAlt />} label="Edit Profile" className="text-primary" />
        <li>
          <button className="dropdown-item font-weight-bold btn text-danger" onClick={handleLogout}>
            <FaDoorOpen /> Logout
          </button>
        </li>
      </ul>
    </li>
  </ul>
);

const DropdownItem = ({ to, icon, label, className }) => (
  <Link className={`dropdown-item font-weight-bold btn ${className}`} to={to}>
    {icon} {label}
  </Link>
);

export default NavBar;
