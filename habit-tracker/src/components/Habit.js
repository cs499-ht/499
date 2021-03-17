import { FcCancel, FcOk, FcUndo } from "react-icons/fc";
import PropTypes from "prop-types";
import { useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const Habit = ({ habit }) => {
  const { deleteHabit, toggleComplete } = useContext(HabitContext);

  return (
    <div className={`habit${habit.dailyCompleted ? "-completed" : ""}`}>
      <h2>Username: {habit.username}</h2>
      <h3>Habit: {habit.description}</h3>

      {/* Show undo if complete */}
      {habit.dailyCompleted ? (
        <FcUndo
          className="undo"
          style={{ cursor: "pointer" }}
          onClick={() => toggleComplete(habit._id)}
          size={50}
        />
      ) : (
        // Show checkmark if not complete
        <FcOk
          className="OK"
          style={{ cursor: "pointer" }}
          onClick={() => toggleComplete(habit._id)}
          size={50}
        />
      )}

      <FcCancel
        style={{ cursor: "pointer" }}
        //   arrow function needed b/c whole event is passed in by default
        onClick={() => deleteHabit(habit._id)}
        size={50}
      />
    </div>
  );
};

// Habit.propTypes = {
//   habit: PropTypes.shape({
//     _id: PropTypes.string,
//     username: PropTypes.string,
//     description: PropTypes.string,
//     dailyCompleted: PropTypes.bool,
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
//   toggleComplete: PropTypes.func.isRequired,
// };

export default Habit;
