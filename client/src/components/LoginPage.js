import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/Forms.css'; // Импортируем стили, если они находятся в этом файле
import { loginAction } from '../store/authReducer';
const LoginPage = () => {
    const dispatch = useDispatch();
    const isauth = useSelector(state => state.auth.isAuthenticated);
    console.log(isauth);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Логика авторизации
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Неверное имя пользователя или пароль.');
            }
            return response.json();
        })
        .then(data => {
            // Диспатчим действие для обновления состояния
            dispatch(loginAction({ token: data.access_token }));
            // Сброс формы после успешной отправки
            setFormData({ username: '', password: '' });
        })
        .catch(error => {
            console.error('Ошибка:', error.message);
            alert(error.message); // Показываем сообщение об ошибке пользователю
        });
    };

    return (
        <div className='container'>
            <h1 className='centered-title'>Авторизация</h1>
            <form className="form-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Имя пользователя"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;