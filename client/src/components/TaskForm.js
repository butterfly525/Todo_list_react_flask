import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/actions';
import '../styles/Forms.css';

const TaskForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        text: ''
    });
    // const [notification, setNotification] = useState('');
    const dispatch = useDispatch();
    // Обработчик изменения полей формы
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    // Обработчик отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(addTask(formData));
        resetForm(); // Сбрасываем форму после успешного добавления
        
    };

    // Сброс формы
    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            text: ''
        });
    };

    return (
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
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <textarea
                name="text"
                placeholder="Описание задачи"
                value={formData.text}
                onChange={handleChange}
                required
            />
            <button type="submit">Добавить задачу</button>
            {/* <Notification message={notification.message} type={notification.type} /> */}
        </form>
    );
};

export default TaskForm;