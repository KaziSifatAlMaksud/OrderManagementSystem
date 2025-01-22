import React, { useState, useEffect } from "react";

const ProductModal = ({ show, product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    weight: "",
    qty: "",
    status: 0, 
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        weight: product.weight,
        qty: product.qty,
        status: product.status == 1 ? 1 : 0, 
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type == "checkbox" ? (checked ? 1 : 0) : value, 
    }));
  };

  const handleSwitchChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      status: e.target.checked ? 1 : 0, 
    }));
  };

  const handleSave = () => {
    onSave(formData); 
  };

  return (
    <div
      className={`modal fade ${show ? "show" : ""}`}
      style={{ display: show ? "block" : "none" }}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!show}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit Product
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="product-name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product-description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="product-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product-price" className="form-label">
                  Price (Tk.)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="product-price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product-weight" className="form-label">
                  Weight (gm.)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="product-weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="product-qty" className="form-label">
                  Stock Quantity 
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="product-qty"
                  name="qty"
                  value={formData.qty}
                  onChange={handleInputChange}
                />
              </div>

              {/* Status Switch */}
              <div className="mb-3">
                <label className="form-label">Status</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="product-status"
                    name="status"
                    checked={formData.status == 1} // toggle switch checked if status is 1 (Active)
                    onChange={handleSwitchChange}
                  />
                  <label className="form-check-label" htmlFor="product-status">
                    {formData.status == 1 ? "Active" : "Inactive"}
                  </label>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
