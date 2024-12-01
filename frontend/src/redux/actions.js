import axios from 'axios';

export const setTasks = (tasksData) => ({
    type: 'SET_TASKS',
    payload: tasksData,
});

export const setCurrentPage = (page) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
});

// Асинхронное действие для получения задач
export const fetchTasks = (page) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/api/tasks?page=${page}`);
            dispatch(setTasks({
                tasks: response.data.tasks,
                pages: response.data.pages,
                total: response.data.total,
            }));
        } catch (error) {
            console.error("Ошибка при получении задач:", error);
        }
    };
};

export const addTask = (newTask) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/tasks', newTask);
            dispatch({ type: 'ADD_TASK', payload: response.data });
          
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
        }
    };
};