import React from 'react';
import { FaDoorOpen, FaPencilAlt, FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex flex-row">
      <BrandLink user={user} />
      <div className="ml-auto d-flex">
        <NavDropdown user={user} />
      </div>
    </nav>
  );
};

const BrandLink = ({ user }) => (
  <Link className="navbar-brand" to={`/${user}`}>
    <FaDumbbell className='mb-1' /> Fit Track
  </Link>
);

const NavDropdown = ({ user }) => (
  <ul className="navbar-nav">
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href={`/${user}`}
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <FaUserAlt />
      </a>
      <div className="dropdown-menu dropdown-menu-right text-center bg-dark" aria-labelledby="navbarDropdown">
        <DropdownItem to={`/${user}/edit`} icon={<FaPencilAlt />} label="Edit Profile" className="text-primary" />
        <DropdownItem to="/" icon={<FaDoorOpen />} label="Logout" className="text-danger" />
      </div>
    </li>
  </ul>
);

const DropdownItem = ({ to, icon, label, className }) => (
  <Link className={`dropdown-item font-weight-bold btn ${className}`} to={to}>
    {icon} {label}
  </Link>
);

export default NavBar;
