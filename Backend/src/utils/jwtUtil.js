const jwt = require("jsonwebtoken");

// Function to generate a JWT token
function generateToken(user) {
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
    };
    const secret = "abc"; // You should store this securely (e.g., in .env)
    const options = { expiresIn: "1h" }; // Token expiration

    return jwt.sign(payload, secret, options);
}

// Function to verify a JWT token
function verifyToken(token) {
    const secret = "abc"; // Use the same secret key as in the generateToken function
    return jwt.verify(token, secret);
}

module.exports = {
    generateToken,
    verifyToken,
};
