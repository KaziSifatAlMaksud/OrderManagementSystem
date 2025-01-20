import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products/");
        const data = await response.json();

        if (data.status === "OK" && Array.isArray(data.data)) {
          // Map API data to include an isActive field for handling status
          const mappedProducts = data.data.map((product) => ({
            ...product,
            isActive: product.status === 1, // Convert status to boolean
          }));
          setProducts(mappedProducts);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit product with id:", id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);
    // Implement delete functionality
  };

  const handleStatusChange = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
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
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.category || "N/A"}</td> {/* Handle missing category */}
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`statusSwitch-${product.id}`}
                      checked={product.isActive}
                      onChange={() => handleStatusChange(product.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`statusSwitch-${product.id}`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
                    </label>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(product.id)}
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
      </div>
    </>
  );
};

export default ProductTable;
