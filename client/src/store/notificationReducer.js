const SET_NOTIFICATION = 'SET_NOTIFICATION'
const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION'

const initialState = {
    message: '',
    type: '',
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                message: action.payload.message,
                type: action.payload.type,
            };
        case 'CLEAR_NOTIFICATION':
            return initialState;
        default:
            return state;
    }
};

export const setNotificationAction = (payload) => ({ type: SET_NOTIFICATION, payload });
export const clearNotificationAction = (payload) => ({ type: CLEAR_NOTIFICATION, payload });