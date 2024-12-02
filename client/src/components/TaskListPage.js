import Pagination from './Pagination';
import TaskList from './TaskList'
import { fetchTasks } from '../store/actions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const TaskListPage = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector(state => state.task.currentPage);
    
    useEffect(() => {
        dispatch(fetchTasks(currentPage));
    }, [currentPage, dispatch]);

    return (
        <div className='container'>
        <h1 className='centered-title'>Список задач</h1>
            <TaskList />
            <Pagination />
        </div>)
}

export default TaskListPage;