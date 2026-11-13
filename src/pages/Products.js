
import React, { useState, useEffect } from "react";
import "../styles/Products.css";
import Pagination from "../components/Pagination";

function Products() {

    // Load Products from localStorage
    const [products, setProducts] = useState(() => {

        const savedProducts = localStorage.getItem("products");

        if (savedProducts) {
            return JSON.parse(savedProducts);
        }

        return [
            { id: 1, name: "Laptop", category: "Electronics", price: 850, stock: 15, status: "Available" },
            { id: 2, name: "Smartphone", category: "Electronics", price: 500, stock: 25, status: "Available" },
            { id: 3, name: "Headphones", category: "Accessories", price: 75, stock: 0, status: "Out of Stock" },
            { id: 4, name: "Keyboard", category: "Accessories", price: 45, stock: 10, status: "Available" },
            { id: 5, name: "Monitor", category: "Electronics", price: 250, stock: 5, status: "Available" },
            { id: 6, name: "Mouse", category: "Accessories", price: 25, stock: 30, status: "Available" },
            { id: 7, name: "Tablet", category: "Electronics", price: 350, stock: 8, status: "Available" },
            { id: 8, name: "USB Cable", category: "Accessories", price: 10, stock: 0, status: "Out of Stock" },
            { id: 9, name: "Jacket", category: "Clothing", price: 60, stock: 12, status: "Available" },
            { id: 10, name: "T-Shirt", category: "Clothing", price: 20, stock: 20, status: "Available" },
            { id: 11, name: "Camera", category: "Electronics", price: 700, stock: 4, status: "Available" },
            { id: 12, name: "Speaker", category: "Accessories", price: 90, stock: 7, status: "Available" }
        ];
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        category: "Electronics",
        price: "",
        stock: "",
        status: "Available"
    });

    const itemsPerPage = 5;

    // Save Products in localStorage
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    // Search Products
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;

    const currentProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Reset Page When Searching
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    // Keep Current Page Valid
    useEffect(() => {
        const lastPage = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

        if (currentPage > lastPage) {
            setCurrentPage(lastPage);
        }
    }, [filteredProducts.length, currentPage]);

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
            category: "Electronics",
            price: "",
            stock: "",
            status: "Available"
        });

        setShowForm(true);
    };

    // Open Edit Form
    const handleEdit = (product) => {
        setEditId(product.id);

        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            status: product.status
        });

        setShowForm(true);
    };

    // Add or Update Product
    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock)
        };

        if (editId !== null) {

            setProducts((previousProducts) =>
                previousProducts.map((product) =>
                    product.id === editId
                        ? { ...product, ...productData }
                        : product
                )
            );

        } else {

            const newProduct = {
                id: Date.now(),
                ...productData
            };

            setProducts((previousProducts) => [
                ...previousProducts,
                newProduct
            ]);

        }

        setShowForm(false);
        setEditId(null);
        setCurrentPage(1);
    };

    // Delete Product
    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (confirmDelete) {
            setProducts((previousProducts) =>
                previousProducts.filter((product) => product.id !== id)
            );
        }
    };

    return (

        <div className="products-page">

            {/* Header */}
            <div className="products-header">

                <div>
                    <h2>Products Management</h2>
                    <p>Manage all your products</p>
                </div>

                <button
                    className="add-product-btn"
                    onClick={handleAdd}
                >
                    <i className="bi bi-plus-lg"></i>
                    Add Product
                </button>

            </div>

            {/* Products Count */}
            <div className="products-count">
                <h5>Total Products</h5>
                <h3>{products.length}</h3>
            </div>

            {/* Search */}
            <div className="products-search">

                <i className="bi bi-search"></i>

                <input
                    type="text"
                    placeholder="Search by product or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            {/* Products Table */}
            <div className="products-table-container">

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {currentProducts.length > 0 ? (

                                currentProducts.map((product, index) => (

                                    <tr key={product.id}>

                                        <td>{startIndex + index + 1}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>${product.price}</td>
                                        <td>{product.stock}</td>

                                        <td>
                                            <span
                                                className={`product-status ${
                                                    product.status === "Available"
                                                        ? "available-status"
                                                        : "out-stock-status"
                                                }`}
                                            >
                                                {product.status}
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                className="product-edit-btn"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>

                                            <button
                                                className="product-delete-btn"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="7" className="text-center">
                                        No products found
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

                <div className="product-modal">

                    <div className="product-modal-content">

                        <div className="product-modal-header">

                            <h4>
                                {editId !== null ? "Edit Product" : "Add New Product"}
                            </h4>

                            <button
                                className="product-close-btn"
                                onClick={() => setShowForm(false)}
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label>Product Name</label>

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
                                <label>Category</label>

                                <select
                                    name="category"
                                    className="form-select"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="Electronics">Electronics</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Clothing">Clothing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label>Price ($)</label>

                                <input
                                    type="number"
                                    name="price"
                                    className="form-control"
                                    value={formData.price}
                                    onChange={handleChange}
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Stock</label>

                                <input
                                    type="number"
                                    name="stock"
                                    className="form-control"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Status</label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Out of Stock">Out of Stock</option>
                                </select>
                            </div>

                            <div className="product-modal-actions">

                                <button
                                    type="button"
                                    className="product-cancel-btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="product-save-btn"
                                >
                                    {editId !== null ? "Update Product" : "Save Product"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Products;
