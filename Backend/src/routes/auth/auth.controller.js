const { createUser, getUserByEmail } = require("../../models/user.model");
const bcrypt = require("bcrypt");
// Register a new user
const httpRegisterUser = async (req, res) => {
    const { name, email, password, type } = req.body;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser && existingUser.status === "OK") {
            return res.status(400).json({ message: "User already exists" });
        }

        // Store the password directly (NOT recommended for production)
        const newUser = { name, email, password, type };

        const { status, result } = await createUser(newUser);
        if (status === "created") {
            const { password, ...safeResult } = result;
            return res.status(201).json({
                message: "User registered successfully",
                user: safeResult,
            });
        }

        res.status(500).json({ message: "Error registering user" });
    } catch (error) {
        console.error("Error in user registration:", error);
        const errorMessage =
            process.env.NODE_ENV === "development"
                ? error.message
                : "An internal error occurred";
        res.status(500).json({ message: "Error registering user", error: errorMessage });
    }
};

// User login

const httpLoginUser = async (req, res) => {
    const { email, password, type } = req.body; // Include `type` in request body

    // Input validation
    if (!email || !password || !type) {
        return res.status(400).json({ message: "Email, password, and user type are required" });
    }

    try {
        // Fetch the user by email
        const user = await getUserByEmail(email);
        if (!user || !user.data || !user.data.password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate the password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.data.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Validate the user type matches
        if (type !== user.data.type) {
            return res.status(400).json({ message: "User type does not match" });
        }

        // Login successful - send user data in response
        return res.json({
            message: "Login successful",
            user: {
                id: user.id,
                email: user.data.email,
                name: user.data.name,
                type: user.data.type,
            },
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "An internal error occurred" });
    }
};

module.exports = {
    httpRegisterUser,
    httpLoginUser,
};
