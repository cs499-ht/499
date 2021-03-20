import { useState, useContext } from "react";
import { HabitContext } from "../context/HabitContext";

const AddHabit = () => {
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const { saveHabit } = useContext(HabitContext);

  const addNewHabit = (e) => {
    e.preventDefault();

    if (!username || !description) {
      alert("Please add a username and description");
      return;
    }

    if (!totalCount) {
      alert("Please enter a number for total count");
      return;
    }

    saveHabit({ username, description, completed, totalCount });

    //reset states
    setUsername("");
    setDescription("");
    setCompleted(false);
    setTotalCount(0);
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
        <label>Total Count</label>
        <input
          type="text"
          placeholder="Total count"
          value={totalCount}
          // controlled component
          // event target value
          onChange={(e) => {
            // console.log(typeof e.target.value);
            setTotalCount(Number(e.target.value));
            // console.log(totalCount);
            // console.log(typeof totalCount);
          }}
        />
      </div>
      <input type="submit" value="Save Habit" />
      <div className="form-control">
        <label>completed</label>
        <input
          type="checkbox"
          checked={completed}
          value={completed}
          // controlled component
          // checkbox target value
          onChange={(e) => setCompleted(e.currentTarget.checked)}
        />
      </div>
    </form>
  );
};

export default AddHabit;
