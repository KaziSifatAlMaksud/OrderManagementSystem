import React, { useState, useEffect } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import UserHeader from "../../components/UserHader";

const PlaceOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    products: [],
  });

  const [products, setProducts] = useState([]); // State to hold products
  const [timeLeft, setTimeLeft] = useState(null); // State to hold countdown time
  const location = useLocation(); // Get the current location

  // Extract the 'id' query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  const quantity = queryParams.get("quantity");

  // Fetch specific product information
  useEffect(() => {
    if (productId && quantity) {
      fetch(`http://localhost:5000/orders/${productId}/${quantity}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          return response.json();
        })
        .then((data) => {
          setProducts([data.data]); // Assuming the API returns one product
          if (data.data.end_date) {
            const endDate = new Date(data.data.end_date);
            const now = new Date();
            const timeDiff = endDate - now;
            setTimeLeft(timeDiff > 0 ? timeDiff : 0); // Set initial countdown time
          }
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId, quantity]);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // Format time left into a readable format
  const formatTimeLeft = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Handle input change for customer details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    console.log(orderDetails);
  };

  return (
    <>
      <UserHeader />
      <div className="container mt-5">
        <h1 className="text-center mb-4 display-4">Place Your Order</h1>
        <Row>
          <Col md={8}>
            <Form onSubmit={handleSubmit}>
              {/* Customer Details */}
              <Card className="mb-4">
                <Card.Body>
                  <h5>Customer Information</h5>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={orderDetails.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={orderDetails.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={orderDetails.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={orderDetails.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Card.Body>
              </Card>

              {/* Product Selection */}
              <Card className="mb-4">
                <Card.Body>
                  <h5>Product Details</h5>
                  <Row>
                    {products.length > 0 ? (
                      products.map((product) => (
                        <Col md={12} className="mb-3" key={product.id}>
                          <Card>
                            <Card.Body>
                               {product.end_date && (
                                <Card.Text >
                                  <p>Time Left: {formatTimeLeft(timeLeft)}</p>
                                </Card.Text>
                              )}
                              <Card.Title>{product.product_name}</Card.Title>
                              <Card.Text>
                                <strong>Price: {product.price}</strong>
                              </Card.Text>
                              <Card.Text>
                                <strong>Discount Price: {product.discount_price}</strong>
                              </Card.Text>
                              <Card.Text>
                                <strong>Quantity: {product.requestedQuantity}</strong>
                              </Card.Text>
                              <Card.Text>
                                <strong>Total Price: {product.discount_price * product.requestedQuantity}</strong>
                              </Card.Text>
                             
                              <Button variant="success" type="submit">
                                Place Order
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))
                    ) : (
                      <p>Loading product...</p>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Form>
          </Col>

          {/* Sidebar with Contact Information */}
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Contact Information</h5>
                <p>If you have any questions, feel free to contact us at:</p>
                <ul>
                  <li>Email: kazi.sifat2013@gmail.com</li>
                  <li>Phone: +01537244273</li>
                  <li>Address: Moynarbag, Badda, Dhaka Bangladesh</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PlaceOrderPage;