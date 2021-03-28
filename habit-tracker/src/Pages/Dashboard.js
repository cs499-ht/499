import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Habits from "../containers/Habits";
import AddHabit from "../components/AddHabit";
import HabitProvider from "../context/HabitContext";
import Leaderboard from "../containers/Leaderboard";

const Dashboard = () => {
    return(
        <div>
            <Navbar/>
            <h1>Habits Stuff</h1>
            {/* <HabitProvider>
                <AddHabit />
                <Leaderboard />
                <Habits />
            </HabitProvider> */}
            <button>Log Out</button>
        </div>
    )
};

export default Dashboard;