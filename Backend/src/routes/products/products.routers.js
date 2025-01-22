const express = require('express');
const {
    httpAddNewProduct,
    httpGetAllProducts,
    httpGetProductById,
    httpDeleteProduct,
    httpUpdateProduct,
    httpUpdateProductStatus,
    httpGetAutocompleteProducts,

} = require('./products.controller');

const productsRouter = express.Router();
productsRouter.get('/', httpGetAllProducts);
productsRouter.get('/:id', httpGetProductById);
productsRouter.post('/', httpAddNewProduct);
productsRouter.delete('/:id', httpDeleteProduct);
productsRouter.put('/:id', httpUpdateProduct);
productsRouter.put('/action/:id', httpUpdateProductStatus);
productsRouter.get('/', httpGetAutocompleteProducts);

module.exports = productsRouter;
