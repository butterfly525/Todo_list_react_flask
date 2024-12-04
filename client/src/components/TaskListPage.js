
import TaskList from './TaskList';
import { fetchTasks } from '../store/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SortButtons from './SortButtons';

const TaskListPage = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.task.currentPage);
    const currentSort = useSelector(state => state.task.sortBy);
    useEffect(() => {
        dispatch(fetchTasks(currentPage, currentSort));
    }, [currentPage, dispatch, currentSort]);

    return (
        <div className='container'>
            <h1 className='centered-title'>Список задач</h1>
            <SortButtons />
            <TaskList />
        </div>)
}

export default TaskListPage;