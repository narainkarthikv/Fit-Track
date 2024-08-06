    import React, { useState, useEffect } from "react";
    import axios from 'axios';
    import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

    const UserRoutine = ({ userID, setUserDetails }) => {
        const [dayCheck, setDayCheck] = useState(new Array(7).fill(false));
        const [activeDayIndex, setActiveDayIndex] = useState(null);
        const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        const resetWeeklyRoutine = () => {
            const now = new Date();
            const dayOfWeek = now.getDay();
            const updatedDayCheck = new Array(7).fill(false);
            updatedDayCheck[dayOfWeek] = false; 
            setDayCheck(updatedDayCheck);
            setActiveDayIndex(dayOfWeek);
        };
        const backendURL = process.env.REACT_APP_API_URL;

        useEffect(() => {
            resetWeeklyRoutine(); 
            const millisecondsInADay = 86400000;
        
            const timer = setInterval(resetWeeklyRoutine, 7 * millisecondsInADay); 
        
            return () => {
                clearInterval(timer);
            };
        }, []);
        

        const onButtonClick = async (index) => {
            if (index !== activeDayIndex) return;
            const updatedCheck = [...dayCheck];
            updatedCheck[index] = !updatedCheck[index];
            setDayCheck(updatedCheck);
            await updateTotalDays(userID, updatedCheck);
            fetchTotalDays(userID);
        };
        
        const fetchTotalDays = async (userID) => {
            try {
                const response = await axios.get(`${backendURL}/api/user/${userID}`);
                setUserDetails(prevDetails => ({ ...prevDetails, totalDays: response.data.totalDays }));
            } catch (error) {
                console.error('Error fetching total days:', error);
            }
        };

        const updateTotalDays = async (userID, updatedCheck) => {
            try {
                const response = await axios.put(`${backendURL}/api/user/${userID}/update-totalDays`, {
                    updatedCheck: updatedCheck
                });
                console.log('Total days updated:', response.data.totalDays);
            } catch (error) {
                console.error('Error updating total days:', error);
            }
        };

        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="font-weight-bold">User Weekly Routine</h5>
                <div className="btn-group" role="group" aria-label="Day Buttons">
                    {dayCheck.map((day, index) => (
                        <div key={index} className="d-flex flex-column align-items-center m-1">
                            <button
                                onClick={() => onButtonClick(index)}
                                disabled={index !== activeDayIndex} 
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
