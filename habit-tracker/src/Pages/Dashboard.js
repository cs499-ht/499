import React, { useContext, useEffect, useState } from 'react';
import Navbar from "../components/Navbar/Navbar";
import { Button, Input } from '@material-ui/core';
import { auth } from "../firebase";
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from "../context";

const Dashboard = () => {
    const { user, setUser } = useContext(AuthContext);
    return(
        <div>
            {
            user ? 
            (
                <div>
                    <Navbar/>
                    <p>{`Welcome, ${user.displayName}`}</p>
                    <h1>Habits Stuff</h1>
                    {/* <button onClick={this.props.handleLogout}>Log Out</button> */}
                    <Button type="submit" onClick={auth.signOut()}>Logout</Button>
                    {/* <button>Log Out</button> */}
                </div>
            ) : ( 
                <div>
                    <Redirect to='/'/>
                </div>
            )}
        </div>
    )
};

export default Dashboard;