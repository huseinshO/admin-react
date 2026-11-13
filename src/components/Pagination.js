
import React from "react";
import "../styles/Pagination.css";

function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="pagination-container">

            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <i className="bi bi-chevron-left"></i>
                Previous
            </button>

            {pages.map((page) => (

                <button
                    key={page}
                    className={`pagination-number ${
                        currentPage === page ? "active-page" : ""
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>

            ))}

            <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
                <i className="bi bi-chevron-right"></i>
            </button>

        </div>
    );
}

export default Pagination;
