import React, { useEffect, useState } from "react";
import UserHeader from "../../components/UserHader";// Fixed typo in component name
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Fetch orders on component load
  useEffect(() => {
    const userSession = sessionStorage.getItem("Sifat"); // Replace with your session key
    if (!userSession) {
      navigate("/signin"); // Redirect to login if no session
      return;
    }

    const fetchOrders = async () => {
      try {
        const user = JSON.parse(userSession); // Parse session data to get the user object
        const userEmail = user?.email; // Extract email from the session data

        if (!userEmail) {
          console.error("User email not found in session");
          return;
        }

        const response = await fetch(`${config.apiUrl}/orders/history`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }), // Send user email in request body
        });

        const data = await response.json();

        if (data.status === "OK" && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          console.error("Unexpected API response:", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <>
      <UserHeader />
      <div className="container mt-5">
        <h1 className="mb-4 display-4">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="alert alert-info" role="alert">
            You haven't ordered anything yet.
          </div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-4 mb-4" key={order.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Order ID: {order.id}</h5>
                    <p className="card-text">
                      <strong>Product ID:</strong> {order.product_id}
                    </p>
                    <p className="card-text">
                      <strong>Quantity:</strong> {order.qty}
                    </p>
                    <p className="card-text">
                      <strong>Unit Price:</strong> Tk.{order.unit_price.toFixed(2)}
                    </p>
                    <p className="card-text">
                      <strong>Discount:</strong> Tk.{order.discount.toFixed(2)}
                    </p>
                    <p className="card-text">
                      <strong>Net Total:</strong> Tk.{order.net_total.toFixed(2)}
                    </p>
                    <p className="card-text">
                      <strong>Status:</strong> {order.status}
                    </p>
                    <p className="card-text">
                      <strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="card-text">
                      <strong>Updated At:</strong> {new Date(order.updated_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistory;
