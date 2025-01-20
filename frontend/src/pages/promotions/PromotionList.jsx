import React, { useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import PromotionModal from "../../components/EditPromotionModal"; 

const PromotionList = () => {
  const promotions = [
    { id: 1, title: "Summer Sales", start_date: "2021-06-01", end_date: "2021-06-30", promotion_type: "Flat Discount", discount: "10%", product_id: 1, isActive: true },
    { id: 2, title: "New Year Offer", start_date: "2022-01-01", end_date: "2022-01-15", promotion_type: "Buy One Get One", discount: null, product_id: 2, isActive: true },
    { id: 3, title: "Festive Season Deal", start_date: "2022-12-01", end_date: "2022-12-31", promotion_type: "Flat Discount", discount: "20%", product_id: 3, isActive: true },
    { id: 4, title: "Black Friday Special", start_date: "2022-11-25", end_date: "2022-11-25", promotion_type: "Flash Sale", discount: "50%", product_id: 4, isActive: false },
    { id: 5, title: "Clearance Sale", start_date: "2023-03-01", end_date: "2023-03-10", promotion_type: "Flat Discount", discount: "30%", product_id: 1, isActive: true }
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const handleEdit = (id) => {
    const promotion = promotions.find((promotion) => promotion.id === id);
    setSelectedPromotion(promotion);
    setShowModal(true); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setSelectedPromotion(null); 
  };

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
  };

  const handleStatusChange = (id) => {
    console.log("Change status of promotion with id:", id);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4">Promotion List</h1>

        <Link to="/add-product">
          <button className="btn btn-primary mb-3">
            Add Promotion +
          </button>
        </Link>

        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Promotion Type</th>
              <th>Discount</th>
              <th>Product</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {promotions.map((promotion) => (
              <tr key={promotion.id}>
                <td>{promotion.id}</td>
                <td>{promotion.title}</td>
                <td>{promotion.start_date}</td>
                <td>{promotion.end_date}</td>
                <td>{promotion.promotion_type}</td>
                <td>{promotion.discount}</td>
                <td>{promotion.product_id}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`statusSwitch-${promotion.id}`}
                      checked={promotion.isActive}
                      onChange={() => handleStatusChange(promotion.id)}
                    />
                    <label className="form-check-label" htmlFor={`statusSwitch-${promotion.id}`}>
                      {promotion.isActive ? "true" : "false"}
                    </label>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(promotion.id)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(promotion.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the modal */}
      {selectedPromotion && (
        <PromotionModal
          showModal={showModal}
          onClose={handleCloseModal}
          promotionId={selectedPromotion.id}
          promotion={selectedPromotion}
        />
      )}
    </>
  );
};

export default PromotionList;
