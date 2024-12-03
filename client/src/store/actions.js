import { addTaskAction, setTaskAction, updateTaskAction } from "./taskReducer";
import { setNotificationAction } from "./notificationReducer"; // Импортируем действие для уведомлений
import { loginAction } from './authReducer';
export const loginUser = (formData) => {
    return async (dispatch) => {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Неверное имя пользователя или пароль.');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token);
            dispatch(loginAction({ token: data.access_token }));
            dispatch(setNotificationAction({ message: 'Успешный вход!', type: 'success' }));
            return true; // Успешный вход
        } catch (error) {
            console.error('Ошибка:', error.message);
            dispatch(setNotificationAction({ message: error.message, type: 'error' }));
            return false; // Ошибка входа
        }
    };
};

// Функция для получения задач
export const fetchTasks = (page) => {
    return (dispatch) => {
        fetch(`/api/tasks?page=${page}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                dispatch(setTaskAction({
                    tasks: data.tasks,
                    pages: data.pages,
                    total: data.total,
                }));
            })
            .catch((error) => {
                dispatch(setNotificationAction({ message: 'Не удалось получить задачи (' + error + ').', type: 'error' }));
            });
    };
};

// Функция для добавления новой задачи
export const addTask = (newTask) => {
    return (dispatch) => {
        return fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                dispatch(addTaskAction(data));
                dispatch(setNotificationAction({ message: 'Задача успешно добавлена!', type: 'success' }));
            })
            .catch((error) => {
                dispatch(setNotificationAction({ message: 'Не удалось добавить задачу (' + error + ').', type: 'error' }));
            });
    };
};

// Функция для обновления статуса задачи
export const updateStatusTask = (taskId) => {
    return (dispatch) => {
        return fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ completed: true }),
        })
            .then(response => {
                if (response.ok) {
                    dispatch(updateTaskAction({ id: taskId, text: undefined, completed: true }));
                    dispatch(setNotificationAction({ message: 'Статус задачи успешно обновлён!', type: 'success' }));
                } else {
                    throw new Error('Ошибка при обновлении статуса задачи');
                }
            })
            .catch(error => {
                dispatch(setNotificationAction({ message: 'Не удалось обновить статус задачи ('+error+').', type: 'error' }));
            });
    };
};

// Функция для обновления текста задачи
export const updateTextTask = (taskId, newText) => {
    return (dispatch) => {
        return fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ text: newText }),
        })
            .then(response => {
                if (response.ok) {
                    dispatch(updateTaskAction({ id: taskId, text: newText, completed: undefined }));
                    dispatch(setNotificationAction({ message: 'Задача успешно изменена!', type: 'success' }));
                } else {
                    throw new Error('Ошибка при обновлении задачи');
                }
            })
            .catch(error => {
                dispatch(setNotificationAction({ message: 'Не удалось изменить задачу ('+error+').', type: 'error' }));
            });
    };
};