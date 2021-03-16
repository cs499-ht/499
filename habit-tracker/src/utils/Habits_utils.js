// add habit
export const addHabit = async (habit) => {
  // put below in habit utils
  const res = await fetch("http://localhost:5000/habits/add", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(habit),
  });
  // put above in habit utils

  //   const data = await res.json();
  // console.log("addHabit JSON Response", data);
  // anything that updates state/causes rerender should be done on component level - util file just for functions
  // .then(update ui)
  // update UI with data from server
  //   setHabits([...habits, data]);
};

//delete habit
export const deleteHabit = async (id) => {
  await fetch(`http://localhost:5000/habits/${id}`, { method: "DELETE" });

  //filter deleted habit from UI
  // setHabits(habits.filter((habit) => habit._id !== id));
};
