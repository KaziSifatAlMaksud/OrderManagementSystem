import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
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
        const response = await fetch(`${config.apiUrl}/orders/`);
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

  // Handle delete button
  const handleDelete = async (id) => {
    console.log("Delete order with id:", id);

    try {
      const response = await fetch(`${config.apiUrl}/orders/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order deleted successfully:", data);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== id)
        );
      } else {
        console.error("Failed to delete order:", data.error || data);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Handle status change
  const handleStatusChange = async (id) => {
    const order = orders.find((order) => order.id === id);
    if (!order) return;

    const newStatus = order.status === "Completed" ? "Pending" : "Completed";

    try {
      const response = await fetch(`${config.apiUrl}/orders/action/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Order status updated successfully") {
        console.log("Order status updated:", data);
        setOrders((prevOrders) =>
          prevOrders.map((o) =>
            o.id === id ? { ...o, status: newStatus } : o
          )
        );
      } else {
        console.error("Failed to update order status:", data);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4 display-6">Order List</h1>

        <table className="table table-striped table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>User Email</th>
              <th>Product Name</th>
              <th>Product Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Net Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_name}</td>
                <td>{order.user_email}</td>
                <td>{order.product_name}</td>
                <td>Tk.{order.product_price.toFixed(2)}</td>
                <td>{order.qty}</td>
                <td>Tk.{order.discount.toFixed(2)}</td>
                <td>Tk.{order.net_total.toFixed(2)}</td>
                <td>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`statusSwitch-${order.id}`}
                      checked={order.status === "Completed"}
                      onChange={() => handleStatusChange(order.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`statusSwitch-${order.id}`}
                    >
                      {order.status}
                    </label>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(order.id)}
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrderList;
