const { connection } = require("../utils/dbConnect");

// GET
async function getSales() {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM sales", (error, results) => {
      if (error) {
        return reject({ message: "Error getting products:", error: error });
      }
      return resolve({ status: "OK", data: results });
    });
  });
}

module.exports = { getSales };
