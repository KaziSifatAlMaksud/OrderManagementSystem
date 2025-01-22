import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import EditPromotionModal from "../../components/EditPromotionModal"; // Import your EditPromotionModal component
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal"; // Import Delete Confirmation Modal

const PromotionTable = () => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:5000/promotions/");
        const data = await response.json();

        if (data.status === "OK" && Array.isArray(data.data)) {
          const mappedPromotions = data.data.map((promotion) => ({
            ...promotion,
            isActive: promotion.status === 1,
          }));
          setPromotions(mappedPromotions);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleEdit = (promotion) => {
    setSelectedPromotion(promotion);
    setShowEditModal(true);
  };

  const handleDelete = (promotion) => {
    setSelectedPromotion(promotion);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedPromotion) {
      try {
        await fetch(`http://localhost:5000/promotions/${selectedPromotion.id}`, {
          method: "DELETE",
        });
        setPromotions((prevPromotions) =>
          prevPromotions.filter((promo) => promo.id !== selectedPromotion.id)
        );
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error deleting promotion:", error);
      }
    }
  };

  const handleStatusChange = (id) => {
    setPromotions((prevPromotions) =>
      prevPromotions.map((promotion) =>
        promotion.id === id
          ? { ...promotion, isActive: !promotion.isActive }
          : promotion
      )
    );
  };

  return (
    <>
      <Header />
      <div className="container mt-5 content-background">
        <h1 className="mb-4">Promotion List</h1>

        <Link to="/add-promotion">
          <button className="btn btn-primary mb-3">Add Promotion +</button>
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
                <td>{promotion.discount || "N/A"}</td>
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
                    <label
                      className="form-check-label"
                      htmlFor={`statusSwitch-${promotion.id}`}
                    >
                      {promotion.isActive ? "Active" : "Inactive"}
                    </label>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(promotion)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(promotion)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <EditPromotionModal
        show={showEditModal}
        promotion={selectedPromotion}
        onClose={() => setShowEditModal(false)}
        onSave={(updatedPromotion) => {
          setPromotions((prev) =>
            prev.map((promo) =>
              promo.id === updatedPromotion.id ? updatedPromotion : promo
            )
          );
          setShowEditModal(false);
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
      />
    </>
  );
};

export default PromotionTable;
