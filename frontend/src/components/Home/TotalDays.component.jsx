import React from 'react';

const TotalDays = ({ userDetails }) => {

    return (
        <div className='d-flex flex-column text-center font-weight-bold'>
            <h5>{userDetails.username}'s Year Workout</h5>
            <h6>Total Days : {userDetails.totalDays}</h6> 
            <div className="progress">
                <div className="progress-bar bg-warning progress-bar-striped" 
                    role="progressbar" 
                    style={{ width: `${(userDetails.totalDays / 365) * 100}%` }} 
                    aria-valuenow={userDetails.xp} 
                    aria-valuemin="0" 
                    aria-valuemax="100">
                </div>   
            </div>  
        </div>
    );
}

export default TotalDays;
