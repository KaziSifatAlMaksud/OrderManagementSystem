const { connection } = require("../utils/dbConnect");

// GET
async function getProducts() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM product", (error, results) => {
      if (error) {
        return reject({ message: "Error getting products:", error: error });
      }
      return resolve({ status: "OK", data: results });
    });
  });
}

async function getactiveProducts() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT p.*, CASE WHEN pr.start_date <= CURDATE() AND pr.end_date >= CURDATE() THEN 'true' ELSE 'false' END AS promotion_active FROM product p LEFT JOIN promotion_item_details pid ON p.id = pid.product_id LEFT JOIN promotions pr ON pr.id = pid.promotion_id WHERE p.status = 1 GROUP BY p.id;", (error, results) => {
      if (error) {
        return reject({ message: "Error getting products:", error: error });
      }
      return resolve({ status: "OK", data: results });
    });
  });
}





// GET Product by id
async function getProductById(productId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM product WHERE id = ${productId}`,
      (error, results) => {
        if (error) {
          return reject({ message: "Error getting products:", error: error });
        }
        if (results.length === 0) {
          return resolve({ message: `Product id ${productId} not found` });
        }
        return resolve({ status: "OK", results });
      }
    );
  });
}

// Autocomplete products by name or id
async function autocompleteProducts(query) {
  return new Promise((resolve, reject) => {
    const searchQuery = `%${query}%`;
    const sql =
      "SELECT id, name FROM product WHERE name LIKE ? OR id LIKE ? LIMIT 10";
    connection.query(sql, [searchQuery, searchQuery], (error, results) => {
      if (error) {
        return reject({ message: "Error fetching products for autocomplete:", error: error });
      }

      return resolve({ status: "OK", products: results });
    });
  });
}



// POST
async function postProduct(product) {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO product (name, description, price, weight, qty, status) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(
      query,
      [product.name, product.description, product.price, product.weight, product.qty, 1],
      (error, results) => {
        if (error) {
          return reject({ message: "Error creating product:", error: error });
        }
        return resolve({ status: "created", result: product });
      }
    );
  });
}

// Update Product status by id
// Update Product Status by ID
async function updateProductStatus(productId, action) {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE product SET status = ? WHERE id = ?',
      [action, productId],
      (err, results) => {
        if (err) {
          return reject({ message: "Error updating product status:", error: err });
        }
        if (results.affectedRows === 0) {
          return resolve({ message: `Product id ${productId} not found` });
        }
        return resolve({ status: "Product status updated successfully" });
      }
    );
  });
}



// Delete Product by id
async function deleteProduct(productId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM product WHERE id = ${productId}`,
      (error, results) => {
        if (error) {
          return reject({ message: "Error getting products:", error: error });
        }
        if (results.affectedRows === 0) {
          return resolve({ message: `Product id ${productId} not found` });
        }
        return resolve({ status: "Product deleted successfully" });
      }
    );
  });
}

// Update Product by id
async function updateProduct(productId, product) {
  const { name, description, weight, price, qty, status } = product;



  return new Promise((resolve, reject) => {
    const query =
      "UPDATE product SET name=?, description=?, weight=?,status=?, price=?, qty=? WHERE id=?";
    connection.query(
      query,
      [name, description, weight, price, qty, status, productId],
      (error, results) => {
        if (error) {
          return reject({ message: "Error updating product:", error: error });
        }
        if (results.affectedRows === 0) {
          return resolve({ message: `Product with ID ${productId} not found` });
        }
        return resolve({ status: "Product updated successfully", results });
      }
    );
  });
}

module.exports = {
  postProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  updateProductStatus,
  autocompleteProducts,
  getactiveProducts,
};
