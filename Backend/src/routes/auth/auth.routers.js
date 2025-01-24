const express = require("express");
const {
    httpRegisterUser,
    httpLoginUser,
    httpGetDashbordInfo,
} = require("./auth.controller");

const authRouter = express.Router();

// Register route
authRouter.post("/register", httpRegisterUser);


authRouter.post("/login", httpLoginUser);
authRouter.get('/dashbordInfo', httpGetDashbordInfo);
authRouter.get("/", (req, res) => {
    res.send("Welcome Admin api");
});

module.exports = authRouter;
