import { useState, useEffect } from "react";
import axios from 'axios';
import Exercise from "./Exercise.component";
import './css/ExercisesList.component.css'; 

const ExercisesList = ({ user }) => {
    const [exercises, setExercises] = useState([]);
    const [formVisible, setFormVisible] = useState(false);
    const [newExerciseData, setNewExerciseData] = useState({ description: '', duration: 0, exerciseCheck: false });

    useEffect(() => {
        fetchExercises(user);
    }, [user]);

    const fetchExercises = async (user) => {
        try {
            const response = await axios.get(`https://fit-track-epab.onrender.com/api/exercises/${user}/exercises_list`);
            const exercisesList = response.data.Exercises;
            setExercises(exercisesList);
        } catch (err) {
            console.error('Error Fetching Exercises:', err);
        }
    }

    const deleteExercise = async (exerciseId) => {
        try {
            await axios.delete(`https://fit-track-epab.onrender.com/api/exercises/${user}/exercises_list/${exerciseId}`);
            setExercises(prevExercises => prevExercises.filter(exercise => exercise._id !== exerciseId));
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const addExercise = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`https://fit-track-epab.onrender.com/api/exercises/${user}/add`, newExerciseData);
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
        <div className="exercises-list-container">
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Duration (minutes)</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise => (
                        <Exercise key={exercise._id} deleteExercise={deleteExercise} exercise={exercise} />
                    ))}
                    {formVisible && (
                        <tr>
                            <td colSpan="4">
                                <form onSubmit={addExercise}>
                                    <input type='text' id='description' name='description' placeholder='Description' value={newExerciseData.description} onChange={handleChange} />
                                    <input type='number' id='duration' name='duration' placeholder='Duration (minutes)' value={newExerciseData.duration} onChange={handleChange} />
                                    <label>
                                        <input type='checkbox' id='exerciseCheck' name='exerciseCheck' checked={newExerciseData.exerciseCheck} onChange={handleChange} />
                                        Completed
                                    </label>
                                    <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
                                    <button type="submit">Add</button>
                                </form>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button className="add-button" onClick={() => setFormVisible(true)}>Add Exercise</button>
        </div>
    )
}

export default ExercisesList;
