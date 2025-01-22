import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from "react-bootstrap";

const Header = () => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem("Sifat");
    const sessionData = userSession ? JSON.parse(userSession) : null;

    if (sessionData && sessionData.name) {
      setName(sessionData.name);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session data
    navigate("/signin"); // Redirect to the login page
  };

  const handleShowModal = () => setShowModal(true); // Show modal
  const handleCloseModal = () => setShowModal(false); // Close modal

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/dashboard">Sifat</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/promotions">Promotions</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown title={name ? `Hi, ${name}` : "Guest"} id="basic-nav-dropdown">
                <NavDropdown.Item href="/#" disabled>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                {/* Trigger modal on logout click */}
                <NavDropdown.Item onClick={handleShowModal}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal Component */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
