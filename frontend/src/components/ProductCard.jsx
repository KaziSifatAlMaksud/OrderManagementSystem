import React, { useState } from "react";
import { Button, Card, InputGroup, FormControl } from "react-bootstrap";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [quantity, setQuantity] = useState(1); // State for quantity

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value, 10));
    setQuantity(value);
  };

  const handleOrderNow = () => {
    // Redirect to the /placeorder page with the product ID and quantity as query parameters
    navigate(`/placeorder?id=${product.id}&quantity=${quantity}`);
  };

  return (
   
    <Card className="position-relative shadow-sm hover-effect hover-scale-up">
      {/* Eye Icon (Quick View) */}
      <Button
        variant="outline-secondary"
        onClick={() => onQuickView(product)}
        className="position-absolute top-0 start-0 ms-2 mt-2"
      >
        <FaEye />
      </Button>

      {/* Cart Icon (Add to Cart) */}
      <Button
        variant="outline-primary"
        onClick={() => onAddToCart(product)}
        className="position-absolute top-0 end-0 me-2 mt-2"
      >
        <FaShoppingCart />
      </Button>

      <Card.Body>
        <Card.Title className="mt-5">{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      
          {product.promotion_active === 'true' ? (
            <span className="badge bg-primary">Promotion</span> // Show this when promotion is active
          ) : null}
        <Card.Text>
          <strong>Tk. {product.price}</strong>
        </Card.Text>
        <Card.Text>Stock: {product.qty}</Card.Text>
       <InputGroup className="mb-3 w-50">
          <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
          <FormControl
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
          <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
        </InputGroup>
        <Button variant="success" onClick={handleOrderNow}>
          Order Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;