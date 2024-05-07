import { FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";
import './css/Exercise.component.css'; // Import CSS file for styling

const Exercise = ({ deleteExercise, exercise }) => {
    return (
        <tr className="exercise-row">
            <td className="exercise-description">{exercise.description}</td>
            <td className="exercise-duration">{exercise.duration} mins</td>
            <td className="exercise-check">{exercise.exerciseCheck ? <FaCheckCircle className="check-icon" /> : <FaTimesCircle className="cross-icon" />}</td>
            <td className="exercise-delete"><button className="delete-button" onClick={() => deleteExercise(exercise._id)}><FaTrash /></button></td>
        </tr>
    );
}

export default Exercise;
