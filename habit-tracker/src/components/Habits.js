import Habit from "./Habit";
import Header from "./Header";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { deleteHabit } from "../utils/Habits_utils";

const Habits = (/*{ habits, onDelete, toggleComplete }*/) => {
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
    // put below in habit utils
    const res = await fetch("http://localhost:5000/habits/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(habit),
    });
    // put above in habit utils

    const data = await res.json();
    // console.log("addHabit JSON Response", data);
    // anything that updates state/causes rerender should be done on component level - util file just for functions
    // .then(update ui)
    // update UI with data from server
    setHabits([...habits, data]);
  };

  // //delete habit
  // const deleteHabit = async (id) => {
  //   await fetch(`http://localhost:5000/habits/${id}`, { method: "DELETE" });

  //   //filter deleted habit from UI
  //   setHabits(habits.filter((habit) => habit._id !== id));
  // };

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

  return (
    <>
      {habits.map((habit) => (
        <Habit
          habit={habit}
          key={habit._id}
          onDelete={deleteHabit}
          toggleComplete={toggleCompleted}
        />
      ))}
    </>
  );
};

// Habits.propTypes = {
//   habit: PropTypes.shape({
//     _id: PropTypes.string,
//     username: PropTypes.string,
//     description: PropTypes.string,
//     dailyCompleted: PropTypes.bool,
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
//   toggleComplete: PropTypes.func.isRequired,
// };

export default Habits;
