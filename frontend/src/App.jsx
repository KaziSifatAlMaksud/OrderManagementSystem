import React from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/product/ProductList";
import AddProduct from "./pages/product/ProductCreate";
import Promotions from "./pages/promotions/PromotionList";
import AddPromotion from "./pages/promotions/PromotionCreate";
// import Order from "./pages/order/OrderList";

import ViewProduct from "./pages/viewProduct/ProductView";
import PlaceOrderPage from "./pages/viewProduct/PlaceOrder";
import Signup from "./pages/users/Signup";
import Signin from "./pages/users/Signin";
// import Register from "./pages/users/Register";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
         <Route path="/signup" element={<Signup />} />
         <Route Path="/signin" element={<Signin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/Promotions" element={<Promotions />} />
        <Route path="/add-Promotion" element={<AddPromotion />} />
        <Route path="/viewproduct" element={<ViewProduct />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        
      </Routes>
    </div>
  );
};

export default App;
