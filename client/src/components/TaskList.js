import '../styles/TaskList.css';
import '../styles/Forms.css';
import { setIdEditingTaskAction, setTextEditingTaskAction, setUsernameEditingTaskAction  } from '../store/taskReducer';
import { useSelector, useDispatch } from 'react-redux';
import { updateStatusTask } from '../store/actions';
import EditTaskForm from './EditTaskForm';
import Pagination from './Pagination';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.task.tasks);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const editingTaskId = useSelector(state => state.task.editingTaskId);
 

    function handleEdit(task) {
        dispatch(setIdEditingTaskAction(task.id));
        dispatch(setTextEditingTaskAction(task.text));
        dispatch(setUsernameEditingTaskAction(task.username));
    }

    const handleCheckboxChange = (taskId) => {
        dispatch(updateStatusTask(taskId));
    };

    return (
        <div className="tasks">

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
            {editingTaskId && (
                <EditTaskForm />
            )}
            <Pagination />
        </div>
    );
}

export default TaskList;