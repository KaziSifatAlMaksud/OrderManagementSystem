const express = require('express');
const {
    httpRegisterUser,
    httpLoginUser,
    httpGetUserProfile,
} = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authenticateToken');

const userRouter = express.Router();

// Route to register a new user
userRouter.post('/register', httpRegisterUser);

// Route to log in and get a JWT
userRouter.post('/login', httpLoginUser);

// Route to get user profile (protected)
userRouter.get('/profile', authenticateToken, httpGetUserProfile);

module.exports = userRouter;
