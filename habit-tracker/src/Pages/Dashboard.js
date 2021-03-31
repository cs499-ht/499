import React, { useState } from "react";
// import { Button, Input } from "@material-ui/core";
// import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext.js";
import { Card, Button, Alert, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Habits from "../containers/Habits";
import AddHabit from "../components/AddHabit";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const history = useHistory();
  const [showAddHabit, setShowAddHabit] = useState(false);
  const handleClose = () => setShowAddHabit(false);
  const handleShow = () => setShowAddHabit(true);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Display Name:</strong> {user.displayName}
            </p>
            <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
              Update Profile
            </Link>
            <Button
              variant="link"
              onClick={handleLogout}
              className="w-100 text-center mt-2"
            >
              Log Out
            </Button>
          </Card.Body>
        </Card>
      </div>

      {/* add habit modal */}
      <Button
        variant="primary"
        onClick={handleShow}
        className="btn btn-primary w-100 mt-3"
      >
        Add Habit
      </Button>
      <Modal show={showAddHabit} onHide={handleClose}>
        <Modal.Header closeButton />
        <AddHabit />
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal>

      <Habits />
    </>
  );
}

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       {user ? (
//         <div>
//           <Navbar />
//           <p>{`Welcome, ${user.email}`}</p>
//           <h1>Habits Stuff</h1>
//           {/* <button onClick={this.props.handleLogout}>Log Out</button> */}
//           <Button type="submit" onClick={auth.signOut()}>
//             Logout
//           </Button>
//           {/* <button>Log Out</button> */}
//         </div>
//       ) : (
//         <div>
//           {/* <Redirect to="/" /> */}
//           <p>{`not logged in`}</p>
//         </div>
//       )}
//     </div>
//   );
// }
