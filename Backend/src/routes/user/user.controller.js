const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = []; // In-memory storage for demonstration. Replace with DB in production.
const JWT_SECRET = 'your-secret-key';

// Register a new user
const httpRegisterUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

// Log in a user and return a JWT
const httpLoginUser = async (req, res) => {
    const { username, password } = req.body;

    // Find the user
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
};

// Get user profile (protected route)
const httpGetUserProfile = (req, res) => {
    const user = req.user; // `req.user` is populated by the authentication middleware
    res.status(200).json({ message: 'User profile', user });
};

module.exports = {
    httpRegisterUser,
    httpLoginUser,
    httpGetUserProfile,
};
