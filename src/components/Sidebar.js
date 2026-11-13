import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar({ isOpen, onClose }) {
    const handleNavigation = () => {
        // Close the menu after selecting a page, especially on mobile.
        if (onClose) onClose();
    };

    return (
        <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
            <div className="sidebar-brand">
                <h3>AdminPanel</h3>
                <button
                    type="button"
                    className="sidebar-close-btn"
                    onClick={onClose}
                    aria-label="Close sidebar"
                >
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>

            <ul className="sidebar-menu">
                <li><NavLink to="/" end onClick={handleNavigation}><span>▦</span>Dashboard</NavLink></li>
                <li><NavLink to="/users" onClick={handleNavigation}><span>♙</span>Users</NavLink></li>
                <li><NavLink to="/products" onClick={handleNavigation}><span>▣</span>Products</NavLink></li>
                <li><NavLink to="/orders" onClick={handleNavigation}><span>▤</span>Orders</NavLink></li>
            </ul>

            <div className="sidebar-footer">
                <p>Admin Dashboard</p>
            </div>
        </aside>
    );
}

export default Sidebar;
