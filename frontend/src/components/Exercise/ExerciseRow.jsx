import React from 'react';
import Exercise from './Exercise';

const ExerciseRow = ({ exercises = [], handleDelete }) => {
    return (
        <>
            {exercises.length > 0 ? (
                exercises.map(exercise => (
                    <Exercise key={exercise._id} deleteExercise={handleDelete} exercise={exercise} />
                ))
            ) : (
                null
            )}
        </>
    );
};

export default ExerciseRow;
