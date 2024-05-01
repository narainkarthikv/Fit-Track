import { useState, useEffect } from "react";
import axios from 'axios';
import Exercise from "./Exercise.component";

const ExercisesList = ({user}) => {

    const [exercises, setExercises] = useState([]);
    const [form, setForm] = useState(false);
    const [newExerciseData, setNewExerciseData] = useState({description: '', duration: 0, dayCheck: false });

    useEffect(() => {
        fetchExercises(user);
    }, [user]);

    const fetchExercises = async (user) => {
        try{
            const response = await axios.get(`https://fit-track-epab.onrender.com/api/exercises/${user}/exercises_list`);
            const exercisesList = response.data.Exercises;
            setExercises(exercisesList);
        }
        catch(err){
            console.error('Error Fetching Exercises:', err);
        }
    }

    const deleteExercise = async (exerciseId) => {
        try {
            const response = await axios.delete(`https://fit-track-epab.onrender.com/api/exercises/${user}/exercises_list/${exerciseId}`);
            console.log('Deleted exercise:', response.data);
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
        setForm(false);
        setNewExerciseData({
          description: '',
          duration: 0,
          dayCheck: false
        });
      };

      const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
          setNewExerciseData({ ...newExerciseData, [e.target.name]: e.target.checked });
        } else {
          setNewExerciseData({ ...newExerciseData, [e.target.name]: e.target.value });
        }
      }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>description</th>
                        <th>duration</th>
                        <th>dayCheck</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise => (
                        <Exercise
                            key={exercise._id}
                            deleteExercise={deleteExercise}
                            exercise={exercise}
                        />
                    ))}
                </tbody>
            </table>
            <button onClick={() => setForm(true)}>+</button>
            {form && (
                <div>
                <form onSubmit={addExercise}>
                    <input 
                        type='text'
                        id='description'
                        name='description'
                        value={newExerciseData.description}
                        onChange={handleChange}
                    />
                    <input 
                        type='number'
                        id='duration'
                        name='duration'
                        value={newExerciseData.duration}
                        onChange={handleChange}
                    />
                    <input
                        type='checkbox'
                        id='dayCheck'
                        name='dayCheck'
                        checked={newExerciseData.dayCheck} 
                        onChange={handleChange}
                    />
                    <button onClick={() => {
                        setNewExerciseData({description: '', duration: 0, dayCheck: false})
                        setForm(false);
                    }}>No</button>
                </form>
                <button onClick={addExercise}>+</button>
                </div>
            )}
        </>
    )
}

export default ExercisesList;
