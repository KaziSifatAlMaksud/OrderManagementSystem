const express = require("express");
const {
    httpRegisterUser,
    httpLoginUser,
} = require("./auth.controller");

const authRouter = express.Router();

// Register route
authRouter.post("/register", httpRegisterUser);

// Login route
authRouter.post("/login", httpLoginUser);

module.exports = authRouter;
