import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortByAction } from '../store/taskReducer';

const SortButtons = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector(state => state.task.sortBy);

    const handleSortChange = (field) => {
        // Устанавливаем направление сортировки
        const newSort = sortBy.startsWith(field) && sortBy.endsWith('asc') ? `${field} desc` : `${field} asc`;
        dispatch(setSortByAction(newSort));
        localStorage.setItem('sortBy', newSort); // Сохраняем в localStorage
    };

    return (
        <div className="sort-buttons">
            <button className='edit-btn' onClick={() => handleSortChange('username')}>
                Сортировать по имени {sortBy === 'username asc' ? '↑' : '↓'}
            </button>
            <button className='edit-btn' onClick={() => handleSortChange('email')}>
                Сортировать по email {sortBy === 'email asc' ? '↑' : '↓'}
            </button>
            <button className='edit-btn' onClick={() => handleSortChange('text')}>
                Сортировать по тексту {sortBy === 'text asc' ? '↑' : '↓'}
            </button>
        </div>
    );
};

export default SortButtons;