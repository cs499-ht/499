import Habit from "../components/Habit";
import { useHabit } from "../context/HabitContext";

const Leaderboard = (/*{ habits, onDelete, toggleComplete }*/) => {
  //pull state from Habit Context
  const { habits } = useHabit();

  //deep copy of habits needed, otherwise entire state changes
  let sortedHabits = JSON.parse(JSON.stringify(habits));
  sortedHabits.sort((a, b) => (a.totalCount < b.totalCount ? 1 : -1));

  const lead = true;
  const container = "leaderboard";

  return (
    <div className={`${container}-container`}>
      <h1>Leaderboard</h1>
      {sortedHabits.map((habit) => (
        <Habit
          habit={habit}
          key={`${container}-${habit._id}`}
          lead={lead}
          container={container}
        />
      ))}
    </div>
  );
};

export default Leaderboard;
