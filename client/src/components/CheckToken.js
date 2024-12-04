
import { loginAction } from '../store/authReducer';
const checkTokenValidity = async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return; // Если токена нет, просто выходим из функции
        }

        const response = await fetch('/api/validate-token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
           
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.user) {
            dispatch(loginAction({ isAuthenticated: true, token, user: data.user }));
        } else {
            dispatch(loginAction({ isAuthenticated: false, token: null, user: null }));
        }
    } catch (error) {
        localStorage.removeItem('token');
       
    }
};


export default checkTokenValidity;