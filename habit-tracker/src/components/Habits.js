import Habit from "./Habit";
import PropTypes from "prop-types";

const Habits = ({ habits, onDelete, toggleComplete }) => {
  return (
    <>
      {habits.map((habit) => (
        <Habit
          habit={habit}
          key={habit._id}
          onDelete={onDelete}
          toggleComplete={toggleComplete}
        />
      ))}
    </>
  );
};

Habits.propTypes = {
  habit: PropTypes.shape({
    _id: PropTypes.string,
    username: PropTypes.string,
    description: PropTypes.string,
    dailyCompleted: PropTypes.bool,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default Habits;
