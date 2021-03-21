import Habit from "../components/Habit";
import { useState, useContext } from "react";
import PropTypes from "prop-types";
import { HabitContext } from "../context/HabitContext";

const Leaderboard = (/*{ habits, onDelete, toggleComplete }*/) => {
  //pull state from Habit Context
  const { habits } = useContext(HabitContext);

  //deep copy of habits needed, otherwise entire state changes
  let sortedHabits = JSON.parse(JSON.stringify(habits));
  sortedHabits.sort((a, b) => (a.totalCount < b.totalCount ? 1 : -1));

  const lead = true;

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      {sortedHabits.map((habit) => (
        <Habit habit={habit} key={habit._id} lead={lead} />
      ))}
    </div>
  );
};

// habits.propTypes = {
//   habit: PropTypes.shape({
//     _id: PropTypes.string,
//     username: PropTypes.string,
//     description: PropTypes.string,
//     completed: PropTypes.bool,
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
//   toggleComplete: PropTypes.func.isRequired,
// };

export default Leaderboard;
