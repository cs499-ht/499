import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
// import { Dashboard } from "./Dashboard";
import ProtectedRoute from "../components/PrivateRoute";

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
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Landing = (props) => {
  // required for Modal
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  // required for sign up

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const [open, setOpen] = React.useState(false);

  // Initial state of false indicates we are not logged in when we first visit the page
  // const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  // useEffect(() => {
  //     const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //       if (authUser) {
  //         console.log(authUser);
  //         setUser(authUser);

  //       } else {
  //         setUser(null);
  //       }
  //     })

  //     return () => {
  //       //perform some cleanup actions
  //       unsubscribe();
  //     }
  // }, [user, username]);

  // get the user state from context
  const { user } = useAuth();

  // Sign Up w User Auth
  const signUp = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({ displayName: username });
      })
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  // Sign In w User Auth
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      // .onAuthStateChanged(signIn(user))
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div>
      <h1>Welcome to Habit Tracker!</h1>
      {/* Link to Habits */}
      {/* Sign Up Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
            <Button type="submit" onClick={signUp}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>
      {/* Sign in Modal */}
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
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
            <Button type="submit" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      {/* If auth user, reroute to /dashboard */}
      {user ? (
        <div>
          {/* <Route exact path="/">   {<Redirect to="/dashboard" /> }</Route> */}

          {/* <ProtectedRoute/> */}
          {/* <Redirect to={{ pathname: "/dashboard" }} component={Dashboard} /> */}
          {/* <Redirect to='/dashboard' component={Dashboard}></Redirect> */}
          {/* <ProtectedRoute exact path='/dashboard' user={user} component={Dashboard}/> */}
          <Button type="submit" onClick={auth.signOut()}>
            Logout
          </Button>
        </div>
      ) : (
        <div>
          <Button type="submit" onClick={() => setOpenSignIn(true)}>
            Sign In
          </Button>
          <Button type="submit" onClick={() => setOpen(true)}>
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
};

export default Landing;
