// orders.controller.js
const {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrderById,
    updateOrderById,
    getProductInfoById,
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

const httpGetProductInfo = async (req, res) => {
    const { id, qty } = req.params;

    try {
        const productInfo = await getProductInfoById(id, qty);
        return res.status(200).json(productInfo);
    } catch (error) {
        return res.status(500).json({ message: 'Error retrieving product information', error });
    }
};

module.exports = {
    httpGetAllOrders,
    httpGetOrderById,
    httpAddNewOrder,
    httpDeleteOrder,
    httpUpdateOrder,
    httpGetProductInfo,
};
