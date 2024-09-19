import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises, addExercise, deleteExercise } from '../slices/exercisesSlice';
import ExerciseTable from './Exercise/ExerciseTable';
import ExerciseForm from './Exercise/ExerciseForm';

const ExercisesList = ({ userID }) => {
    const dispatch = useDispatch();
    const { exercises, status } = useSelector(state => state.exercises);
    const [formVisible, setFormVisible] = useState(false);
    const [newExerciseData, setNewExerciseData] = useState({ description: '', duration: 0, exerciseCheck: false });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchExercises(userID));
        }
    }, [userID, status, dispatch]);

    const handleDelete = (exerciseId) => dispatch(deleteExercise(userID, exerciseId));

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addExercise(userID, newExerciseData));
        setFormVisible(false);
        setNewExerciseData({ description: '', duration: 0, exerciseCheck: false });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewExerciseData({ ...newExerciseData, [name]: type === 'checkbox' ? checked : value });
    };

    return (
        <div className="p-1" style={{ minHeight: "420px", maxHeight: "420px", overflowY: "auto" }}>
            <ExerciseTable exercises={exercises} handleDelete={handleDelete} />
            {formVisible && (
                <ExerciseForm
                    newExerciseData={newExerciseData}
                    handleChange={handleChange}
                    handleAdd={handleAdd}
                    setFormVisible={setFormVisible}
                />
            )}
            {!formVisible && (
                <button className="btn btn-outline-primary" onClick={() => setFormVisible(true)}>Add Exercise</button>
            )}
        </div>
    );
};

export default ExercisesList;
