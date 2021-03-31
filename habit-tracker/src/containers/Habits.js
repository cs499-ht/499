import Habit from "../components/Habit";
import { useContext } from "react";
// import PropTypes from "prop-types";
import { useHabit } from "../context/HabitContext";
import { useAuth } from "../context/AuthContext";

const Habits = (/*{ habits, onDelete, toggleComplete }*/) => {
  // state info only flows downward into components
  // const [showAddHabit, setshowAddHabit] = useState(false);
  const { habits } = useHabit();
  const { user } = useAuth();

  const container = "all-habits";

  // find only current user's habits
  const filtered = habits.reduce(
    (result, { _id, username, description, totalCount, completed }) =>
      username === user.email
        ? result.concat({ _id, username, description, totalCount, completed })
        : result,
    []
  );

  console.log(filtered);
  console.log(habits);

  return (
    <div className={`${container}-container`}>
      <h1>My Habits</h1>
      {filtered.map((habit) => (
        <Habit
          habit={habit}
          key={`${container}-${habit._id}`}
          container={container}
        />
      ))}
    </div>
  );
};

export default Habits;
