import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import {FaTrash} from 'react-icons/fa';

const Exercise = ({ exercise, deleteExercise }) => (
  <tr>
    <td>{exercise.username}</td>
    <td>{exercise.description}</td>
    <td>{exercise.duration}</td>
    <td>{new Date(exercise.date).toDateString()}</td>
    <td>
      <Link onClick={() => deleteExercise(exercise._id)}>
      <Button variant="danger">
        <FaTrash/>
      </Button>
      </Link>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get('https://fit-track-epab.onrender.com/exercises/')
      .then(response => {
        setExercises(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const deleteExercise = id => {
    axios.delete(`https://fit-track-epab.onrender.com/exercises/${id}`).then(res => {
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
      <h3 style={{color:"white"}}>Logged Exercises</h3>
      <Table striped bordered hover responsive>
        <thead className="thead-light">
          <tr style={{color:"white",backgroundColor:"black"}}>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{backgroundColor:"white"}}>{exerciseList()}</tbody>
      </Table>
    </div>
  );
};

export default ExercisesList;
