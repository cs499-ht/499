import Header from "./components/Header";
import Habits from "./components/Habits";
import AddHabit from "./components/AddHabit";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  // state info only flows downward into components
  const [showAddHabit, setshowAddHabit] = useState(false);
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    // calls fetchHabits which returns a promise
    const getHabits = async () => {
      const habitsFromServer = await fetchHabits();
      setHabits(habitsFromServer);
    };

    getHabits();
  }, []);

  // fetch habits
  // can't use async w/ useEffect, need to create async
  const fetchHabits = async () => {
    const res = await fetch("http://localhost:5000/habits");
    const data = await res.json();
    return data;
  };

  // fetch habit
  const fetchHabit = async (id) => {
    const res = await fetch(`http://localhost:5000/habits/${id}`);
    const data = await res.json();
    return data;
  };

  // add habit
  const addHabit = async (habit) => {
    const res = await fetch("http://localhost:5000/habits/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(habit),
    });

    const data = await res.json();
    // console.log("addHabit JSON Response", data);

    //update UI with data from server
    setHabits([...habits, data]);
  };

  //delete habit
  const deleteHabit = async (id) => {
    await fetch(`http://localhost:5000/habits/${id}`, { method: "DELETE" });

    //filter deleted habit from UI
    setHabits(habits.filter((habit) => habit._id !== id));
  };

  //toggle completed
  const toggleCompleted = async (id) => {
    const habitToToggle = await fetchHabit(id);
    const updatedHabit = {
      ...habitToToggle,
      dailyCompleted: !habitToToggle.dailyCompleted,
    };

    const res = await fetch(`http://localhost:5000/habits/update/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedHabit),
    });

    const data = await res.json();
    // console.log("toggleCompleted JSON RESPONSE", data);

    //update UI with data from server
    setHabits(
      // only update single habit
      habits.map((habit) =>
        habit._id === id
          ? { ...habit, dailyCompleted: data.dailyCompleted }
          : habit
      )
    );
  };

  /* onClick (Habit.js) calls deleteHabit (App.js) function 
      State gets passed down
      Actions get passed up*/
  return (
    <div className="App">
      <Header
        onAdd={() => setshowAddHabit(!showAddHabit)}
        showAdd={showAddHabit}
      />
      {/* && - shortcut for ternary w/o else block */}
      {showAddHabit && <AddHabit onAdd={addHabit} />}

      {/* Default text is "Add a habit above!" if no habits are found in DB */}
      {habits.length > 0 ? (
        <Habits
          habits={habits}
          onDelete={deleteHabit}
          toggleComplete={toggleCompleted}
        />
      ) : (
        "Add a habit above!"
      )}
    </div>
  );
}

export default App;
