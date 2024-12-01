import React from 'react';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, setCurrentPage } from './redux/actions';
import Pagination from './components/Pagination';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);
  const currentPage = useSelector(state => state.currentPage);
  const totalPages = useSelector(state => state.totalPages);


  useEffect(() => {
    dispatch(fetchTasks(currentPage));
  }, [currentPage, dispatch]);

  // Обработка изменения страницы
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    dispatch(fetchTasks(pageNumber));
  };

  return (
    <div>
      
      
      <h2>Список задач</h2>
      <ul>
        {Array.isArray(tasks) && tasks.map(task => (
          <li key={task.id}>
            {task.text} - {task.username} ({task.email}) - {task.completed ? "Завершена" : "Не завершена"}
          </li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default App;