import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
function Dashboard() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>

          {error && <Alert varient="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button varient="link" onClick={handleLogout}>
          log out
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
