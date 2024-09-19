import React from 'react';
import Exercise from './Exercise';

const ExerciseRow = ({ exercises, handleDelete }) => (
    <>
        {exercises.map(exercise => (
            <Exercise key={exercise._id} deleteExercise={handleDelete} exercise={exercise} />
        ))}
    </>
);

export default ExerciseRow;
