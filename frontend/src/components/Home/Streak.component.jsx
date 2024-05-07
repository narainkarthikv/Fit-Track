import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Streak.component.css';

const Streak = ({ user }) => {
    const [username, setUsername] = useState('');
    const [xp, setXP] = useState(0);

    useEffect(() => {
        fetchUserDetails(user);
    }, [user]);

    const fetchUserDetails = async (user) => {
        try {
            const response = await axios.get(`https://fit-track-epab.onrender.com/api/user/${user}`);
            const { username, xp } = response.data;
            setUsername(username);
            setXP(xp);
        } catch (err) {
            console.error("Error fetching the user", err);
        }
    }

    return (
        <div className="streak-container">
            <h1>Welcome {username}</h1>
            <h2>XP: {xp}</h2>
            <div className="xp-bar">
                <div className="xp-progress" style={{ width: `${(xp / 100) * 100}%` }}></div>
            </div>
        </div>
    )
}

export default Streak;
