const {
  postProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../../models/products.model");

// GET
async function httpGetAllProducts(req, res) {
  return res.status(200).json(await getProducts());
}


// GET Product by id
async function httpGetProductById(req, res) {
  const productId = req.params.id;
  return res.status(200).json(await getProductById(productId));
}



// POST
async function httpAddNewProduct(req, res) {
  const { name, description, weight, price, qty } = req.body;
  if (!name || !description || !price || !weight || !qty) {
    return res.status(400).json({ error: "Missing required fields" });
  } else {
    const product = {
      name,
      description,
      price,
      weight,
      qty,
    };
    return res.status(201).json(await postProduct(product));
  }

}

// Delete Product by id
async function httpDeleteProduct(req, res) {
  const productId = req.params.id;
  return res.status(200).json(await deleteProduct(productId));
}


// Update Product
async function httpUpdateProduct(req, res) {
  const productId = req.params.id;
  const { name, description, weight, price, qty, status } = req.body;
  if (!name || !description || !weight || !price || !qty || !status) {
    return res.status(400).json({ error: "Missing required fields" });
  } else {
    const product = {
      name,
      description,
      weight,
      price,
      qty,
      status
    };
    return res.status(200).json(await updateProduct(productId, product));
  }
}

module.exports = {
  httpGetAllProducts,
  httpAddNewProduct,
  httpGetProductById,
  httpDeleteProduct,
  httpUpdateProduct,
};
