import React, { useState, useEffect } from "react";
import { Form, Button, Card, Col, Row } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const PlaceOrderPage = () => {
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    products: [],
  });

  const [products, setProducts] = useState([]); // State to hold products
  const location = useLocation(); // Get the current location

  // Extract the 'id' query parameter from the URL
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  // Fetch specific product information
  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:5000/products/${productId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }
          return response.json();
        })
        .then((data) => {
          setProducts([data]); // Assuming the API returns one product
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

  // Handle input change for customer details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({ ...orderDetails, [name]: value });
  };

  // Handle adding products to the order
  const handleProductSelect = (product) => {
    if (!orderDetails.products.some((p) => p.id === product.id)) {
      setOrderDetails({
        ...orderDetails,
        products: [...orderDetails.products, product],
      });
    } else {
      alert("This product is already in the cart!");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    console.log(orderDetails);
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
              
              </Card.Body>
            </Card>

            {/* Product Selection */}
            <Card className="mb-4">
              <Card.Body>
                <h5>Product Details</h5>
                <Row>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <Col md={6} className="mb-3" key={product.id}>
                        <Card>
                          <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>
                              <strong>Price: {product.price}</strong>
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
                    ))
                  ) : (
                    <p>Loading product...</p>
                  )}
                </Row>
              </Card.Body>
            </Card>

            {/* Order Summary */}
            <Card>
              <Card.Body>
                <h5>Order Summary</h5>
                {orderDetails.products.length === 0 ? (
                  <p>No products selected.</p>
                ) : (
                  <ul>
                    {orderDetails.products.map((product) => (
                      <li key={product.id}>
                        {product.name} - {product.price}
                      </li>
                    ))}
                  </ul>
                )}
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
