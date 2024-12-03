const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const initialState = {
    isAuthenticated: false,
    token: null,
    user: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user
            };
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export const loginAction = (payload) => ({type: LOGIN, payload})
export const logoutAction = () => ({type: LOGOUT})