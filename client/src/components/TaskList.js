import '../styles/TaskList.css';
import '../styles/Forms.css';
import SortButtons from './SortButtons';
import Pagination from './Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateStatusTask, updateTextTask } from '../store/actions';


const TaskList = () => {

    const tasks = useSelector(state => state.task.tasks);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [taskId, setcurrentTaskId] = useState(null);
    const [newText, setNewText] = useState('');
    const [usernameTask, setUserNameTask] = useState('');

    function handleEdit(task) {
        setIsEditing(true);
        setcurrentTaskId(task.id);
        setNewText(task.text); // Устанавливаем текущее значение текста задачи
        setUserNameTask(task.username);
    }

    const handleChange = (e) => {
        setNewText(e.target.value); // Обновляем текст задачи
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTextTask(taskId, newText));
        setIsEditing(false); // Закрываем форму редактирования
        setcurrentTaskId(null); // Сбрасываем текущее задание
    };

    const handleCheckboxChange = (taskId) => {
        dispatch(updateStatusTask(taskId));
    };

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

                </form>
            )}

            <Pagination />
        </div>
    );
}

export default TaskList;