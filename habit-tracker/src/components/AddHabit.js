import { useState } from "react";
import "./css/AddHabit.css"; 

const AddHabit = ({ onAdd }) => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [dailyCompleted, setdailyCompleted] = useState(false);

  // not calling onAdd
  const onSubmit = (e) => {
    e.preventDefault();

    if (!username || !description) {
      alert("Please add a username and description");
      return;
    }

    onAdd({ username, description, dailyCompleted });
    //reset states
    setUsername("");
    setDescription("");
    setdailyCompleted(false);
  };

  return (
    <div className="container">
      <form className="add-habit-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label className="add-habit-label">Username</label>
          <input
            className="add-habit-input"
            type="text"
            placeholder="Add username"
            value={username}
            // controlled component
            // event target value
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="add-habit-label">Description</label>
          <input
            className="add-habit-input"
            type="text"
            placeholder="Add description"
            value={description}
            // controlled component
            // event target value
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="add-habit-label">dailyCompleted</label>
          <input
            className="add-habit-input"
            type="checkbox"
            checked={dailyCompleted}
            value={dailyCompleted}
            // controlled component
            // checkbox target value
            onChange={(e) => setdailyCompleted(e.currentTarget.checked)}
          />
        </div>

        <input className="submit submit-ripple" type="submit" value="Save Habit" />
      </form>
    </div>
  );
};

export default AddHabit;
