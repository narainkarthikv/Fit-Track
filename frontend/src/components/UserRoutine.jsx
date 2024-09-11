import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTotalDays, updateTotalDays, setDayCheck } from '../slices/userRoutineSlice'; 
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const UserRoutine = ({ userID }) => {
    const dispatch = useDispatch();
    const { dayCheck } = useSelector(state => state.userRoutine);
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    useEffect(() => {
        dispatch(fetchTotalDays(userID));
    }, [userID, dispatch]);

    // Use useCallback to memoize the resetWeeklyRoutine function
    const resetWeeklyRoutine = useCallback(() => {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const updatedDayCheck = new Array(7).fill(false);
        updatedDayCheck[dayOfWeek] = false;
        dispatch(setDayCheck(updatedDayCheck));
    }, [dispatch]);

    useEffect(() => {
        resetWeeklyRoutine();
        const millisecondsInADay = 86400000;

        const timer = setInterval(() => {
            resetWeeklyRoutine(); // Reset every 7 days
        }, 7 * millisecondsInADay);

        return () => clearInterval(timer); // Clean up on component unmount
    }, [resetWeeklyRoutine]);

    const onButtonClick = async (index) => {
        const updatedCheck = [...dayCheck];
        updatedCheck[index] = !updatedCheck[index]; // Toggle the state for the clicked day
        dispatch(setDayCheck(updatedCheck)); // Update the dayCheck state
        await dispatch(updateTotalDays(userID, updatedCheck)); // Send the updated state to the server
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <h5 className="font-weight-bold">User Weekly Routine</h5>
            <div className="btn-group" role="group" aria-label="Day Buttons">
                {dayCheck.map((day, index) => (
                    <div key={index} className="d-flex flex-column align-items-center m-1">
                        <button
                            onClick={() => onButtonClick(index)}
                            className={`btn rounded-pill d-flex ${day ? 'btn-success' : 'btn-danger'}`}
                        >
                            {day ? <FaCheckCircle /> : <FaTimesCircle />}
                        </button>
                        <small className="mt-1 font-weight-bold">{weekdays[index]}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserRoutine;
