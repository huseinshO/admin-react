
import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";

function Dashboard() {

    // Load Users
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem("users");

        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    // Load Products
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("products");

        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    // Load Orders
    const [orders, setOrders] = useState(() => {
        const savedOrders = localStorage.getItem("orders");

        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    // Update Dashboard Data
    useEffect(() => {

        const updateDashboard = () => {

            const savedUsers = localStorage.getItem("users");
            const savedProducts = localStorage.getItem("products");
            const savedOrders = localStorage.getItem("orders");

            setUsers(savedUsers ? JSON.parse(savedUsers) : []);
            setProducts(savedProducts ? JSON.parse(savedProducts) : []);
            setOrders(savedOrders ? JSON.parse(savedOrders) : []);

        };

        window.addEventListener("storage", updateDashboard);

        return () => {
            window.removeEventListener("storage", updateDashboard);
        };

    }, []);

    // Calculate Statistics
    const totalUsers = users.length;

    const totalProducts = products.length;

    const totalOrders = orders.length;

    const totalRevenue = orders
        .filter((order) => order.status === "Completed")
        .reduce((total, order) => total + Number(order.total), 0);

    // Prepare order status data for the bar chart
    const orderStatusData = [
        { label: "Completed", count: orders.filter((order) => order.status === "Completed").length },
        { label: "Pending", count: orders.filter((order) => order.status === "Pending").length },
        { label: "Cancelled", count: orders.filter((order) => order.status === "Cancelled").length }
    ];

    const maxOrderCount = Math.max(...orderStatusData.map((item) => item.count), 1);

    // Get Recent Orders
    const recentOrders = [...orders]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    return (

        <div className="dashboard">

            {/* Dashboard Header */}
            <div className="dashboard-header">
                <h2>Dashboard</h2>
                <p>Welcome back, Admin!</p>
            </div>

            {/* Statistics Cards */}
            <div className="row g-4 mt-2">

                <div className="col-md-6 col-xl-3">
                    <div className="stat-card">

                        <div className="stat-icon users-icon">
                            <i className="bi bi-people"></i>
                        </div>

                        <h6>Total Users</h6>
                        <h3>{totalUsers.toLocaleString()}</h3>
                        <p>Registered users</p>

                    </div>
                </div>

                <div className="col-md-6 col-xl-3">
                    <div className="stat-card">

                        <div className="stat-icon products-icon">
                            <i className="bi bi-box-seam"></i>
                        </div>

                        <h6>Total Products</h6>
                        <h3>{totalProducts.toLocaleString()}</h3>
                        <p>Available products</p>

                    </div>
                </div>

                <div className="col-md-6 col-xl-3">
                    <div className="stat-card">

                        <div className="stat-icon orders-icon">
                            <i className="bi bi-cart"></i>
                        </div>

                        <h6>Total Orders</h6>
                        <h3>{totalOrders.toLocaleString()}</h3>
                        <p>Received orders</p>

                    </div>
                </div>

                <div className="col-md-6 col-xl-3">
                    <div className="stat-card">

                        <div className="stat-icon revenue-icon">
                            <i className="bi bi-currency-dollar"></i>
                        </div>

                        <h6>Total Revenue</h6>
                        <h3>${totalRevenue.toLocaleString()}</h3>
                        <p>Completed orders revenue</p>

                    </div>
                </div>

            </div>

            {/* Orders Status Bar Chart */}
            <div className="chart-card mt-4">
                <div className="section-header">
                    <h4>Orders Overview</h4>
                    <span className="chart-subtitle">Orders by status</span>
                </div>

                <div className="bar-chart" role="img" aria-label="Bar chart showing orders by status">
                    {orderStatusData.map((item) => (
                        <div className="bar-chart-item" key={item.label}>
                            <div className="bar-chart-value">{item.count}</div>
                            <div className="bar-chart-track">
                                <div
                                    className={`bar-chart-fill ${item.label.toLowerCase()}`}
                                    style={{ height: `${(item.count / maxOrderCount) * 100}%` }}
                                ></div>
                            </div>
                            <div className="bar-chart-label">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="recent-orders mt-4">

                <div className="section-header">
                    <h4>Recent Orders</h4>
                </div>

                <div className="table-responsive mt-3">

                    <table className="table table-hover align-middle">

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recentOrders.length > 0 ? (

                                recentOrders.map((order) => (

                                    <tr key={order.id}>

                                        <td>#{order.id}</td>

                                        <td>{order.customer}</td>

                                        <td>{order.product}</td>

                                        <td>${Number(order.total).toLocaleString()}</td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    order.status === "Completed"
                                                        ? "bg-success"
                                                        : order.status === "Pending"
                                                        ? "bg-warning text-dark"
                                                        : "bg-danger"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No orders available
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;
