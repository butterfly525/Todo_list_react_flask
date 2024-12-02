import { createStore, applyMiddleware, combineReducers } from 'redux';
import { taskReducer } from './taskReducer'
import { authReducer } from './authReducer'
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
    task: taskReducer,
    auth: authReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;