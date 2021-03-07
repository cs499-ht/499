import Habit from "./Habit";

const Habits = ({ habits, onDelete }) => {
  return (
    <>
      {habits.map((habit) => (
        <Habit key={habit._id} habit={habit} onDelete={onDelete} />
      ))}
    </>
  );
};

export default Habits;
