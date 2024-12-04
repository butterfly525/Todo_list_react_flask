import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/actions';
import { clearEditingFieldsAction, setTextEditingTaskAction, setUsernameEditingTaskAction, setUserEmailEditingTaskAction } from '../store/taskReducer'
import '../styles/Forms.css';

const TaskForm = () => {
    const dispatch = useDispatch();
    const newText = useSelector(state => state.task.newText);
    const usernameTask = useSelector(state => state.task.usernameTask);
    const userEmail = useSelector(state => state.task.userEmail);

    // Обработчик изменения полей формы
    const handleChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'username':
                dispatch(setUsernameEditingTaskAction(value));
                break;
            case 'email':
                dispatch(setUserEmailEditingTaskAction(value));
                break;
            case 'text':
                dispatch(setTextEditingTaskAction(value));
                break;
            default:
                console.log(`Unhandled input: ${name}`);
        }
    };
    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            username: usernameTask,
            email: userEmail,
            text: newText,
        };

        dispatch(addTask(formData));
        resetForm();
    };

    // Сброс формы
    const resetForm = () => {
        dispatch(clearEditingFieldsAction());
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                placeholder="Имя пользователя"
                value={usernameTask}
                onChange={handleChange}
                required
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={userEmail}
                onChange={handleChange}
                required
            />
            <textarea
                name="text"
                placeholder="Описание задачи"
                value={newText}
                onChange={handleChange}
                required
            />
            <button type="submit">Добавить задачу</button>
        </form>
    );
};

export default TaskForm;