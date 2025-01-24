// orders.controller.js
const {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrderById,
    updateOrderById,
    getProductInfoById,
    getOrderForUser,
} = require("../../models/orders.model");


// GET
async function httpGetAllOrders(req, res) {
    try {
        const Orders = await getAllOrders();
        return res.status(200).json(Orders);
    } catch (error) {
        console.error("Error fetching all Orders:", error);
        return res.status(500).json({ error: "Failed to fetch Orders" });
    }
}

const httpGetOrderById = (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Retrieved order with ID: ${id}` });


};

// GET
async function httpGetAllOrdersHistry(req, res) {
    try {
        const { email } = req.body; // Extract email from the request body

        if (!email) {
            return res.status(400).json({ error: "Email is required to fetch orders" });
        }

        // Fetch orders for the user with the given email
        const Orders = await getOrderForUser(email);

        if (Orders && Orders.data.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }

        return res.status(200).json(Orders);
    } catch (error) {
        console.error("Error fetching all Orders:", error);
        return res.status(500).json({ error: "Failed to fetch Orders" });
    }
}




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

async function httpDeleteOrder(req, res) {
    const OrdertId = req.params.id;
    return res.status(200).json(await deleteOrderById(OrdertId));
}

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
    httpGetAllOrdersHistry,
};
