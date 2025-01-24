import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import config from "../config/config.js";
import { FaUsers, FaUserShield, FaShoppingCart, FaBox, FaTags } from "react-icons/fa";

const Dashboard = () => {
  const [sessionValue, setSessionValue] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0, // This value is not provided in your response, but keeping it for consistency
    totalOrders: 0,
    totalProducts: 0,
    totalPromotions: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem("Sifat"); 
    const sessionData = userSession ? JSON.parse(userSession) : null;

    if (!sessionData || sessionData.type !== "admin") {
      navigate("/signin"); // Redirect to sign-in page if not an admin or session is invalid
      return;
    }

    setSessionValue(sessionData.name || "Admin"); // Update session value for display

    const fetchStats = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/dashbordInfo`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        // Assuming the response structure is as you described
        setStats({
          totalUsers: data.data.totalUsers || 0,
          totalAdmins: data.data.totalAdmin || 0,// Placeholder, since the response doesn't contain this
          totalProducts: data.data.totalProducts || 0,
          totalPromotions: data.data.totalPromotions || 0,
          totalOrders: data.data.totalOrders || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1 className="mb-4 text-center display-4">Admin Dashboard</h1>
        <div className="row g-4">
          {/* Total User Accounts */}
          <div className="col-md-4 col-lg-3">
            <div className="card text-white bg-primary">
              <div className="card-body d-flex align-items-center">
                <FaUsers className="me-3 fs-1" />
                <div>
                  <h5 className="card-title mb-0">Total Users</h5>
                  <p className="card-text">{stats.totalUsers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Admin Accounts */}
          <div className="col-md-4 col-lg-3">
            <div className="card text-white bg-success">
              <div className="card-body d-flex align-items-center">
                <FaUserShield className="me-3 fs-1" />
                <div>
                  <h5 className="card-title mb-0">Total Admins</h5>
                  <p className="card-text">{stats.totalAdmins}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="col-md-4 col-lg-3">
            <div className="card text-white bg-warning">
              <div className="card-body d-flex align-items-center">
                <FaShoppingCart className="me-3 fs-1" />
                <div>
                  <h5 className="card-title mb-0">Total Orders</h5>
                  <p className="card-text">{stats.totalOrders}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="col-md-4 col-lg-3">
            <div className="card text-white bg-info">
              <div className="card-body d-flex align-items-center">
                <FaBox className="me-3 fs-1" />
                <div>
                  <h5 className="card-title mb-0">Total Products</h5>
                  <p className="card-text">{stats.totalProducts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Total Promotions */}
          <div className="col-md-4 col-lg-3">
            <div className="card text-white bg-danger">
              <div className="card-body d-flex align-items-center">
                <FaTags className="me-3 fs-1" />
                <div>
                  <h5 className="card-title mb-0">Total Promotions</h5>
                  <p className="card-text">{stats.totalPromotions}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-secondary">
            Logged in as: <span className="text-primary">{sessionValue}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
