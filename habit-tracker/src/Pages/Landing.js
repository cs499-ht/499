import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
            <h1>Welcome to Habit Tracker!</h1>
            {/* Link to Habits */}
            <p><Link to='/dashboard'>View Dashboard</Link></p>
            {/* Log In */}
            <button>Log In</button>
        </div>
    )
};

export default Landing;