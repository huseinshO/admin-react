
import React, { useState, useEffect } from "react";
import "../styles/Orders.css";
import Pagination from "../components/Pagination";

function Orders() {

    // Load Orders from localStorage
    const [orders, setOrders] = useState(() => {

        const savedOrders = localStorage.getItem("orders");

        if (savedOrders) {
            return JSON.parse(savedOrders);
        }

        return [
            { id: 1001, customer: "Ahmad Ali", product: "Laptop", date: "2026-11-01", total: 850, status: "Completed" },
            { id: 1002, customer: "Mohammad Hassan", product: "Smartphone", date: "2026-11-02", total: 500, status: "Pending" },
            { id: 1003, customer: "Sarah Ahmad", product: "Headphones", date: "2026-11-03", total: 75, status: "Cancelled" },
            { id: 1004, customer: "Ali Khalil", product: "Keyboard", date: "2026-11-04", total: 45, status: "Completed" },
            { id: 1005, customer: "Mohammad Ali", product: "Monitor", date: "2026-11-05", total: 250, status: "Pending" },
            { id: 1006, customer: "Omar Khaled", product: "Mouse", date: "2026-11-06", total: 25, status: "Completed" },
            { id: 1007, customer: "Lara Samir", product: "Tablet", date: "2026-11-07", total: 350, status: "Pending" },
            { id: 1008, customer: "Karim Nasser", product: "Camera", date: "2026-11-08", total: 700, status: "Completed" },
            { id: 1009, customer: "Maya Hassan", product: "Speaker", date: "2026-11-09", total: 90, status: "Cancelled" },
            { id: 1010, customer: "Rami Ali", product: "Jacket", date: "2026-11-10", total: 60, status: "Pending" },
            { id: 1011, customer: "Nour Ahmad", product: "T-Shirt", date: "2026-11-11", total: 20, status: "Completed" },
            { id: 1012, customer: "Jana Khalil", product: "USB Cable", date: "2026-11-12", total: 10, status: "Pending" }
        ];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    // Save Orders in localStorage
    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    // Search Orders
    const filteredOrders = orders.filter((order) =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toString().includes(searchTerm)
    );

    // Pagination
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentOrders = filteredOrders.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Reset Page When Searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Keep Current Page Valid
    useEffect(() => {
        const lastPage = Math.max(1, Math.ceil(filteredOrders.length / itemsPerPage));

        if (currentPage > lastPage) {
            setCurrentPage(lastPage);
        }
    }, [filteredOrders.length, currentPage]);

    // Change Order Status
    const handleStatusChange = (id, newStatus) => {

        setOrders((previousOrders) =>
            previousOrders.map((order) =>
                order.id === id
                    ? { ...order, status: newStatus }
                    : order
            )
        );

    };

    // Edit Order using simple browser prompts (no backend required)
    const handleEdit = (order) => {
        const customer = window.prompt("Customer name:", order.customer);
        if (customer === null) return;

        const product = window.prompt("Product name:", order.product);
        if (product === null) return;

        const totalInput = window.prompt("Order total:", order.total);
        if (totalInput === null) return;

        const total = Number(totalInput);
        if (!customer.trim() || !product.trim() || totalInput.trim() === "" || Number.isNaN(total) || total < 0) {
            window.alert("Please enter valid customer, product and total values.");
            return;
        }

        setOrders((previousOrders) =>
            previousOrders.map((item) =>
                item.id === order.id
                    ? { ...item, customer: customer.trim(), product: product.trim(), total }
                    : item
            )
        );
    };

    // Delete Order
    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this order?"
        );

        if (confirmDelete) {

            setOrders((previousOrders) =>
                previousOrders.filter((order) => order.id !== id)
            );

        }

    };

    return (

        <div className="orders-page">

            {/* Header */}
            <div className="orders-header">
                <div>
                    <h2>Orders Management</h2>
                    <p>Manage and track customer orders</p>
                </div>
            </div>

            {/* Orders Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="order-stat-card">
                        <h6>Total Orders</h6>
                        <h3>{orders.length}</h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="order-stat-card">
                        <h6>Completed Orders</h6>
                        <h3>
                            {orders.filter(
                                (order) => order.status === "Completed"
                            ).length}
                        </h3>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="order-stat-card">
                        <h6>Pending Orders</h6>
                        <h3>
                            {orders.filter(
                                (order) => order.status === "Pending"
                            ).length}
                        </h3>
                    </div>
                </div>

            </div>

            {/* Search */}
            <div className="orders-search">

                <i className="bi bi-search"></i>

                <input
                    type="text"
                    placeholder="Search by order ID, customer or product..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            {/* Orders Table */}
            <div className="orders-table-container">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {currentOrders.length > 0 ? (

                                currentOrders.map((order) => (

                                    <tr key={order.id}>

                                        <td>#{order.id}</td>
                                        <td>{order.customer}</td>
                                        <td>{order.product}</td>
                                        <td>{order.date}</td>
                                        <td>${order.total}</td>

                                        <td>
                                            <span
                                                className={`order-status ${
                                                    order.status === "Completed"
                                                        ? "completed-status"
                                                        : order.status === "Pending"
                                                        ? "pending-status"
                                                        : "cancelled-status"
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                className="order-edit-btn"
                                                onClick={() => handleEdit(order)}
                                                title="Edit Order"
                                                type="button"
                                            >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>

                                            <select
                                                className="status-select"
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order.id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>

                                            <button
                                                className="order-delete-btn"
                                                onClick={() => handleDelete(order.id)}
                                                title="Delete Order"
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No orders found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

        </div>
    );
}

export default Orders;
