import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <h2 className="text-center mb-4">Login</h2>

        {error && <Alert varient="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required></Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
            ></Form.Control>
          </Form.Group>

          <Button disabled={loading} className="w-100" type="submit">
            Login
          </Button>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Form>
      </Card>
      <div className="w-100 text-center mt-2">
        Need ans account ?<Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
