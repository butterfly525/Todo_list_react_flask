const ADD_TASK = 'ADD_TASK'
const SET_TASKS = 'SET_TASKS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
// Начальное состояние
const initialState = {
    tasks: [],
    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 3,
    totalItems: 0
  };
  
  // Редюсер
  export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TASK:
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
          totalItems: state.totalItems + 1, // Увеличиваем общее количество задач
          totalPages: Math.ceil((state.totalItems + 1) / state.itemsPerPage), // Пересчитываем количество страниц
          currentPage: Math.ceil((state.totalItems + 1) / state.itemsPerPage)
        };
      case SET_TASKS:
        return {
          ...state,
          tasks: action.payload.tasks,
          totalPages: action.payload.pages,
          totalItems: action.payload.total
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload,
        };
      default:
        return state;
    }
  };

  export const addTaskAction = (payload) => ({type: ADD_TASK, payload});
  export const setTaskAction = (payload) => ({type: SET_TASKS, payload});
  export const setCurrentPageAction = (payload) => ({type: SET_CURRENT_PAGE, payload});