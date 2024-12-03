import { createStore, applyMiddleware, combineReducers } from 'redux';
import { taskReducer } from './taskReducer'
import { authReducer } from './authReducer'
import { notificationReducer } from './notificationReducer';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    task: taskReducer,
    auth: authReducer,
    notification: notificationReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;