import React from "react";
import { Button, Card } from "react-bootstrap";
import { FaShoppingCart, FaEye } from "react-icons/fa"; // Icons for Quick View and Add to Cart

const ProductCard = ({ product, onQuickView, onAddToCart }) => {
  return (
    <Card className="position-relative shadow-sm  hover-effect hover-scale-up">
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
        <Card.Title className="mt-5" >{product.name}</Card.Title>
        <Card.Text>{product.details}</Card.Text>
        <Card.Text>
          <strong>{product.price}</strong>
        </Card.Text>
        <Button variant="success">Order Now</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
