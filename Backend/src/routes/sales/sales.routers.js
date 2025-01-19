const express = require('express');
const { httpGetAllSales } = require('./sales.controller');
const salesRouter = express.Router();

salesRouter.get('/', httpGetAllSales);

module.exports = salesRouter;