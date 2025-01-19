const { getSales } = require("../../models/sales.model");

// GET
async function httpGetAllSales(req, res) {
    return res.status(200).json(await getSales());
  }
  
module.exports = { httpGetAllSales }