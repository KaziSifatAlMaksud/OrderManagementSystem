const express = require("express");
const { connection } = require("./utils/dbConnect");
const app = express();
const cors = require('cors');
const productsRouter = require("./routes/products/products.routers");
const promotionsRouter = require("./routes/promotion/promotion.routers");
const ordersRouter = require('./routes/order/orders.routers');
// const userRouter = require("./routes/user/user.routers");
const morgan = require('morgan');


//const salesRouter = require("./routes/sales/sales.routers");

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use('/products', productsRouter);
app.use('/promotions', promotionsRouter);

app.use('/orders', ordersRouter);

//app.use('/sales', salesRouter);
// app.use('/users', userRouter);



// root route
app.get('/', (req, res) => {
    res.send(" Test");
})


module.exports = app;