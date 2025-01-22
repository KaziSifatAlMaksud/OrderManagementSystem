const {
  postProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  autocompleteProducts,
  updateProductStatus,
  getactiveProducts,
} = require("../../models/products.model");

// GET
async function httpGetAllProducts(req, res) {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching all products:", error);
    return res.status(500).json({ error: "Failed to fetch products" });
  }
}



// GET Product by id
async function httpGetProductById(req, res) {
  const productId = req.params.id;
  return res.status(200).json(await getProductById(productId));
}

const httpGetAutocompleteProducts = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: 'Query parameter "q" is required.' });
  }

  try {
    const result = await autocompleteProducts(q);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

async function httpUpdateProductStatus(req, res) {
  const productId = req.params.id; // Correctly extract product ID from route parameters
  const { status } = req.body;

  if (status === undefined) {
    return res.status(400).json({ error: "Missing required field: status" });
  }

  try {
    const updatedProduct = await updateProductStatus(productId, status);
    console.log("Updated product:", updatedProduct);
    if (updatedProduct) {
      return res.status(200).json({ message: "Product status updated successfully" });
    } else {
      // If no rows were affected, return a product not found error
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
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

async function httpGetActiveProducts(req, res) {
  try {
    const activeProducts = await getactiveProducts();
    return res.status(200).json(activeProducts);
  } catch (error) {
    console.error("Error fetching active products:", error);
    return res.status(500).json({ error: "Failed to fetch active products" });
  }
}

module.exports = {
  httpGetAllProducts,
  httpAddNewProduct,
  httpGetProductById,
  httpDeleteProduct,
  httpUpdateProduct,
  httpGetAutocompleteProducts,
  httpUpdateProductStatus,
  httpGetActiveProducts,
};
