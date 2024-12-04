import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPageAction } from '../store/taskReducer'
import '../styles/Pagination.css';


const Pagination = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.task.currentPage);
    const totalPages = useSelector(state => state.task.totalPages);
    const pages = [...Array(totalPages).keys()].map(i => i + 1); // Массив страниц
    
    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPageAction(pageNumber)); // Устанавливаем текущую страницу
    };

    return (
        <nav className="pagination">
            <ul className="pagination-list">
                {pages.map(page => (
                    <li key={page}>
                        <button
                            onClick={() => handlePageChange(page)}
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