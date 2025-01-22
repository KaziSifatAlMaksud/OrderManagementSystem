import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user"); // Default type
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      type: userType, // Include the selected user type
    };

    try {
      const response = await fetch(`http://localhost:5000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Login successful!");
        setError("");
        sessionStorage.setItem("Sifat", JSON.stringify(result.user)); 
        // Redirect based on user type
        if (result.user.type === "admin") {
          navigate("/dashboard"); // Navigate to admin page
        } else if (result.user.type === "user") {
          navigate("/"); // Navigate to user page
        }
      } else {
        setError(result.message || "Login failed");
        setSuccessMessage("");
      }
    } catch (error) {
      setError("Error connecting to the server.");
      setSuccessMessage("");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formUserType" className="mt-3">
              <Form.Label>Select User Type</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Admin"
                  name="userType"
                  value="admin"
                  checked={userType === "admin"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="User"
                  name="userType"
                  value="user"
                  checked={userType === "user"}
                  onChange={(e) => setUserType(e.target.value)}
                />
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-4">
              Login
            </Button>
          </Form>
          <p className="pt-3">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
