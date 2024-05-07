import { useEffect, useState } from "react";
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import './css/UserRoutine.component.css';

const UserRoutine = ({ user }) => {

    const [dayCheck, setDayCheck] = useState(new Array(7).fill(false));
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchUsername(user);
    }, [user]);

    const onButtonClick = (index) => {
        const updatedCheck = [...dayCheck];
        updatedCheck[index] = !updatedCheck[index];
        setDayCheck(updatedCheck);
    }

    const fetchUsername = async (user) => {
        try {
            const response = await axios.get(`https://fit-track-epab.onrender.com/api/user/${user}`);
            const { username } = response.data;
            setUsername(username);
        }
        catch (err) {
            console.error("Error fetching the user", err);
        }
    }

    return (
        <div className="user-routine-container">
            <h1>{username}'s Routine Check</h1>
            <div className="day-buttons">
                {dayCheck.map((day, index) => (
                    <button key={index} onClick={() => onButtonClick(index)} className={`day-button ${day ? 'checked' : 'unchecked'}`}>
                        {day ? <FaCheckCircle /> : <FaTimesCircle />}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default UserRoutine;
