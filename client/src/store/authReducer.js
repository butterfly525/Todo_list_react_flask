const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const initialState = {
    isAuthenticated: false,
    token: null,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export const loginAction = (payload) => ({type: LOGIN, payload})
export const logoutAction = (payload) => ({type: LOGOUT, payload})