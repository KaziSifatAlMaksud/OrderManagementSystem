import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import EditPromotionModal from "../../components/EditPromotionModal"; // Import your EditPromotionModal component
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal"; // Import Delete Confirmation Modal
import config from "../../config/config";

const PromotionTable = () => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem("Sifat"); // Replace "Sifat" with your session key
   
    const sessionData = userSession ? JSON.parse(userSession) : null;
    if (!sessionData || sessionData.type !== "admin") {
      navigate("/signin"); // Redirect to sign-in page if session is missing
      return;
    }

    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:5000/promotions/");
        const data = await response.json();

        if (data.status === "OK" && Array.isArray(data.data)) {
          const mappedPromotions = data.data.map((promotion) => ({
            ...promotion,
            isActive: promotion.status === 1, // Convert status to boolean (1 = Active, 0 = Inactive)
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
  }, [navigate]);

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

  const handleStatusChange = async (id) => {
    const promotion = promotions.find((promotion) => promotion.id === id);
    if (!promotion) return;
    const newStatus = promotion.status === 1 ? 0 : 1; // Inactive if 1, Active if 0

    try {
      const response = await fetch(`${config.apiUrl}/promotions/action/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Promotion status updated successfully") {
        setPromotions((prevPromotions) =>
          prevPromotions.map((p) =>
            p.id === id ? { ...p, status: newStatus } : p
          )
        );
      } else {
        console.error("Failed to update promotion status:", data);
      }
    } catch (error) {
      console.error("Error updating promotion status:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5 content-background">
        <h1 className="mb-4 display-6">Promotion List</h1>

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
                      checked={promotion.status === 1}
                      onChange={() => handleStatusChange(promotion.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`statusSwitch-${promotion.id}`}
                    >
                      {promotion.status === 1 ? "Active" : "Inactive"}
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
