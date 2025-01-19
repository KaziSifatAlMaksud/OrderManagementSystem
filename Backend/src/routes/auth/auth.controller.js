const { createUser, getUserByEmail } = require("../../models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/jwtUtil");

// Register a new user
const httpRegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await getUserByEmail(email);
        if (existingUser.status === "OK") {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const newUser = { name, email, password };
        const { status, result } = await createUser(newUser);
        if (status === "created") {
            return res.status(201).json({ message: "User registered successfully", user: result });
        }
        res.status(500).json({ message: "Error registering user" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

// User login (generate JWT)
const httpLoginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { status, data } = await getUserByEmail(email);
        if (status !== "OK") {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, data.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = generateToken(data);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

module.exports = {
    httpRegisterUser,
    httpLoginUser,
};
