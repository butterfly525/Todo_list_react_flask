import { addTaskAction, setTaskAction, updateTaskAction } from "./taskReducer";


export const fetchTasks = (page) => {

    return (dispatch) => {
        fetch(`/api/tasks?page=${page}`)
            .then((response) => {
                // Проверяем, успешен ли ответ
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json(); // Преобразуем ответ в JSON
            })
            .then((data) => {
                // Диспатчим действие для установки задач
                dispatch(setTaskAction({
                    tasks: data.tasks,
                    pages: data.pages,
                    total: data.total,
                }));
            })
            .catch((error) => {
                console.error("Ошибка при получении задач:", error);
            });

    };
};

// Действие для добавления новой задачи
export const addTask = (newTask) => {
    return (dispatch) => {
        // Выполняем POST-запрос с помощью fetch
        fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Указываем тип контента
            },
            body: JSON.stringify(newTask), // Преобразуем объект в строку JSON
        })
            .then((response) => {
                // Проверяем, успешен ли ответ
                if (!response.ok) {
                    throw new Error('Сеть ответила с ошибкой: ' + response.status);
                }
                return response.json(); // Преобразуем ответ в JSON
            })
            .then((data) => {
                // Диспатчим действие для добавления задачи
                dispatch(addTaskAction(data));
            })
            .catch((error) => {
                console.error("Ошибка при добавлении задачи:", error);
            });
    };
};

export const updateStatusTask = (taskId) => {
    return (dispatch) => {
        // Отправка запроса на сервер для обновления статуса задачи
        const response = fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ completed: true }), // Устанавливаем статус выполненной задачи
        });

        if (response.ok) {
            // Обновляем задачу в Redux
            dispatch(updateTaskAction({ id: taskId, text: undefined, completed: true })); // Передаем ID задачи и новый статус
        } else {
            console.error('Ошибка при обновлении статуса задачи');
        }
    }

};

export const updateTextTask = (taskId, newText) => {
    return (dispatch) => {
         // Отправка обновленных данных на сервер
         const response = fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ text: newText }),
        });

        if (response.ok) {
            // Обновляем задачу в Redux
            dispatch(updateTaskAction({ id: taskId, text: newText, completed: undefined }));
            
            // setNotification({ message: 'Задача успешно изменена!', type: 'success' });
            // setTimeout(() => {
            //     setNotification('');
            // }, 3000);
        } else {
            // setNotification({ message: 'Ошибка при обновлении задачи!', type: 'error' });
            // setTimeout(() => {
            //     setNotification('');
            // }, 3000);
        }
    }

};
