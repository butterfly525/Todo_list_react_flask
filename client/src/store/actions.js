import { addTaskAction, setTaskAction } from "./taskReducer";



// Асинхронное действие для получения задач
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