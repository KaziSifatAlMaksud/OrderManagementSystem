const { connection } = require("../utils/dbConnect");

// GET all orders
async function getAllOrders() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM orders", (error, results) => {
            if (error) {
                return reject({ message: "Error getting orders:", error });
            }
            return resolve({ status: "OK", data: results });
        });
    });
}

// GET order by ID
async function getOrderById(orderId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM orders WHERE id = ?",
            [orderId],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error getting order:", error });
                }
                if (results.length === 0) {
                    return resolve({ message: `Order with ID ${orderId} not found` });
                }
                return resolve({ status: "OK", data: results[0] });
            }
        );
    });
}

// POST a new order
async function createOrder(order) {
    return new Promise((resolve, reject) => {
        const query =
            "INSERT INTO orders (user_id, item_id, promotion_id, qty, status) VALUES (?, ?, ?, ?, ?)";
        connection.query(
            query,
            [order.user_id, order.item_id, order.promotion_id, order.qty, "Pending"],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error creating order:", error });
                }
                return resolve({
                    status: "created",
                    data: { id: results.insertId, ...order, status: "Pending" },
                });
            }
        );
    });
}

// DELETE order by ID
async function deleteOrderById(orderId) {
    return new Promise((resolve, reject) => {
        connection.query(
            "DELETE FROM orders WHERE id = ?",
            [orderId],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error deleting order:", error });
                }
                if (results.affectedRows === 0) {
                    return resolve({ message: `Order with ID ${orderId} not found` });
                }
                return resolve({ status: "Order deleted successfully" });
            }
        );
    });
}

// UPDATE order by ID
async function updateOrderById(orderId, order) {
    const { user_id, item_id, promotion_id, qty, status } = order;

    return new Promise((resolve, reject) => {
        const query =
            "UPDATE orders SET user_id = ?, item_id = ?, promotion_id = ?, qty = ?, status = ? WHERE id = ?";
        connection.query(
            query,
            [user_id, item_id, promotion_id, qty, status, orderId],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error updating order:", error });
                }
                if (results.affectedRows === 0) {
                    return resolve({ message: `Order with ID ${orderId} not found` });
                }
                return resolve({ status: "Order updated successfully", data: { ...order, id: orderId } });
            }
        );
    });
}

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    deleteOrderById,
    updateOrderById,
};
