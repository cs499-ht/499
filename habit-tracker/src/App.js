import Header from "./components/Header";
import Habits from "./containers/Habits";
import AddHabit from "./components/AddHabit";
import HabitProvider from "./context/HabitContext";
import "./App.css";
import Leaderboard from "./containers/Leaderboard";

function App() {
  /* onClick (Habit.js) calls deleteHabit (App.js) function 
      State gets passed down
      Actions get passed up*/
  return (
    <div className="App">
      {/* <Header
        onAdd={() => setshowAddHabit(!showAddHabit)}
        showAdd={showAddHabit}
      /> */}
      {/* && - shortcut for ternary w/o else block */}
      {/* {showAddHabit && <AddHabit onAdd={addHabit} />} */}

      {/* Default text is "Add a habit above!" if no habits are found in DB */}
      {/* {habits.length > 0 ? ( */}
      {/* <AddHabit /> */}
      <HabitProvider>
        <AddHabit />
        <Habits />
        <Leaderboard />
      </HabitProvider>
      {/* // ) : (
      //   "Add a habit above!"
      // )} */}
    </div>
  );
}

export default App;
