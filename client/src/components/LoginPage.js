import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Forms.css';
import { loginAction } from '../store/authReducer';

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Неверное имя пользователя или пароль.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            dispatch(loginAction({ token: data.access_token }));
            setFormData({ username: '', password: '' });
            navigate('/');
        } catch (error) {
            console.error('Ошибка:', error.message);
        }
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