import '../styles/TaskList.css'; 

import {  useSelector } from 'react-redux';


const TaskList = () => {

    const tasks = useSelector(state => state.task.tasks);

    return (
        <div className="tasks">
        
            <ul className="task-list">
                {Array.isArray(tasks) && tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : 'not-completed'}`}>
                        <div className="task-header">
                            <div><span className="task-username">{task.username} </span> 
                            <span className="task-email">({task.email})</span></div>
                            <span className="task-status">{task.completed ? "Завершена" : "Не завершена"}</span>
                        </div>
                        <span className="task-text">{task.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;