import { Link } from 'react-router-dom';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { auth } from "../firebase";
import { makeStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

// required for Modal styling
function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  
const Landing = props => {

    // required for Modal
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);
    
    // required for sign up
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const [open, setOpen] = React.useState(false);
    
    // Initial state of false indicates we are not logged in when we first visit the page
    const [user, setUser] = useState(null);
    const [openSignIn, setOpenSignIn] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            console.log(authUser);
            setUser(authUser);
    
          } else {
            setUser(null);
          }
        })
    
        return () => {
          //perform some cleanup actions
          unsubscribe();
        }
    }, [user, username]);

    // Sign Up w User Auth
    const signUp = (e) => {
        e.preventDefault();
    
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          authUser.user.updateProfile({displayName: username})
        })
        .catch((error) => alert(error.message));
    
        setOpen(false);
    }

    // Sign In w User Auth
    const signIn = (e) => {
        e.preventDefault();
    
        auth
        .signInWithEmailAndPassword(email, password)
        // .onAuthStateChanged(signIn(user))
        .catch((error) => alert(error.message));
        setOpenSignIn(false);

        // As httpOnly cookies are to be used, do not persist any state client side.
        // auth.setPersistence(auth.Auth.Persistence.NONE);
          
        // // When the user signs in with email and password.
        // auth.signInWithEmailAndPassword(email, password)
        // .then(user => {
        //     // Get the user's ID token as it is needed to exchange for a session cookie.
        //     return user.getIdToken().then(idToken => {
        //       // Session login endpoint is queried and the session cookie is set.
        //       // CSRF protection should be taken into account.
        //       // ...
        //       const csrfToken = getCookie('csrfToken')
        //       return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
        //     });
        // })
        // .then(() => {
        // // A page redirect would suffice as the persistence is set to NONE.
        //     return auth.signOut();
        // }).then(() => {
        //     window.location.assign('/dashboard');
        // });
    }

    // const setCookie = async (idToken, res) => {
    //     // Set session expiration to 5 days.
    //     // Create the session cookie. This will also verify the ID token in the process.
    //     // The session cookie will have the same claims as the ID token.
    //     const expiresIn = 60 * 60 * 24 * 5 * 1000;
    //     admin
    //         auth
    //         .createSessionCookie(idToken, { expiresIn })
    //         .then(
    //             (sessionCookie) => {
    //             // Set cookie policy for session cookie.
    //             const options = { maxAge: expiresIn, httpOnly: true, secure: true };
    //             res.cookie('session', sessionCookie, options);

    //             admin.auth.veryIdToken(idToken).then(function(decodedClaims){
    //                 res.redirect('/dashboard');
    //             });
    //         },
    //         (error) => {
    //             res.status(401).send('UNAUTHORIZED REQUEST!');
    //         });
    // }

    // const checkCookieMiddleware = async(req, res, next) => {

    //     const sessionCookie = req.cookies.session || '';
    //     admin.auth.verifySessionCookie(
    //         sessionCookie, true).then((decodedClaims) => {
    //             req.decodedClaims = decodedClaims;
    //             next();
    //         })
    //         .catch((error) => {
    //             // Session cookie is unavailable or invalid. Force user to login.
    //             res.redirect('/');
    //         });
    // }
    // app.post('/sessionLogin', (req, res) => {
    //     // Get the ID token passed and the CSRF token.
    //     const idToken = req.body.idToken.toString();
    //     const csrfToken = req.body.csrfToken.toString();
    //     // Guard against CSRF attacks.
    //     if (csrfToken !== req.cookies.csrfToken) {
    //       res.status(401).send('UNAUTHORIZED REQUEST!');
    //       return;
    //     }
        
    // });

    // // Whenever a user is accessing restricted content that requires authentication.
    // app.post('/dashboard', (req, res) => {
    //     const sessionCookie = req.cookies.session || '';
    //     // Verify the session cookie. In this case an additional check is added to detect
    //     // if the user's Firebase session was revoked, user deleted/disabled, etc.
    //     admin
    //         auth
    //         .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    //         .then((decodedClaims) => {
    //             serveContentForUser('/dashboard', req, res, decodedClaims);
    //         })
            
    // });

    return (
        <div>
            <h1>Welcome to Habit Tracker!</h1>
            {/* Link to Habits */}            
            {/* Sign Up Modal */}
            <Modal 
            open={open} 
            onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form>
                        <Input
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} required
                        />
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signUp}>Sign In</Button>
                    </form>
                </div>
            </Modal>
            {/* Sign in Modal */}
            <Modal 
            open={openSignIn} 
            onClose={() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form>
                        <Input
                            placeholder="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick={signIn}>Sign In</Button>
                    </form>
                </div>
            </Modal>
            {/* If auth user, reroute to /dashboard */}
            {
            user ? 
            (
                <div>
                    <Route exact path="/">   {<Redirect to="/dashboard" /> }</Route>
                    {/* <Dashboard/> */}
                    {/* <ProtectedRoute/> */}
                    {/* <Redirect to='/dashboard' component={Dashboard}></Redirect> */}
                    {/* <ProtectedRoute exact path='/dashboard' user={user} component={Dashboard}/> */}
                    <Button type="submit" onClick={() => auth.signOut()}>Logout</Button>
                </div>
            ) : ( 
                <div>
                    <Button type="submit" onClick={() => setOpenSignIn(true)}>Sign In</Button>
                    <Button type="submit" onClick={() => setOpen(true)}>Sign Up</Button>
                </div>
            )}  
        </div>
    )
};

export default Landing;