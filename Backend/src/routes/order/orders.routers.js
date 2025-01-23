const express = require('express');
const {
    httpAddNewOrder,
    httpGetAllOrders,
    httpGetOrderById,
    httpDeleteOrder,
    httpUpdateOrder,
    httpGetProductInfo
} = require('./orders.controller');

const ordersRouter = express.Router();

ordersRouter.get('/', httpGetAllOrders); // Get all orders
ordersRouter.get('/:id', httpGetOrderById); // Get a single order by ID
ordersRouter.post('/', httpAddNewOrder); // Add a new order
ordersRouter.delete('/:id', httpDeleteOrder); // Delete an order by ID
ordersRouter.put('/:id', httpUpdateOrder); // Update an order by ID
ordersRouter.get('/:id/:qty', httpGetProductInfo); // Update an order by ID

module.exports = ordersRouter;
