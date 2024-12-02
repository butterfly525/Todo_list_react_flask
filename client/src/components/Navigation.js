import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import '../styles/Navigation.css'; // Импортируем стили
const Navigation = () => {
    const navigate = useNavigate(); // Получаем функцию navigate

    const handleAddTask = () => {
        navigate('/add-task'); // Переход на страницу добавления задачи
    };

    const handleLogin = () => {
        navigate('/login'); // Переход на страницу авторизации
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
                <li>
                    <button className="navigation-button" onClick={handleLogin}>Авторизоваться</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;