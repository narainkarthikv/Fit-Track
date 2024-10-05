import React from 'react';
import ExerciseRow from './ExerciseRow';
import ExerciseForm from './ExerciseForm';

const ExerciseTable = ({ exercises, handleDelete, newExerciseData, handleChange, handleAdd, formVisible, setFormVisible }) => (
    <div>
        <table className="table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Duration (minutes)</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {formVisible && (
                    <ExerciseForm 
                        newExerciseData={newExerciseData}
                        handleChange={handleChange}
                        handleAdd={handleAdd}
                        setFormVisible={setFormVisible}
                    />
                )}
                <ExerciseRow exercises={exercises} handleDelete={handleDelete} />
            </tbody>
        </table>
    </div>
);

export default ExerciseTable;
