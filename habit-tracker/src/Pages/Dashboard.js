import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import { Button, Input } from '@material-ui/core';
import { auth } from "../firebase";

const Dashboard = () => {
    return(
        <div>
            <Navbar/>
            <h1>Habits Stuff</h1>
            <Button type="submit" onClick={() => auth.signOut()}>Logout</Button>
            <button onClick={this.props.handleLogout}>Log Out</button>
        </div>
    )
};

export default Dashboard;