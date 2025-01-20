import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductModal = ({ showModal, selectedProduct, onClose, onAddToCart }) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedProduct?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Details:</strong> {selectedProduct?.details}</p>
        <p><strong>Price:</strong> {selectedProduct?.price}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            onAddToCart(selectedProduct);
            onClose();
          }}
        >
          Add to Cart
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
