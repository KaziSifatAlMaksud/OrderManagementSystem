import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';

const PromotionCreate = () => {
  const [promotion, setPromotion] = useState({
    title: '',
    start_date: '',
    end_date: '',
    promotion_type: '',
    discount: '',
  });
  const [promotionProducts, setPromotionProducts] = useState([]);
  const [productInput, setProductInput] = useState('');
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromotion({
      ...promotion,
      [name]: value,
    });
  };

  const fetchProductSuggestions = async (query) => {
    try {
      const response = await fetch(`http://localhost:5000/products/?q=${query}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK') {
          setProductSuggestions(data.data || []);
        } else {
          setProductSuggestions([]);
        }
      }
    } catch (err) {
      console.error('Error fetching product suggestions:', err);
      setProductSuggestions([]);
    }
  };

  const handleProductSearch = (e) => {
    const value = e.target.value;
    setProductInput(value);
    if (value.trim()) {
      fetchProductSuggestions(value);
    } else {
      setProductSuggestions([]);
    }
  };

  const handleAddProduct = (product) => {
    if (!promotionProducts.some((p) => p.id === product.id)) {
      setPromotionProducts([...promotionProducts, product]);
    }
    setProductInput('');
    setProductSuggestions([]);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = promotionProducts.filter((_, i) => i !== index);
    setPromotionProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:5000/promotions/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...promotion,
          products: promotionProducts.map((product) => product.id), // Store product IDs
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuccessMessage('Promotion created successfully!');
      setPromotion({
        title: '',
        start_date: '',
        end_date: '',
        promotion_type: '',
        discount: '',
      });
      setPromotionProducts([]);
    } catch (err) {
      setError(`Failed to create promotion: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Link to="/promotions" className="btn btn-secondary mb-3">
          Back to Promotion List
        </Link>
        <h2>Create New Promotion</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Promotion Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={promotion.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Start Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="start_date"
              value={promotion.start_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">End Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="end_date"
              value={promotion.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Promotion Type</label>
            <select
              className="form-control"
              name="promotion_type"
              value={promotion.promotion_type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Promotion Type</option>
              <option value="percentage">Percentage Discount</option>
              <option value="fixed">Fixed Amount Discount</option>
              <option value="weight_based">Discount Based on Weight</option>
            </select>
          </div>
          {promotion.promotion_type && (
            <div className="mb-3">
              <label className="form-label">
                {promotion.promotion_type === 'percentage'
                  ? 'Discount Percentage'
                  : promotion.promotion_type === 'fixed'
                  ? 'Fixed Discount Amount'
                  : 'Discount Per Unit Weight'}
              </label>
              <input
                type="number"
                className="form-control"
                name="discount"
                value={promotion.discount}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">Add Products</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search Product by Name or ID"
              value={productInput}
              onChange={handleProductSearch}
            />
            {productSuggestions.length > 0 && (
              <ul className="list-group mt-2">
                {productSuggestions.map((product) => (
                  <li
                    key={product.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {product.name} (ID: {product.id})
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddProduct(product)}
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-3">
            <h5>Selected Products</h5>
            <ul className="list-group">
              {promotionProducts.map((product, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {product.name} (ID: {product.id})
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveProduct(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button type="submit" className="btn btn-success" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Create Promotion'}
          </button>
        </form>
      </div>
    </>
  );
};

export default PromotionCreate;
