import React from 'react';
import Navbar from "../components/Navbar/Navbar";
import { Button, Input } from '@material-ui/core';
import { auth } from "../firebase";
import { Route, Redirect } from 'react-router-dom';

// app.post('/sessionLogout', (req, res) => {
//     const sessionCookie = req.cookies.session || '';
//     res.clearCookie('session');
//     admin
//       auth
//       .verifySessionCookie(sessionCookie)
//       .then((decodedClaims) => {
//         return admin.auth.revokeRefreshTokens(decodedClaims.sub);
//       })
//       .then(() => {
//         res.redirect('/');
//       })
//       .catch((error) => {
//         res.redirect('/');
//       });
// });
const Dashboard = () => {
    const signOut = () => {
        auth.signOut();
        <Route exact path="/dashboard">
            { <Redirect to="/" />}
        </Route>
    }
    return(
        <div>
            <Navbar/>
            <h1>Habits Stuff</h1>
            {/* <button onClick={this.props.handleLogout}>Log Out</button> */}
            <Button type="submit" onClick={signOut()}>Logout</Button>
            {/* <button>Log Out</button> */}
        </div>
    )
};

export default Dashboard;