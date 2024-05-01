import { FaTrashCan } from "react-icons/fa6";

const Exercise = ({deleteExercise, exercise}) => {
    return(
        <>
            <tr>
                <td>{exercise.description}</td>
                <td>{exercise.duration}</td>
                <td>{(exercise.dayCheck ? 'Yes' : 'No')}</td>
                <td><button onClick={() => deleteExercise(exercise._id)}><FaTrashCan /></button></td>
            </tr>
        </>
    )
}

export default Exercise;