
import React, { useState, useEffect } from "react";
import "../styles/Users.css";
import Pagination from "../components/Pagination";

function Users() {

    // Load Users from localStorage
    const [users, setUsers] = useState(() => {

        const savedUsers = localStorage.getItem("users");

        if (savedUsers) {
            return JSON.parse(savedUsers);
        }

        return [
            { id: 1, name: "Ahmad Ali", email: "ahmad@gmail.com", role: "Admin", status: "Active" },
            { id: 2, name: "Mohammad Hassan", email: "mohammad@gmail.com", role: "User", status: "Active" },
            { id: 3, name: "Sarah Ahmad", email: "sarah@gmail.com", role: "User", status: "Inactive" },
            { id: 4, name: "Ali Khalil", email: "ali@gmail.com", role: "User", status: "Active" },
            { id: 5, name: "Omar Khaled", email: "omar@gmail.com", role: "User", status: "Active" },
            { id: 6, name: "Lara Samir", email: "lara@gmail.com", role: "User", status: "Inactive" },
            { id: 7, name: "Karim Nasser", email: "karim@gmail.com", role: "User", status: "Active" },
            { id: 8, name: "Maya Hassan", email: "maya@gmail.com", role: "User", status: "Active" },
            { id: 9, name: "Rami Ali", email: "rami@gmail.com", role: "User", status: "Active" },
            { id: 10, name: "Nour Ahmad", email: "nour@gmail.com", role: "User", status: "Inactive" },
            { id: 11, name: "Tarek Saleh", email: "tarek@gmail.com", role: "User", status: "Active" },
            { id: 12, name: "Jana Khalil", email: "jana@gmail.com", role: "User", status: "Active" }
        ];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "User",
        status: "Active"
    });

    const itemsPerPage = 5;

    // Save Users in localStorage
    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    // Search Users
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentUsers = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Reset Page When Searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Keep Current Page Valid
    useEffect(() => {
        const lastPage = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

        if (currentPage > lastPage) {
            setCurrentPage(lastPage);
        }
    }, [filteredUsers.length, currentPage]);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Open Add Form
    const handleAdd = () => {
        setEditId(null);

        setFormData({
            name: "",
            email: "",
            role: "User",
            status: "Active"
        });

        setShowForm(true);
    };

    // Open Edit Form
    const handleEdit = (user) => {
        setEditId(user.id);

        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });

        setShowForm(true);
    };

    // Add or Update User
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId !== null) {

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === editId
                        ? { ...user, ...formData }
                        : user
                )
            );

        } else {

            const newUser = {
                id: Date.now(),
                ...formData
            };

            setUsers((previousUsers) => [
                ...previousUsers,
                newUser
            ]);

        }

        setShowForm(false);
        setEditId(null);
        setCurrentPage(1);
    };

    // Delete User
    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (confirmDelete) {
            setUsers((previousUsers) =>
                previousUsers.filter((user) => user.id !== id)
            );
        }
    };

    return (
        <div className="users-page">

            {/* Header */}
            <div className="users-header">

                <div>
                    <h2>Users Management</h2>
                    <p>Manage all registered users</p>
                </div>

                <button
                    className="add-user-btn"
                    onClick={handleAdd}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add User
                </button>

            </div>

            {/* Users Count */}
            <div className="users-count">
                <h5>Total Users</h5>
                <h3>{users.length}</h3>
            </div>

            {/* Search */}
            <div className="users-search">

                <i className="bi bi-search"></i>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            {/* Users Table */}
            <div className="users-table-container">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {currentUsers.length > 0 ? (

                                currentUsers.map((user, index) => (

                                    <tr key={user.id}>

                                        <td>{startIndex + index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>

                                        <td>
                                            <span
                                                className={`status-badge ${
                                                    user.status === "Active"
                                                        ? "active-status"
                                                        : "inactive-status"
                                                }`}
                                            >
                                                {user.status}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(user)}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="6" className="text-center">
                                        No users found
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

            {/* Add / Edit Form */}
            {showForm && (

                <div className="user-modal">

                    <div className="user-modal-content">

                        <div className="modal-header-custom">

                            <h4>
                                {editId !== null ? "Edit User" : "Add New User"}
                            </h4>

                            <button
                                className="close-modal-btn"
                                onClick={() => setShowForm(false)}
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Role</label>
                                <select
                                    name="role"
                                    className="form-select"
                                    value={formData.role}
                                    onChange={handleChange}
                                >
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    {editId !== null ? "Update User" : "Save User"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Users;
