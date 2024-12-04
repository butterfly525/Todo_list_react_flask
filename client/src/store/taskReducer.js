const ADD_TASK = 'ADD_TASK'
const SET_TASKS = 'SET_TASKS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const UPDATE_TASK = 'UPDATE_TASK'
const SET_SORT_BY = 'SET_SORT_BY'
const SET_ID_EDITING_TASK = 'SET_ID_EDITING_TASK'
const SET_TEXT_EDITING_TASK = 'SET_TEXT_EDITING_TASK'
const SET_USERNAME_EDITING_TASK = 'SET_USERNAME_EDITING_TASK'
const SET_USEREMAILEDITING__TASK = 'SET_USEREEMAIL_TASK'
const CLEAR_EDITING_FIELDS = 'CLEAR_EDITING_FIELDS'

const loadSortFromLocalStorage = () => {
  const savedSort = localStorage.getItem('sortBy');
  if (savedSort) {
    return savedSort;
  }
  return 'default'; // Значение по умолчанию
};

// Начальное состояние
const initialState = {
  tasks: [],
  currentPage: 1,
  totalPages: 0,
  itemsPerPage: 3,
  totalItems: 0,
  sortBy: loadSortFromLocalStorage(),
  editingTaskId: null,
  newText: '',
  usernameTask: '',
  userEmail: ''
};

// Редюсер
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        totalItems: state.totalItems + 1, // Увеличиваем общее количество задач
        totalPages: Math.ceil((state.totalItems + 1) / state.itemsPerPage) // Пересчитываем количество страниц
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalPages: action.payload.pages,
        totalItems: action.payload.total
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? {
              ...task,
              text: action.payload.text !== undefined ? action.payload.text : task.text,
              completed: action.payload.completed !== undefined ? action.payload.completed : task.completed
            }
            : task
        )
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SET_ID_EDITING_TASK:
      return {
        ...state,
        editingTaskId: action.payload,
      };
    case SET_TEXT_EDITING_TASK:
      return {
        ...state,
        newText: action.payload,
      };
    case SET_USERNAME_EDITING_TASK:
      return {
        ...state,
        usernameTask: action.payload,
      };
      case SET_USEREMAILEDITING__TASK:
      return {
        ...state,
        userEmail: action.payload,
      };
    case CLEAR_EDITING_FIELDS:
      return {
        ...state,
        editingTaskId: null,
        newText: '',
        usernameTask: '',
        userEmail: '',
      };
    default:
      return state;
  }
};

export const addTaskAction = (payload) => ({ type: ADD_TASK, payload });
export const setTaskAction = (payload) => ({ type: SET_TASKS, payload });
export const updateTaskAction = (payload) => ({ type: UPDATE_TASK, payload });
export const setCurrentPageAction = (payload) => ({ type: SET_CURRENT_PAGE, payload });
export const setSortByAction = (payload) => ({ type: SET_SORT_BY, payload });
export const setIdEditingTaskAction = (payload) => ({ type: SET_ID_EDITING_TASK, payload });
export const setTextEditingTaskAction = (payload) => ({ type: SET_TEXT_EDITING_TASK, payload });
export const setUsernameEditingTaskAction = (payload) => ({ type: SET_USERNAME_EDITING_TASK, payload });
export const setUserEmailEditingTaskAction = (payload) => ({ type: SET_USEREMAILEDITING__TASK, payload });
export const clearEditingFieldsAction = () => ({ type: CLEAR_EDITING_FIELDS, });