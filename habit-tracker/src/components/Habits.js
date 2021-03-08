import Habit from "./Habit";

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

export default Habits;
