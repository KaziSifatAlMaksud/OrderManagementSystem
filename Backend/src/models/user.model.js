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
};
