import { useState, useRef } from "react";
import { useHabit } from "../context/HabitContext";
// import "./css/AddHabit.css";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const AddHabit = (handleClose) => {
  const usernameRef = useRef();
  const descriptionRef = useRef();
  const totalCountRef = useRef();
  const completedRef = useRef();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { saveHabit } = useHabit();

  function createHabit(e) {
    e.preventDefault();
    // reset error
    setError("");
    // loading disables submit button so user cannot spam sign up
    setLoading(true);

    const habit = {
      username: user.displayName,
      email: user.email,
      description: descriptionRef.current.value,
      totalCount: totalCountRef.current.value,
      completed: completedRef.current.checked,
    };
    console.log(habit);

    saveHabit(habit);

    // reset all values
    descriptionRef.current.value = "";
    totalCountRef.current.value = "0";
    completedRef.current.checked = false;
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Habit</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={createHabit}>
            <Form.Group id="habit">
              <Form.Label>Habit Description</Form.Label>
              <Form.Control
                type="text"
                ref={descriptionRef}
                required
                placeholder="Add habit description"
              />
            </Form.Group>
            <Form.Group id="total-count">
              <Form.Label>Total Count</Form.Label>
              <Form.Control
                type="number"
                min="0"
                ref={totalCountRef}
                required
                defaultValue={0}
              />
            </Form.Group>
            <Form.Group id="completed">
              <Form.Label>Completed</Form.Label>
              <Form.Control type="checkbox" ref={completedRef} />
            </Form.Group>
            {/* disable add button when trying to submit */}
            <Button disabled={loading} className="w-100" type="submit">
              Save Habit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AddHabit;
