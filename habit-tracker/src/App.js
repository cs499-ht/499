// import Header from "./components/Header";
import Habits from "./containers/Habits";
import AddHabit from "./components/AddHabit";
import HabitProvider from "./context/HabitContext";
import "./App.css";
import Leaderboard from "./containers/Leaderboard";
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (  
    <div className="App">
      <Router>
        <Switch>
          {/* '/' Landing page is login/registration, Needing landing page */}
            {/* Main/Landing */}
            <Route path='/' exact component={Landing}/>
          {/* When the user signs in and are authorized, they will be rerouted to My habits and Leaderboard */}
            <Route path='/dashboard' component={Dashboard}/>
            {/* {Habits} filtered by user */}
            {/* HabitProvider? */}
            {/* <Route path='/myhabits'/>
            <Route path='/leaderboard'/> */}
        </Switch>
      </Router>
      {/* <HabitProvider>
        <AddHabit />
        <Leaderboard />
        <Habits />
      </HabitProvider> */}

      {/* <Header
        onAdd={() => setshowAddHabit(!showAddHabit)}
        showAdd={showAddHabit}
      /> */}
      {/* && - shortcut for ternary w/o else block */}
      {/* {showAddHabit && <AddHabit onAdd={addHabit} />} */}

      {/* Default text is "Add a habit above!" if no habits are found in DB */}
      {/* {habits.length > 0 ? ( */}
      {/* <AddHabit /> */}
      {/* // ) : (
      //   "Add a habit above!"
      // )} */}
    </div>
  );
}

export default App;
