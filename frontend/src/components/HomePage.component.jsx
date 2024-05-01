import React from 'react';
import './css/HomePage.component.css';
import ExercisesList from './Home/ExercisesList.component';
import Quotes from './Home/Quotes.component';
import UserRoutine from './Home/UserRoutine.component';
import HeatMap from './Home/HeatMap.component';

const HomePage = ({ user }) => {
    return (
        <div className="grid-container">
            <div className="grid-item">
                <ExercisesList user={user} />
            </div>
            <div className="grid-item">
                <Quotes user={user} />
            </div>
            <div className="grid-item">
                <UserRoutine user={user} />
            </div>
            <div className="grid-item">
                <HeatMap user={user} />
            </div>
        </div>
    );
}

export default HomePage;
