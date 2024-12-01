import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

// Начальное состояние
const initialState = {
  tasks: [],
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 3,
  totalItems: 0
};

// Редюсер
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        totalItems: state.totalItems + 1, // Увеличиваем общее количество задач
        totalPages: Math.ceil((state.totalItems + 1) / state.itemsPerPage), // Пересчитываем количество страниц
        currentPage: Math.ceil((state.totalItems + 1) / state.itemsPerPage)
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload.tasks,
        totalPages: action.payload.pages,
        totalItems: action.payload.total
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

// Создание хранилища Redux
const store = createStore(taskReducer, applyMiddleware(thunk));

export default store;