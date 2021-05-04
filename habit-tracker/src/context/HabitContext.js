import { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase";

export const HabitContext = createContext();

// useHabit hook to access HabitContext instead of rewriting it in every component
export function useHabit() {
  return useContext(HabitContext);
}

export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  // useEffect(() => {
  //   db.collection("habits").onSnapshot((snapshot) => {
  //     setHabits(snapshot.docs.map((doc) => doc.data()));
  //   });
  // }, []);

  useEffect(() => {
    db.collection('habits').onSnapshot(snapshot => {
      setHabits(snapshot.docs.map(doc => ({
        id: doc.id, 
        habit: doc.data()
      })));
    });
  }, []);
  // load initial state from backend
  // useEffect(() => {
  //   // calls fetchHabits which returns a promise
  //   const getHabits = async () => {
  //     const habitsFromServer = await fetchHabits();
  //     setHabits(habitsFromServer);
  //   };
  //   getHabits();
  // }, []);

  //fetch habits
  //  can't use async w/ useEffect, need to create async
  const fetchHabits = async () => {
    // const res = await fetch("http://localhost:5000/habits");
    // const data = await res.json();
    // return data;
    const res = db.collection("habits");
    const data = await res.get();
    if (!data.exists) {
      console.log("No such document");
    } else {
      data.get().then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          console.log("Document data:", doc.data());
          return doc.data();
        });
      });
    }
  };

  // save habit
  // const saveHabit = async (habit) => {
  //   console.log("saving habit", JSON.stringify(habit));
  //   const res = await fetch("http://localhost:5000/habits/add", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(habit),
  //   });
  //   const data = await res.json();
  //   setHabits([...habits, data]);
  // };
  // add new habit
  const saveHabit = async (habit) => {
    const res = await db.collection("habits").doc();

    const data = await res.set(habit);
    console.log("The data added is: ", data);

    setHabits([
      ...habits,
      {
        ...habit,
      },
    ]);

    console.log("Added document with ID: ", res.id);
  };

  // delete habit
  // const deleteHabit = async (id) => {
  //   // await fetch(`http://localhost:5000/habits/${id}`, { method: "DELETE" });

  //   // setHabits(habits.filter((habit) => habit._id !== id));

  //   await db.collection('habits').get().onSnapshot(snapshot => {
  //     setHabits(habits.filter((habit) => doc.id != id))
  //   }).delete();
  // };

  // fetch single habit - needed for toggle complete
  const fetchHabit = async (id) => {
    // const res = await fetch(`http://localhost:5000/habits/${id}`);
    // const data = await res.json();
    // return data;
    const res = await db
      .collection("habits")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => ({
          id: doc.id,
          habit: doc.data(),
        }));
      });
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

    const res = await fetch(`http://localhost:5000/habits/update/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedHabit),
    });

    // const res = await db.collection('habits').get().onSnapshot

    const data = await res.json();
    // console.log("toggleComplete JSON RESPONSE", data);

    //update UI with data from server
    setHabits(
      // only update single habit
      habits.map(({ id, habit }) =>
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
    // deleteHabit,
    toggleComplete,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};
