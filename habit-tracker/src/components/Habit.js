import { FcCancel, FcOk, FcUndo } from "react-icons/fc";
// import PropTypes from "prop-types";
import { useContext, useRef, useState } from "react";
import { useHabit } from "../context/HabitContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Habit = ({ habit, lead, container }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { toggleComplete, deleteHabit } = useHabit();

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{habit.username}'s Habit</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Total Count: {habit.totalCount}
          </Card.Subtitle>
          <Card.Text>{habit.description}</Card.Text>
          {lead ? null : habit.completed ? (
            <>
              <Button
                variant="secondary"
                onClick={() => toggleComplete(habit._id)}
              >
                Undo
              </Button>
              <Button variant="danger" onClick={() => deleteHabit(habit._id)}>
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="success"
                onClick={() => toggleComplete(habit._id)}
              >
                Complete
              </Button>
              <Button variant="danger" onClick={() => deleteHabit(habit._id)}>
                Delete
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </>

    // <div className={`${container}-habit${habit.completed ? "-completed" : ""}`}>
    //   <h2>Username: {habit.username}</h2>
    //   <h3>Habit: {habit.description}</h3>
    //   <h3>Total Count: {`${habit.totalCount ? habit.totalCount : "0"}`}</h3>

    //   {/* don't show options on leaderboard */}
    //   {lead ? null : habit.completed ? (
    //     // Show undo if complete
    //     <>
    //       <FcUndo
    //         className="undo"
    //         style={{ cursor: "pointer" }}
    //         onClick={() => toggleComplete(habit._id)}
    //         size={50}
    //       />
    //       {/* onClick (Habit.js) calls deleteHabit (HabitContext.js) function
    //         State gets passed down
    //         Actions get passed up */}
    //       <FcCancel
    //         style={{ cursor: "pointer" }}
    //         //   arrow function needed b/c whole event is passed in by default
    //         onClick={() => deleteHabit(habit._id)}
    //         size={50}
    //       />
    //     </>
    //   ) : (
    //     // Show checkmark if not complete
    //     <>
    //       <FcOk
    //         className="OK"
    //         style={{ cursor: "pointer" }}
    //         onClick={() => toggleComplete(habit._id)}
    //         size={50}
    //       />
    //       <FcCancel
    //         style={{ cursor: "pointer" }}
    //         //   arrow function needed b/c whole event is passed in by default
    //         onClick={() => deleteHabit(habit._id)}
    //         size={50}
    //       />
    //     </>
    //   )}
    // </div>
  );
};

// Habit.propTypes = {
//   habit: PropTypes.shape({
//     _id: PropTypes.string,
//     username: PropTypes.string,
//     description: PropTypes.string,
//     completed: PropTypes.bool,
//   }).isRequired,
//   onDelete: PropTypes.func.isRequired,
//   toggleComplete: PropTypes.func.isRequired,
// };

export default Habit;
