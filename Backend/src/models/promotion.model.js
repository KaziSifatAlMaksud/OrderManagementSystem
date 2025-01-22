const { connection } = require("../utils/dbConnect");

// GET all promotions
async function getPromotions() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM promotions", (error, results) => {
            if (error) {
                return reject({ message: "Error getting promotions:", error: error });
            }
            return resolve({ status: "OK", data: results });
        });
    });
}

// GET Promotion by id
async function getPromotionById(promotionId) {
    return new Promise((resolve, reject) => {
        connection.query(
            `SELECT * FROM promotions WHERE id = ${promotionId}`,
            (error, results) => {
                if (error) {
                    return reject({ message: "Error getting promotion:", error: error });
                }
                if (results.length === 0) {
                    return resolve({ message: `Promotion id ${promotionId} not found` });
                }
                return resolve({ status: "OK", results });
            }
        );
    });
}

async function updatePromotionStatus(promotionId, action) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE promotions SET status = ? WHERE id = ?',
            [action, promotionId],
            (err, results) => {
                if (err) {
                    return reject({ message: "Error updating promotion status:", error: err });
                }
                if (results.affectedRows === 0) {
                    return resolve({ message: `Promotion id ${promotionId} not found` });
                }
                return resolve({ status: "Promotion status updated successfully" });
            }
        );
    });
}



// POST a new promotion

async function postPromotion(promotion) {
    return new Promise((resolve, reject) => {
        // Insert promotion
        const query =
            "INSERT INTO promotions (title, start_date, end_date, promotion_type, discount) VALUES (?, ?, ?, ?, ?)";
        connection.query(
            query,
            [
                promotion.title,
                promotion.start_date,
                promotion.end_date,
                promotion.promotion_type,
                promotion.discount
            ],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error creating promotion:", error: error });
                }

                // Get the promotion ID
                const promotionId = results.insertId;
                console.log("New promotion created with ID:", promotionId);

                // If there are products, insert promotion items
                if (promotion.products && promotion.products.length > 0) {
                    const promotionItems = promotion.products.map(productId => [
                        promotionId,
                        productId
                    ]);

                    connection.query(
                        "INSERT INTO promotion_item_details (promotion_id, product_id) VALUES ?",
                        [promotionItems],
                        (error) => {
                            if (error) {
                                return reject({ message: "Error adding promotion items:", error: error });
                            }

                            resolve({
                                status: "success",
                                message: "Promotion created and items added successfully!",
                                promotionId: promotionId
                            });
                        }
                    );
                } else {
                    // Resolve if no products are provided
                    resolve({
                        status: "success",
                        message: "Promotion created successfully, but no items provided.",
                        promotionId: promotionId
                    });
                }
            }
        );
    });
}



// DELETE a promotion by id
async function deletePromotion(promotionId) {
    return new Promise((resolve, reject) => {
        connection.query(
            `DELETE FROM promotions WHERE id = ${promotionId}`,
            (error, results) => {
                if (error) {
                    return reject({ message: "Error deleting promotion:", error: error });
                }
                if (results.affectedRows === 0) {
                    return resolve({ message: `Promotion id ${promotionId} not found` });
                }
                return resolve({ status: "Promotion deleted successfully" });
            }
        );
    });
}

// UPDATE a promotion by id
async function updatePromotion(promotionId, promotion) {
    const { title, start_date, end_date, promotion_type, discount, weight_id } = promotion;

    return new Promise((resolve, reject) => {
        const query =
            "UPDATE promotions SET title=?, start_date=?, end_date=?, promotion_type=?, discount=?, weight_id=? WHERE id=?";
        connection.query(
            query,
            [title, start_date, end_date, promotion_type, discount, weight_id, promotionId],
            (error, results) => {
                if (error) {
                    return reject({ message: "Error updating promotion:", error: error });
                }
                if (results.affectedRows === 0) {
                    return resolve({ message: `Promotion with ID ${promotionId} not found` });
                }
                return resolve({ status: "Promotion updated successfully", results });
            }
        );
    });
}

module.exports = {
    postPromotion,
    getPromotions,
    getPromotionById,
    deletePromotion,
    updatePromotion,
    updatePromotionStatus,
};
