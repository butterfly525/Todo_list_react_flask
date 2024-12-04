import { useSelector, useDispatch } from 'react-redux';
import { updateTextTask } from '../store/actions';
import { setTextEditingTaskAction, clearEditingFieldsAction } from '../store/taskReducer'


const EditTaskForm = () => {
    const dispatch = useDispatch();
    const editingTaskId = useSelector(state => state.task.editingTaskId);
    const newText = useSelector(state => state.task.newText);
    const usernameTask = useSelector(state => state.task.usernameTask);

    
    const handleChange = (e) => {
        dispatch(setTextEditingTaskAction(e.target.value));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateTextTask(editingTaskId, newText));
        dispatch(clearEditingFieldsAction()); // Сбрасываем текущее задание
    };

    const handleCancel = () => {
        dispatch(clearEditingFieldsAction());
    }

    return (<form className="form-container" onSubmit={handleSubmit}>
        <label htmlFor="task-text">Редактирование задачи пользователя {usernameTask}:</label>
        <textarea
            type="text"
            id="task-text"
            value={newText}
            onChange={handleChange}
        />
        <button type="submit">Сохранить</button>
        <button type="button" onClick={handleCancel}>Отмена</button>

    </form>)
}

export default EditTaskForm;