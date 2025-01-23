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

// GET product info by ID
async function getProductInfoById(productId, productQty) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT
                p.id,
                p.description AS product_description,
                p.price,
                p.weight,
                p.qty,
                p.name AS product_name,
                pr.title AS promotion_title,
                pr.start_date,
                pr.end_date,
                pr.promotion_type,
                CASE
                    WHEN pr.promotion_type = 'fixed' THEN (p.price * ?) - pr.discount
                    WHEN pr.promotion_type = 'percentage' THEN (p.price * ?) * (1 - pr.discount / 100)
                    WHEN pr.promotion_type = 'weighted' THEN
                        (SELECT (? * s.discount)
                        FROM slabs s
                        WHERE (p.weight * ?) BETWEEN s.min_weight AND s.max_weight)
                    ELSE p.price * 0
                END AS discount_price
            FROM product p
            LEFT JOIN promotion_item_details pd ON p.id = pd.product_id
            LEFT JOIN promotions pr ON pd.promotion_id = pr.id
            WHERE p.id = ?
            AND (pr.start_date < NOW() AND pr.end_date > NOW() OR pr.start_date IS NULL)
            LIMIT 1`,
            [productQty, productQty, productQty, productQty, productId],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error getting product info", error });
                }
                if (results.length === 0) {
                    return resolve({ message: `Product with ID ${productId} not found` });
                }
                const product = results[0];
                product.requestedQuantity = productQty; // Add the requested quantity to the product data
                return resolve({ status: "OK", data: product });
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
    getProductInfoById,
};
