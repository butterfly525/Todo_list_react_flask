import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Navigation.css'; 

import { logoutAction } from '../store/authReducer';
const Navigation = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    
    const navigate = useNavigate(); // Получаем функцию navigate

    const handleAddTask = () => {
        navigate('/add-task'); // Переход на страницу добавления задачи
    };

    const handleLogin = () => {
        navigate('/login'); // Переход на страницу авторизации
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        dispatch(logoutAction());
        navigate('/'); 
    };

    const handleMain = () => {
        navigate('/'); // Переход на главную страницу
    };

    return (
        <nav className="navigation">
            <ul className="navigation-list">
                <li>
                    <button className="navigation-button" onClick={handleMain}>Главная страница</button>
                </li>
                <li>
                    <button className="navigation-button" onClick={handleAddTask}>Добавить задачу</button>
                </li>
                {isAuthenticated
                    ? (<li>
                        <button className="navigation-button" onClick={handleLogout}>Выйти</button>
                    </li>)
                    : (<li>
                        <button className="navigation-button" onClick={handleLogin}>Авторизоваться</button>
                    </li>)
                }
            </ul>
        </nav>
    );
};

export default Navigation;