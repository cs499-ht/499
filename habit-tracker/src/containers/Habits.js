import Habit from "../components/Habit";
import { useContext } from "react";
// import PropTypes from "prop-types";
import { HabitContext } from "../context/HabitContext";

const Habits = (/*{ habits, onDelete, toggleComplete }*/) => {
  // state info only flows downward into components
  // const [showAddHabit, setshowAddHabit] = useState(false);
  const { habits } = useContext(HabitContext);

  const container = "all-habits";

  return (
    <div className={`${container}-container`}>
      <h1>All Habits</h1>
      {habits.map((habit) => (
        <Habit
          habit={habit}
          key={`${container}-${habit._id}`}
          container={container}
        />
      ))}
    </div>
  );
};

// Habits.propTypes = {
//   habit: PropTypes.shape({
//     _id: PropTypes.string,
//     username: PropTypes.string,
//     description: PropTypes.string,
//     completed: PropTypes.bool,
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
//   toggleComplete: PropTypes.func.isRequired,
// };

export default Habits;
