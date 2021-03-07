import Habit from "./Habit";

const Habits = ({ habits, onDelete, onToggle }) => {
  return (
    <>
      {habits.map((habit) => (
        <Habit
          key={habit._id}
          habit={habit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Habits;
