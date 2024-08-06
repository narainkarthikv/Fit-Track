import { useState, useEffect } from "react";
import axios from 'axios';
import Exercise from "./Exercise.component";

const ExercisesList = ({ userID }) => {
    const [exercises, setExercises] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [newExerciseData, setNewExerciseData] = useState({ description: '', duration: 0, exerciseCheck: false });

    useEffect(() => {
        fetchExercises(userID);
    }, [userID]);

    const fetchExercises = async (userID) => {
        try {
            const response = await axios.get(`https://fit-track-epab.onrender.com/api/exercises/${userID}/exercises_list`);
            const exercisesList = response.data.Exercises;
            setExercises(exercisesList);
        } catch (err) {
            console.error('Error Fetching Exercises:', err);
        }
    }

    const deleteExercise = async (exerciseId) => {
        try {
            await axios.delete(`https://fit-track-epab.onrender.com/api/exercises/${userID}/exercises_list/${exerciseId}`);
            setExercises(prevExercises => prevExercises.filter(exercise => exercise._id !== exerciseId));
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const addExercise = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://fit-track-epab.onrender.com/api/exercises/${userID}/add`, newExerciseData);
            setExercises(response.data.Exercises);
        } catch (error) {
            console.error('Error adding exercise:', error);
        }
        setFormVisible(false);
        setNewExerciseData({ description: '', duration: 0, exerciseCheck: false });
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setNewExerciseData({ ...newExerciseData, [e.target.name]: value });
    }

    return (
        <div className="p-1" style={{ minHeight:"420px", maxHeight: "420px", overflowY: "auto" }}>
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
                        <Exercise key={exercise._id} deleteExercise={deleteExercise} exercise={exercise} />
                    ))}
                    {formVisible && (
                        <tr>
                        <td colSpan="4">
                            <form onSubmit={addExercise}>
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
    )
}

export default ExercisesList;
