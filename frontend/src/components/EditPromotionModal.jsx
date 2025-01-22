import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditPromotionModal = ({ show, promotion, onClose, onSave }) => {
  const [editedPromotion, setEditedPromotion] = useState({});

  useEffect(() => {
    if (promotion) {
      setEditedPromotion(promotion);
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save the edited promotion
    onSave(editedPromotion);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Promotion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={editedPromotion.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="start_date" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="start_date"
              name="start_date"
              value={editedPromotion.start_date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end_date" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="end_date"
              name="end_date"
              value={editedPromotion.end_date || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="promotion_type" className="form-label">
              Promotion Type
            </label>
            <input
              type="text"
              className="form-control"
              id="promotion_type"
              name="promotion_type"
              value={editedPromotion.promotion_type || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="discount" className="form-label">
              Discount
            </label>
            <input
              type="text"
              className="form-control"
              id="discount"
              name="discount"
              value={editedPromotion.discount || ""}
              onChange={handleChange}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPromotionModal;
