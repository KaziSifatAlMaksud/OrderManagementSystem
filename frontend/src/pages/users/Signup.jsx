import config from "../../config/config";
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import Header from "../../components/Header";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setUserType] = useState("user"); 
  const [error, setError] = useState(""); 
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      type
    };

    try {
      const response = await fetch(`${config.apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Registration successful!");
        setError(""); 
      } else {
        setError(result.message || "Registration failed");
        setSuccessMessage(""); 
      }
    } catch (error) {
      setError("Error connecting to the server.");
      setSuccessMessage(""); 
    }
  };

  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card style={{ width: "100%", maxWidth: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <Form onSubmit={handleSubmit}>
              {/* Radio Button for User Type */}
              <Form.Group className="mt-3">
                <Form.Label>Account Type</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Check
                    type="radio"
                    label="Admin"
                    name="type"
                    id="admin"
                    value="admin"
                    checked={type === "admin"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  <Form.Check
                    type="radio"
                    label="User"
                    name="type"
                    id="user"
                    value="user"
                    checked={type === "user"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                </div>
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100 mt-4">
                Sign Up
              </Button>
            </Form>
            <p className="pt-3">Already have an account? <a href="/signin">Login</a></p>

                     
          </Card.Body>

        </Card>

      </Container>
    </>
  );
};

export default Signup;
