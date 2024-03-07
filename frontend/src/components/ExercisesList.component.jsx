import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import CreateExercise from './CreateExercise.component';
import './css/ExercisesList.component.css';

const Exercise = ({ exercise, deleteExercise }) => (
  <tr className='exercises-table-body'>
    <td className='exercises-table-content'>{exercise.username}</td>
    <td className='exercises-table-content'>{exercise.description}</td>
    <td className='exercises-table-content'>{exercise.duration}</td>
    <td className='exercises-table-content'>{new Date(exercise.date).toDateString()}</td>
    <td className='exercises-table-content'>
      <Link className='exercises-table-content' onClick={() => deleteExercise(exercise._id)}>
        <button className='exercises-btn-container'>
          <FaTrash className='exercises-trash-btn'/> 
        </button>
      </Link>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get('https://fit-track-epab.onrender.com/exercises/')
      .then(res => {
        setExercises(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteExercise = id => {
    axios
    .delete(`https://fit-track-epab.onrender.com/exercises/${id}`)
    .then(res => {
      console.log(res.data);
      setExercises(prevExercises => prevExercises.filter(ex => ex._id !== id));
    });
  };

  const exerciseList = () =>
    exercises.map(exercise => (
      <Exercise
        exercise={exercise}
        deleteExercise={deleteExercise}
        key={exercise._id}
      />
    ));

  return (
    <div>
      <CreateExercise />
      <table className='exercises-table-container'>
            <th className='exercises-table-head'>Username</th>
            <th className='exercises-table-head'>Description</th>
            <th className='exercises-table-head'>Duration</th>
            <th className='exercises-table-head'>Date</th>
            <th className='exercises-table-head'>Actions</th>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
}

export default ExercisesList;
