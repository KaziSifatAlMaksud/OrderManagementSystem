import React, { useState, useEffect } from "react";
import { Form, Button, Card, Col, Row, Modal } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import UserHeader from "../../components/UserHader";

const PlaceOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    product_id: "",
    qty: 1,
    unit_price: 0,
    discount: 0,
    total_price: 0,
  });

  const [products, setProducts] = useState([]); 
  const [timeLeft, setTimeLeft] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const location = useLocation(); 
  const navigate = useNavigate(); 

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  const quantity = queryParams.get("quantity");

  useEffect(() => {
    const userSession = sessionStorage.getItem("Sifat");
    const sessionData = userSession ? JSON.parse(userSession) : null;

    if (!sessionData || sessionData.type !== "user") {
      navigate("/signin"); 
      return;
    }

    const storedName = sessionData.name || sessionStorage.getItem("name") || "";
    const storedEmail = sessionData.email || sessionStorage.getItem("email") || "";

    setOrderDetails((prevState) => ({
      ...prevState,
      name: storedName,
      email: storedEmail,
    }));
  }, [navigate]);


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
    setOrderDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderDetails((prevState) => ({
      ...prevState,
      product_id: products[0]?.id, 
      unit_price: products[0]?.price, // Assuming only one product
      qty: quantity,
      discount: products[0]?.discount_price,
      total_price: (products[0]?.price * quantity) - products[0]?.discount_price,
    }));
    setShowModal(true); // Show the modal with the order summary
  };

  // Handle order confirmation
  const handleOrderConfirm = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        navigate("/order-history"); // Redirect to orders page or elsewhere
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
      setShowModal(false); // Close the modal
    }
  };

  // Handle modal close
  const handleModalClose = () => {
    setShowModal(false);
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
                          <Card className="shadow-sm">
                            <Card.Body>
                              {/* Product Information */}
                              <div className="d-flex flex-column mb-3">
                                <h5 className="mb-2" style={{ fontWeight: 'bold' }}>{product.product_name}</h5>
                                <p className="mb-3">{product.product_description}</p>

                                {product.end_date && (
                                  <div className="text-muted ">
                                    <p className="mb-0 text-success">
                                      <strong>Time Left:</strong> {formatTimeLeft(timeLeft)}
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* Invoice Table */}
                              <div className="table-responsive">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <td><strong>Unit Price:</strong></td>
                                      <td>{product.price} Tk.</td>
                                    </tr>
                                    
                                    <tr>
                                      <td><strong>Quantity:</strong></td>
                                      <td>{product.requestedQuantity}</td>
                                    </tr>
                                    
                                    <tr>
                                      <td><strong>Total Amount(Quantity * Price):</strong></td>
                                      <td>
                                        {product.price * product.requestedQuantity} Tk.
                                      </td>
                                    </tr>
                                    <tr>
                                      <td><strong>Discount Price:</strong></td>
                                      <td>{product.discount_price}Tk.</td>
                                    </tr>
                                     <tr>
                                      <td><strong>Payable Amount:</strong></td>
                                      <td>{(product.price * product.requestedQuantity) - product.discount_price }Tk.</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              {/* Action Button */}
                              <div className="d-flex justify-content-between">
                                <Button
                                  variant="success"
                                  type="submit"
                                  className="btn-lg"
                                >
                                  Place Order
                                </Button>
                              </div>
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
                  <li>Phone: +01537244238</li>
                  <li>Address: Dhaka, Bangladesh</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Your Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Order Summary</h5>
            <table className="table table-borderless">
              <tbody>
                <tr>
                  <td><strong>Name:</strong></td>
                  <td>{orderDetails.name}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{orderDetails.email}</td>
                </tr>
                <tr>
                  <td><strong>Product:</strong></td>
                  <td>{products[0]?.product_name}</td>
                </tr>
                <tr>
                  <td><strong>Unit Price:</strong></td>
                  <td>{orderDetails.unit_price} Tk.</td>
                </tr>
                <tr>
                  <td><strong>Quantity:</strong></td>
                  <td>{orderDetails.qty}</td>
                </tr>
                <tr>
                  <td><strong>Total Amount (Quantity * Price):</strong></td>
                  <td>{orderDetails.unit_price * orderDetails.qty} Tk.</td>
                </tr>
                <tr>
                  <td><strong>Discount Price:</strong></td>
                  <td>{orderDetails.discount} Tk.</td>
                </tr>
                <tr>
                  <td><strong>Payable Amount:</strong></td>
                  <td>{orderDetails.total_price} Tk.</td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleOrderConfirm} disabled={loading}>
              {loading ? "Placing Order..." : "Confirm Order"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default PlaceOrderPage;
