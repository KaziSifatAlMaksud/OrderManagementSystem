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


async function httpAddNewOrder(req, res) {
    const { email, product_id, qty, unit_price, total_price, discount } = req.body;

    // Check for required fields
    if (!email || !product_id || !qty || !unit_price || !total_price) {
        return res.status(400).json({ error: "Missing required fields" });
    } else {
        // Construct product object, discount is optional
        const order = {
            email,
            product_id,
            qty,
            unit_price,
            total_price,
            discount: discount || 0
        };

        return res.status(201).json(await createOrder(order));
    }
}


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
