import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/product/ProductList";
import AddProduct from "./pages/product/ProductCreate";
import Promotions from "./pages/promotions/PromotionList";
// import Order from "./pages/order/OrderList";

import ViewProduct from "./pages/viewProduct/ProductView";
import PlaceOrderPage from "./pages/viewProduct/PlaceOrder";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Signup from "./pages/users/Signup";
// import Register from "./pages/users/Register";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route Path="/login" element={<Login />} />
        <Route Path="/signup" element={<Register />} />
        <Route path="/Promotions" element={<Promotions />} />
        <Route path="/viewproduct" element={<ViewProduct />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        
      </Routes>
    </div>
  );
};

export default App;
