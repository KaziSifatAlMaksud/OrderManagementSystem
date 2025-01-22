import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModel";

const ProductVideoPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products/");
        const data = await response.json();
        if (data.status === "OK") {
          setProducts(data.data); // Set products from API response
        } else {
          console.error("Failed to fetch products:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

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
      <h1 className="mb-4 text-center display-4">Find Your Product</h1>

      {/* Cart Information */}
      <div className="mt-5">
        <h2>Your Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>

      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
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
