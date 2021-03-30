import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
// import { Button, Input } from "@material-ui/core";
// import { auth } from "../firebase";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { Card, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const history = useHistory();

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
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
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
