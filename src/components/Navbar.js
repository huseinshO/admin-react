import React from "react";
import "../styles/Navbar.css";

function Navbar({ onMenuClick, sidebarOpen }) {
    // Demo logout action: this project does not use authentication/backend.
    const handleLogout = () => {
        window.alert("You have been logged out (demo). No account session is connected.");
    };

    return (
        <header className="top-navbar">
            <div className="navbar-left">
                <button
                    type="button"
                    className="sidebar-toggle-btn"
                    onClick={onMenuClick}
                    aria-label="Toggle navigation menu"
                    aria-expanded={sidebarOpen}
                >
                    <i className="bi bi-list"></i>
                </button>
                <h4>Dashboard</h4>
            </div>

            <div className="navbar-right">
                <div className="admin-profile">
                    <div className="admin-avatar">A</div>
                    <div className="admin-info">
                        <h6>Admin</h6>
                        <span>Administrator</span>
                    </div>
                </div>

                <button className="logout-btn" type="button" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                </button>
            </div>
        </header>
    );
}

export default Navbar;
