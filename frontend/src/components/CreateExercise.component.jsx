import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import './css/CreateExercise.component.css';

const CreateExercise = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState(0);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://fit-track-epab.onrender.com/users')
      .then(response => {
        if (response.data.length > 0) {
          setUsers(response.data.map(user => user.username));
          setUsername(response.data[0].username);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const exercise = {
      username: username,
      description: description,
      duration: duration,
      date: date,
    };

    console.log(exercise);

    axios.post('https://fit-track-epab.onrender.com/exercises/add', exercise)
      .then(res => {
        console.log(res.data);
        window.location = '/';
      })
      .catch(error => {
        console.error('Error creating exercise:', error);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='exercises-form-container'>
        <div className='exercises-form-group'>
          <label htmlFor="username">Username:</label>
          <select
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='exercises-form-control'
            autoComplete="username"
          >
            {users.map(user => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>

        <div className='exercises-form-group'>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='exercises-form-control'
            autoComplete="description"
          />
        </div>

        <div className='exercises-form-group'>
          <label htmlFor="duration">Duration:</label>
          <input
            id="duration"
            type="text"
            required
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className='exercises-form-control'
            autoComplete="duration"
          />
        </div>

        <div className='exercises-form-group'>
          <label htmlFor="date">Date:</label>
          <DatePicker
            id="date"
            required
            selected={date}
            onChange={date => setDate(date)}
            className='exercises-Dateform-control'
            autoComplete="date"
          />
        </div>
        <br/>
        <div>
          <button type="submit" className='exercises-submit-btn'>
            Create Exercise Log
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExercise;
