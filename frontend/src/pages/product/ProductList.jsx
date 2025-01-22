import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import config from "../../config/config";
import ProductModal from "../../components/ProductModel"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  // Fetch products on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/products/`);
        const data = await response.json();

        if (data.status === "OK" && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle edit button
  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowEditModal(true); 
    console.log("Edit product with id:", product.id);
  };

  // Handle delete button
  const handleDelete = async (id) => {
    console.log("Delete product with id:", id);

    try {
      const response = await fetch(`${config.apiUrl}/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product deleted successfully:", data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error("Failed to delete product:", data.error || data);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (id) => {
    const product = products.find((product) => product.id == id);
    if (!product) return;

    const newStatus = product.status == 1 ? 0 : 1;

    try {
      const response = await fetch(`${config.apiUrl}/products/action/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Product status updated successfully") {
        console.log("Product status updated:", data);
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === id ? { ...p, status: newStatus } : p
          )
        );
      } else {
        console.error("Failed to update product status:", data);
      }
    } catch (error) {
      console.error("Error updating product status:", error);
    }
  };

  // Handle product update
  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`${config.apiUrl}/products/${updatedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product updated successfully:", data);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        setShowEditModal(false); // Close modal after saving
      } else {
        console.error("Failed to update product:", data.error || data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4">Product List</h1>

        <Link to="/add-product">
          <button className="btn btn-primary mb-3">Add Product +</button>
        </Link>
        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Weight (gm.)</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description || "N/A"}</td>
                <td>Tk.{product.price.toFixed(2)}</td>
                <td>{product.weight || "0.0"} gm.</td>
                <td>{product.qty || "0.0"}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`statusSwitch-${product.id}`}
                      checked={product.status == 1}
                      onChange={() => handleStatusChange(product.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`statusSwitch-${product.id}`}
                    >
                      {product.status == 1 ? "Active" : "Inactive"}
                    </label>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(product)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(product.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal trigger to show the blur effect */}
        {showEditModal && (
          <div
            className="modal fade show"
            id="editModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="editModalLabel"
            aria-hidden="true"
            style={{ display: "block", backdropFilter: "blur(5px)" }} // Apply the blur effect
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <ProductModal
                  show={showEditModal}
                  product={productToEdit}
                  onClose={() => setShowEditModal(false)} // Close the modal
                  onSave={handleUpdateProduct} // Save the product
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
