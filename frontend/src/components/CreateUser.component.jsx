import React, { useState } from 'react';
import axios from 'axios';
import './css/CreateUser.component.css';

const CreateUser = () => {
  const [username, setUsername] = useState('');

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username
    };

    axios.post('https://fit-track-epab.onrender.com/add', user)
      .then(res => {
        console.log(res.data);
        setUsername('');
         
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });

      window.location = '/users';
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='users-form-container'>
        <div className='users-form-group'>
          <label htmlFor="username">Username:</label>
          <input
          id="username"
            type="text"
            required
            className="users-form-control"
            value={username}
            onChange={onChangeUsername}
            autoComplete="username"
          />
        </div>
        <br />
        <div>
          <button type="submit" className='users-submit-btn'>
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
