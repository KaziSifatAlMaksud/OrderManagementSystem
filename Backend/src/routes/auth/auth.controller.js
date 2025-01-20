const { createUser, getUserByEmail } = require("../../models/user.model");
const bcrypt = require("bcryptjs");

const { generateToken } = require("../../utils/jwtUtil");

// Register a new user
const httpRegisterUser = async (req, res) => {
    const { name, email, password, type } = req.body;
    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser && existingUser.status === "OK") {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword, type };

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

// User login (generate JWT)
const httpLoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        // Fetch the user by email
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        console.log("User:", user);
        console.log("User password", user.data.password);
        console.log("Userasdfasdf password", password);

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, `user.data.password`);
        console.log("User isMatch:", isMatch);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // Generate JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Error logging in', error: 'An internal error occurred' });
    }
};


module.exports = {
    httpRegisterUser,
    httpLoginUser,
};
