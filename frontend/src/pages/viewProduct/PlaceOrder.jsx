import React, { useState } from "react";
import { Form, Button, Card, Col, Row, InputGroup } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

const PlaceOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    products: [],
  });

  const products = [
    { id: 1, name: "Product 1", price: "$25" },
    { id: 2, name: "Product 2", price: "$50" },
    { id: 3, name: "Product 3", price: "$75" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  const handleProductSelect = (product) => {
    setOrderDetails({
      ...orderDetails,
      products: [...orderDetails.products, product],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed!");
    // Handle order submission logic here
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 display-4">Place Your Order</h1>

      <Row>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            {/* Customer Details */}
            <Card className="mb-4">
              <Card.Body>
                <h5>Customer Information</h5>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={orderDetails.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="phone" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    name="phone"
                    value={orderDetails.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="address" className="mb-3">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter your address"
                    name="address"
                    value={orderDetails.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Product Selection */}
            <Card className="mb-4">
              <Card.Body>
                <h5>Select Products</h5>
                <Row>
                  {products.map((product) => (
                    <Col md={4} key={product.id} className="mb-3">
                      <Card>
                        <Card.Body>
                          <Card.Title>{product.name}</Card.Title>
                          <Card.Text>
                            <strong>{product.price}</strong>
                          </Card.Text>
                          <Button
                            variant="outline-primary"
                            onClick={() => handleProductSelect(product)}
                          >
                            <FaShoppingCart /> Add to Cart
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Order Summary */}
            <Card>
              <Card.Body>
                <h5>Order Summary</h5>
                <ul>
                  {orderDetails.products.map((product, index) => (
                    <li key={index}>
                      {product.name} - {product.price}
                    </li>
                  ))}
                </ul>
                <Button variant="success" type="submit">
                  Place Order
                </Button>
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
  );
};

export default PlaceOrderPage;
