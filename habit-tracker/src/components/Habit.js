import { FcCancel } from "react-icons/fc";

const Habit = ({ habit, onDelete, onToggle }) => {
  return (
    <div
      className={`habit${habit.dailyCompleted ? "-completed" : ""}`}
      onDoubleClick={() => onToggle(habit._id)}
    >
      <h2>{habit.username}</h2>
      <h3>
        {habit.description}
        {/* onClick calls onDelete function from App.js 
            State gets passed down
            Actions get passed up*/}
        <FcCancel
          style={{ cursor: "pointer" }}
          //   arrow function needed b/c whole event is passed in by default
          onClick={() => onDelete(habit._id)}
        />
      </h3>
    </div>
  );
};

export default Habit;
