import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import config from "../../config/config";

const PromotionTable = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch(`${config}/promotions/`);
        const data = await response.json();

        if (data.status === "OK" && Array.isArray(data.data)) {
          // Map API data to include an isActive field for handling status
          const mappedPromotions = data.data.map((promotion) => ({
            ...promotion,
            isActive: promotion.status === 1, // Convert status to boolean
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

  const handleEdit = (id) => {
    console.log("Edit promotion with id:", id);
    // Implement edit functionality (you can navigate to the edit page or open a modal)
  };

  const handleDelete = (id) => {
    console.log("Delete promotion with id:", id);
    // Implement delete functionality (e.g., API call to delete promotion)
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
      <div className="container mt-5">
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
    </>
  );
};

export default PromotionTable;
