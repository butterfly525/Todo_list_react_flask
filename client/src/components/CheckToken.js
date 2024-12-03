
import { loginAction } from '../store/authReducer';

const checkTokenValidity = async (dispatch) => {
    const token = localStorage.getItem('token');
    if (token) {
        const response = await fetch('/api/validate-token', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data) {
                dispatch(loginAction({ isAuthenticated: true, token, user: data.user }));
            }
        }
    }
};

export default checkTokenValidity;