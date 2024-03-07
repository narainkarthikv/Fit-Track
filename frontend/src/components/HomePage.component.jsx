import React from 'react';
// import { Calendar, Whisper, Popover, Badge } from 'rsuite';
import './css/HomePage.component.css';
// import './css/calendar.css';

const HomePage = () => {
    
    const time = new Date().getHours();

    return (
        <div>
            <div className="welcome-message-card">
                <h1 className="welcome-message">
                    <span style={{ color: `${time < 12 ? "orangered" : (time > 12 && time <= 16 ? "Yellow" : "darkslateblue")}` }}>
                        {time < 12 ? "Good Morning 🌄" : (time > 12 && time <= 16 ? "Good Afternoon 🌅" : "Good Evening 🌇")}
                    </span>
                </h1>
            </div>
            <div className="all-list-card">
                <div className="left-side">
                    <div className="user-display-card">User details</div>
                    <div className="motivation-card">
                        <h1>Motivate</h1>
                    </div>
                </div>
                <div className="right-side">
                    <div className='calendar-card'>
                         
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
