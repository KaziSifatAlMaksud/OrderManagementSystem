import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const UserHeader = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem("Sifat");
    const sessionData = userSession ? JSON.parse(userSession) : null;

    if (sessionData && sessionData.type === "user") {
      const storedName = sessionData.name || sessionStorage.getItem("name") || "";
      setName(storedName);
    } else {
      navigate("/signin"); // Redirect to signin if no valid session
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate("/signin"); // Redirect to the login page
  };

  return (
    <>
      <Navbar
        expand="lg"
        sticky="top"
        style={{
          background: "linear-gradient(90deg, #007bff, #6610f2)",
          color: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container>
          <Navbar.Brand
            href="/"
            style={{ fontWeight: "bold", color: "#fff" }}
          >
            Sifat
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ border: "none", color: "#fff" }}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="/"
                style={{
                  color: "#fff",
                  margin: "0 10px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffeb3b")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="/viewproduct"
                style={{
                  color: "#fff",
                  margin: "0 10px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffeb3b")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Explore
              </Nav.Link>
               <Nav.Link
                href="/order-history"
                style={{
                  color: "#fff",
                  margin: "0 10px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffeb3b")}
                onMouseLeave={(e) => (e.target.style.color = "#fff")}
              >
                Order History
              </Nav.Link>
            </Nav>
            <Nav>
              {name ? ( // If user is logged in, show profile and logout options
                <NavDropdown
                  title={`Hi, ${name}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/profile" disabled>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default UserHeader;
