import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExercises, addExercise, deleteExercise } from '../slices/exercisesSlice';
import Exercise from './Exercise';

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

    const handleDelete = (exerciseId) => {
        dispatch(deleteExercise(userID, exerciseId));
    };

    const handleAdd = (e) => {
        e.preventDefault();
        dispatch(addExercise(userID, newExerciseData));
        setFormVisible(false);
        setNewExerciseData({ description: '', duration: 0, exerciseCheck: false });
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewExerciseData({ ...newExerciseData, [e.target.name]: value });
    };

    return (
        <div className="p-1" style={{ minHeight: "420px", maxHeight: "420px", overflowY: "auto" }}>
            <table className="table table-striped table-dark">
                <thead className="text-center">
                    <tr>
                        <th>Description</th>
                        <th>Duration (minutes)</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {exercises.map(exercise => (
                        <Exercise key={exercise._id} deleteExercise={handleDelete} exercise={exercise} />
                    ))}
                    {formVisible && (
                        <tr>
                            <td colSpan="4">
                                <form onSubmit={handleAdd}>
                                    <div className="row">
                                        <div className="col">
                                            <input
                                                type='text'
                                                id='description'
                                                name='description'
                                                className="form-control input-lg m-1"
                                                placeholder='Description'
                                                value={newExerciseData.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <input
                                                type='number'
                                                id='duration'
                                                name='duration'
                                                className="form-control input-lg m-1"
                                                placeholder='Duration (minutes)'
                                                value={newExerciseData.duration}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <div className="form-check mr-2">
                                                <input
                                                    type='checkbox'
                                                    id='exerciseCheck'
                                                    name='exerciseCheck'
                                                    className="form-check-input"
                                                    checked={newExerciseData.exerciseCheck}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label" htmlFor='exerciseCheck'>Completed</label>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button type="button" className="btn btn-secondary mr-2 mb-1" onClick={() => setFormVisible(false)}>Cancel</button>
                                            <button type="submit" className="btn btn-primary">Add</button>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {!formVisible && (
                <button className="btn btn-primary" onClick={() => setFormVisible(true)}>Add Exercise</button>
            )}
        </div>
    );
}

export default ExercisesList;
