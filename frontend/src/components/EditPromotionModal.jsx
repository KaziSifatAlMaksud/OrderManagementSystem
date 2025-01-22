import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditPromotionModal = ({ show, promotion, onClose, onSave }) => {
  const [editedPromotion, setEditedPromotion] = useState({
    title: '',
    start_date: '',
    end_date: '',
    promotion_type: '',
    discount: '',
    products: [],
  });

  useEffect(() => {
    if (promotion) {
      setEditedPromotion({
        title: promotion.title || '',
        start_date: promotion.start_date || '',
        end_date: promotion.end_date || '',
        promotion_type: promotion.promotion_type || '',
        discount: promotion.discount || '',
        products: promotion.products || [],
      });
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPromotion((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (productId) => {
    const newProducts = editedPromotion.products.includes(productId)
      ? editedPromotion.products.filter((id) => id !== productId)
      : [...editedPromotion.products, productId];

    setEditedPromotion((prev) => ({ ...prev, products: newProducts }));
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
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={editedPromotion.title || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="start_date" className="form-label">Start Date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="start_date"
              name="start_date"
              value={editedPromotion.start_date || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="end_date" className="form-label">End Date</label>
            <input
              type="datetime-local"
              className="form-control"
              id="end_date"
              name="end_date"
              value={editedPromotion.end_date || ''}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="promotion_type" className="form-label">Promotion Type</label>
            <select
              className="form-control"
              id="promotion_type"
              name="promotion_type"
              value={editedPromotion.promotion_type || ''}
              onChange={handleChange}
            >
              <option value="">Select Promotion Type</option>
              <option value="percentage">Percentage Discount</option>
              <option value="fixed">Fixed Amount Discount</option>
              <option value="weight_based">Discount Based on Weight</option>
            </select>
          </div>
          {editedPromotion.promotion_type && editedPromotion.promotion_type !== 'weight_based' && (
            <div className="mb-3">
              <label htmlFor="discount" className="form-label">
                {editedPromotion.promotion_type === 'percentage' ? 'Discount Percentage (%)' : 'Fixed Discount Amount (Tk.)'}
              </label>
              <input
                type="number"
                className="form-control"
                id="discount"
                name="discount"
                value={editedPromotion.discount || ''}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Add Products</label>
            <div>
              {editedPromotion.products.length > 0 ? (
                <ul className="list-group">
                  {editedPromotion.products.map((productId, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      Product ID: {productId}
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleProductChange(productId)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No products selected</p>
              )}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPromotionModal;
