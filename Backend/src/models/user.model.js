const { connection } = require("../utils/dbConnect");
const bcrypt = require("bcryptjs");

// Create a new user
async function createUser(user) {
    const { name, email, password, type } = user;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO users (name, email, password, type)
            VALUES (?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            connection.query(query, [name, email, hashedPassword, type], (error, results) => {
                if (error) {
                    return reject({ message: 'Error creating user', error });
                }
                const createdUser = { ...user, password: undefined };
                return resolve({ status: 'created', result: createdUser });
            });
        });
    } catch (error) {
        return Promise.reject({ message: 'Error hashing password', error });
    }
}


async function getDashbordInfo() {
    return new Promise((resolve, reject) => {
        const usersQuery = "SELECT COUNT(*) AS totalUsers FROM users WHERE type = 'user'";
        const adminQuery = "SELECT COUNT(*) AS totalAdmin FROM users WHERE type = 'admin'";
        const productsQuery = "SELECT COUNT(*) AS totalProducts FROM product";
        const promotionsQuery = "SELECT COUNT(*) AS totalPromotions FROM promotions";
        const ordersQuery = "SELECT COUNT(*) AS totalOrders FROM orders";

        // Execute all queries concurrently using Promise.all
        Promise.all([
            new Promise((resolve, reject) => {
                connection.query(usersQuery, (userError, userResults) => {
                    if (userError) {
                        return reject({ message: "Error getting user count", error: userError });
                    }
                    resolve(userResults[0].totalUsers);
                });
            }),
            new Promise((resolve, reject) => {
                connection.query(adminQuery, (adminError, adminResults) => {
                    if (adminError) {
                        return reject({ message: "Error getting admin count", error: adminError });
                    }
                    resolve(adminResults[0].totalAdmin);
                });
            }),
            new Promise((resolve, reject) => {
                connection.query(productsQuery, (productError, productResults) => {
                    if (productError) {
                        return reject({ message: "Error getting product count", error: productError });
                    }
                    resolve(productResults[0].totalProducts);
                });
            }),
            new Promise((resolve, reject) => {
                connection.query(promotionsQuery, (promotionError, promotionResults) => {
                    if (promotionError) {
                        return reject({ message: "Error getting promotion count", error: promotionError });
                    }
                    resolve(promotionResults[0].totalPromotions);
                });
            }),
            new Promise((resolve, reject) => {
                connection.query(ordersQuery, (orderError, orderResults) => {
                    if (orderError) {
                        return reject({ message: "Error getting order count", error: orderError });
                    }
                    resolve(orderResults[0].totalOrders);
                });
            })
        ])
            .then(([totalUsers, totalAdmin, totalProducts, totalPromotions, totalOrders]) => {
                resolve({
                    status: "OK",
                    data: {
                        totalUsers,
                        totalAdmin,
                        totalProducts,
                        totalPromotions,
                        totalOrders
                    }
                });
            })
            .catch((error) => {
                reject({ message: "Error fetching dashboard info", error });
            });
    });
}


// Get user by email
async function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM users WHERE email = ?";
        connection.query(query, [email], (error, results) => {
            if (error) {
                return reject({ message: "Error getting user:", error });
            }
            if (results.length === 0) {
                return resolve({ message: "User not found" });
            }
            return resolve({ status: "OK", data: results[0] });
        });
    });
}

module.exports = {
    createUser,
    getUserByEmail,
    getDashbordInfo,
};
