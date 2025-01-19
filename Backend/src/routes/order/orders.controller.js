// orders.controller.js
const {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrderById,
    updateOrderById,
} = require("../../models/orders.model");

const httpGetAllOrders = (req, res) => {
    res.status(200).json({ message: 'Retrieved all orders' });
};

const httpGetOrderById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Retrieved order with ID: ${id}` });
};

const httpAddNewOrder = (req, res) => {
    const orderData = req.body;
    res.status(201).json({ message: 'Order added successfully', data: orderData });
};

const httpDeleteOrder = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Order with ID: ${id} deleted` });
};

const httpUpdateOrder = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    res.status(200).json({ message: `Order with ID: ${id} updated`, data: updatedData });
};

module.exports = {
    httpGetAllOrders,
    httpGetOrderById,
    httpAddNewOrder,
    httpDeleteOrder,
    httpUpdateOrder,
};
