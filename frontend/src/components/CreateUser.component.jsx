import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/CreateUser.component.css';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://fit-track-epab.onrender.com/users')
      .then(response => {
        if (response.data.length > 0) {
          setUsers("");
          setUsername("");
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(users);
    const user = {
      username: username
    };

    axios.post('https://fit-track-epab.onrender.com/users/add', user)
      .then(res => {
        console.log(res.data);
        setUsername('');
        window.location = '/users'; // Redirect to the users page
      })
      .catch(error => {
        console.error('Error creating user:', error);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='users-form-container'>
        <div className='users-form-group'>
          <label>Username:</label>
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
