import React from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate

const Navigation = () => {
    const navigate = useNavigate(); // Получаем функцию navigate

    const handleAddTask = () => {
        navigate('/add-task'); // Переход на страницу добавления задачи
    };

    const handleLogin = () => {
        navigate('/login'); // Переход на страницу авторизации
    };
    
    const handleMain = () => {
        navigate('/'); // Переход на страницу авторизации
    };

    return (
        <nav>
            <ul>
                <li>
                    <button onClick={handleMain}>Главная страница</button>
                </li>
                <li>
                    <button onClick={handleAddTask}>Добавить задачу</button>
                </li>
                <li>
                    <button onClick={handleLogin}>Авторизоваться</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;