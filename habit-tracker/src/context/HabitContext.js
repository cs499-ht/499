import { createContext, useState, useEffect, useContext } from "react";

export const HabitContext = createContext();

// useHabit hook to access HabitContext instead of rewriting it in every component
export function useHabit() {
  return useContext(HabitContext);
}

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  // load initial state from backend
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
    const res = await fetch("https://radiant-anchorage-47017.herokuapp.com/habits");
    const data = await res.json();
    return data;
  };

  // save habit
  const saveHabit = async (habit) => {
    console.log("saving habit", JSON.stringify(habit));
    const res = await fetch("https://radiant-anchorage-47017.herokuapp.com/habits/add", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(habit),
    });
    const data = await res.json();
    setHabits([...habits, data]);
  };

  const deleteHabit = async (id) => {
    await fetch(`https://radiant-anchorage-47017.herokuapp.com/habits/${id}`, { method: "DELETE" });

    setHabits(habits.filter((habit) => habit._id !== id));
  };

  // fetch single habit - needed for toggle complete
  const fetchHabit = async (id) => {
    const res = await fetch(`https://radiant-anchorage-47017.herokuapp.com/habits/${id}`);
    const data = await res.json();
    return data;
  };

  //toggle complete
  const toggleComplete = async (id) => {
    const habitToToggle = await fetchHabit(id);
    const updatedHabit = {
      ...habitToToggle,
      completed: !habitToToggle.completed,
    };

    // console.log("selected habit: ", habitToToggle);

    // update total count
    if (habitToToggle.completed) {
      updatedHabit.totalCount = habitToToggle.totalCount - 1;
    } else {
      updatedHabit.totalCount = habitToToggle.totalCount + 1;
    }

    // console.log("updated habit: ", updatedHabit);

    const res = await fetch(`https://radiant-anchorage-47017.herokuapp.com/habits/update/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedHabit),
    });

    const data = await res.json();
    // console.log("toggleComplete JSON RESPONSE", data);

    //update UI with data from server
    setHabits(
      // only update single habit
      habits.map((habit) =>
        habit._id === id
          ? { ...habit, completed: data.completed, totalCount: data.totalCount }
          : habit
      )
    );
  };

  // data/functions to export
  const value = {
    habits,
    saveHabit,
    deleteHabit,
    toggleComplete,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};
