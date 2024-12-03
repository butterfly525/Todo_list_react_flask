import '../styles/TaskList.css';
import '../styles/Forms.css';
import SortButtons from './SortButtons';
import Pagination from './Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Notification from './Notification';
import { updateStatusTask, updateTextTask } from '../store/actions';
const TaskList = () => {

    const tasks = useSelector(state => state.task.tasks);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setcurrentTaskId] = useState(null);
    const [newText, setNewText] = useState('');
    const [usernameTask, setUserNameTask] = useState('');
    // const [notification, setNotification] = useState('');

    const handleEdit = (task) => {
        setIsEditing(true);
        setcurrentTaskId(task.id);
        setNewText(task.text); // Устанавливаем текущее значение текста задачи
        setUserNameTask(task.username);
    };

    const handleChange = (e) => {
        setNewText(e.target.value); // Обновляем текст задачи

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskId) {
            dispatch(updateTextTask(taskId, newText));
            setIsEditing(false); // Закрываем форму редактирования
            setcurrentTaskId(null); // Сбрасываем текущее задание
        }

    };

    const handleCheckboxChange = (taskId) => {
        dispatch(updateStatusTask(taskId));
    };
    // const sortBy = useSelector(state => state.task.sortBy);

    // const sortTasks = (tasks, sortBy) => {
    //     const [field, order] = sortBy.split(' ');
    //     return tasks.slice().sort((a, b) => {
    //         const aField = a[field] || ""; // Используем пустую строку, если значение не определено
    //         const bField = b[field] || ""; // Используем пустую строку, если значение не определено

    //         if (order === 'asc') {
    //             return aField.localeCompare(bField);
    //         } else {
    //             return bField.localeCompare(aField);
    //         }
    //     });
    // };

    // const sortedTasks = sortTasks(tasks, sortBy);
    return (
        <div className="tasks">
            <SortButtons />
            <ul className="task-list">
                {Array.isArray(tasks) && tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : 'not-completed'}`}>
                        <div className="task-header">
                            <div><span className="task-username">{task.username} </span>
                                <span className="task-email">({task.email})</span></div>
                            <div className='status-block'><span className="task-status">{task.completed ? "Завершена" : "Не завершена"}</span>
                                {isAuthenticated && !task.completed && (
                                    <div>
                                        <label>Отметить как выполненную </label>
                                        <input
                                            type="checkbox"
                                            onChange={() => handleCheckboxChange(task.id)} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="task-block">
                            <span className="task-text">{task.text}</span>
                            {isAuthenticated && !task.completed && (
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(task)}>
                                    Редактировать
                                </button>
                            )}</div>
                    </li>
                ))}
            </ul>
            {isEditing && taskId && (
                <form className="form-container" onSubmit={handleSubmit}>
                    <label htmlFor="task-text">Редактирование задачи пользователя {usernameTask}:</label>
                    <textarea
                        type="text"
                        id="task-text"
                        value={newText}
                        onChange={handleChange}
                    />
                    <button type="submit">Сохранить</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Отмена</button>
                    {/* <Notification message={notification.message} type={notification.type} /> */}
                </form>
            )}

            <Pagination />
        </div>
    );
}

export default TaskList;