import { FaCheckCircle, FaTimesCircle, FaTrash } from "react-icons/fa";

const Exercise = ({ deleteExercise, exercise }) => {
    return (
        <tr>
            <td>{exercise.description}</td>
            <td>{exercise.duration} mins</td>
            <td>
                {exercise.exerciseCheck ? (
                    <FaCheckCircle className="text-success" />
                ) : (
                    <FaTimesCircle className="text-danger" />
                )}
            </td>
            <td>
                <button className="btn btn-outline-danger btn-md rounded-pill" onClick={() => deleteExercise(exercise._id)}>
                    <FaTrash className="d-flex align-items-center" />
                </button>
            </td>
        </tr>
    );
}

export default Exercise;
