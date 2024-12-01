import React from 'react';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
    
    const pages = [...Array(totalPages).keys()].map(i => i + 1); // Массив страниц

    return (
        <nav className="pagination">
            <ul className="pagination-list">
                {pages.map(page => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`page-item ${currentPage === page ? 'active' : ''}`}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;