import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModel";
import { FaShoppingCart } from "react-icons/fa"; // Cart icon

const ProductVideoPage = () => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, name: "Product 1", details: "This is a description of Product 1", price: "$25" },
    { id: 2, name: "Product 2", details: "This is a description of Product 2", price: "$50" },
    { id: 3, name: "Product 3", details: "This is a description of Product 3", price: "$75" },
  ];

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center display-4">Find Your Prudct</h1>

      {/* Cart Information */}
      <div className="mt-5">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - {item.price}
            </li>
          ))}
        </ul>
      </div>


      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4 ">
            <ProductCard
              product={product}
              onQuickView={handleQuickView}
              onAddToCart={handleAddToCart}
            />
          </Col>
        ))}
      </Row>

    

      {/* Product Modal */}
      <ProductModal
        showModal={showModal}
        selectedProduct={selectedProduct}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductVideoPage;
