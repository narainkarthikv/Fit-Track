import React from 'react';
import { FaDoorOpen, FaPencilAlt, FaDumbbell, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 d-flex flex-row">
      <Link className="navbar-brand" to={`/${user}`}>
        <FaDumbbell className='mb-1' /> Fit Track
      </Link>

      <ul className="navbar-nav ml-auto justify-content-end" id="navbarSupportedContent">
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
            <Link className="dropdown-item text-primary font-weight-bold btn" to={`/${user}/edit`}>
              <FaPencilAlt className='mb-1' /> Edit Profile
            </Link>
            <a className="dropdown-item text-danger font-weight-bold btn" href="/login">
              <FaDoorOpen className='mb-1' /> Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
