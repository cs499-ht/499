// import Header from "./components/Header";
import { HabitProvider } from "./context/HabitContext";
import "./App.css";
import Leaderboard from "./containers/Leaderboard";
// import Landing from "./Pages/Landing";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./context/AuthContext.js";
import SignUp from "./components/SignUp";
import { Container } from "react-bootstrap";
import Login from "./components/Login";
import UpdateProfile from "./components/UpdateProfile";
import Navbar from "./components/Navbar/Navbar";
import Video from "./components/Video";

function App() {
  return (
    <div className="App">
      <Container
        className="flex flex-column width-full d-flex align-items-center justify-content-center"
      >
        <Router>
          <HabitProvider>
            <AuthProvider>
              <Navbar className="width-full max-width-full" />

              <Switch>
                {/* '/' Landing page is login/registration */}
                {/* Landing */}

                {/* change / path to login */}
                {/* <div className="w-100" style={{ maxWidth: "400px" }}> */}
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute
                  path="/update-profile"
                  exact
                  component={UpdateProfile}
                />
                {/* <Route exact path='/' handleLogin={handleLogin} render={props => <Landing {...props} user={user} />} /> */}
                {/* <ProtectedRoute redirectTo='/' exact path='/dashboard' component={Dashboard} /> */}
                {/* When the user signs in and are authorized, they will be rerouted to My habits and Leaderboard */}
                {/* <Dashboard /> */}
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/dashboard" component={Dashboard} />
                {/* </div> */}
                <Route path="/video" component={Video} />
              </Switch>
            </AuthProvider>
          </HabitProvider>
        </Router>
      </Container>
    </div>
  );
}

export default App;
