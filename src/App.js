import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((previous) => !previous);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <BrowserRouter>
            <div className="admin-layout">
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

                {sidebarOpen && (
                    <button
                        type="button"
                        className="sidebar-backdrop"
                        aria-label="Close navigation menu"
                        onClick={closeSidebar}
                    />
                )}

                <div className="main-content">
                    <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />

                    <div className="page-content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/orders" element={<Orders />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
