import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import CreateUser from './CreateUser.component';
import './css/UsersList.component.css';

const User = ({user, deleteUser}) => (
  <tr className='users-table-body'>
    <td className='users-table-content'>{user.username}</td>
    <td className='users-table-content'>
      <Link className='users-table-content' onClick={() => deleteUser(user._id)}>
        <button className='users-btn-container'>
          <FaTrash className='users-trash-btn'/> 
        </button>
      </Link>
    </td>
  </tr>
);

  const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios
      .get('https://fit-track-epab.onrender.com/users/')
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);

    const deleteUser = id => {
      axios
      .delete(`https://fit-track-epab.onrender.com/users/${id}`)
      .then(res => { console.log(res.data);
        console.log(res.data);
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      });
    };
  
    const userList = () => 
      users.map(user => (
        <User
          user={user}
          deleteUser={deleteUser}
          key={user._id}
        />
      ));
  
      return (
        <div>
          <CreateUser/>
          <table className='users-table-container'>
              <tr className='users-table-row'>
                <th className='users-table-head'>Username</th>
                <th className='users-table-head'>Action</th>
              </tr>
            <tbody> {userList()} </tbody>
            </table>
        </div>
      );
    }

export default UsersList;