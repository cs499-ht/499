import { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const AddHabit = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [dailyCompleted, setdailyCompleted] = useState(false);

  const { saveHabit } = useContext(HabitContext);

  const addNewHabit = (e) => {
    e.preventDefault();

    if (!username || !description) {
      alert("Please add a username and description");
      return;
    }

    saveHabit({ username, description, dailyCompleted });
    //reset states
    setUsername("");
    setDescription("");
    setdailyCompleted(false);
  };

  return (
    <form className="add-habit-form" onSubmit={addNewHabit}>
      <div className="form-control">
        <label>Username</label>
        <input
          type="text"
          placeholder="Add username"
          value={username}
          // controlled component
          // event target value
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Description</label>
        <input
          type="text"
          placeholder="Add description"
          value={description}
          // controlled component
          // event target value
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>dailyCompleted</label>
        <input
          type="checkbox"
          checked={dailyCompleted}
          value={dailyCompleted}
          // controlled component
          // checkbox target value
          onChange={(e) => setdailyCompleted(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save Habit" />
    </form>
  );
};

export default AddHabit;
