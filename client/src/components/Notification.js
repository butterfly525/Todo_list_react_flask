import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotificationAction } from '../store/notificationReducer';

const Notification = () => {
    const dispatch = useDispatch();
    
    const notification = useSelector(state => state.notification);
    
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                dispatch(clearNotificationAction());
            }, 3000);

            // Очистка таймера при размонтировании компонента или изменении сообщения
            return () => clearTimeout(timer);
        }
    }, [notification.message, dispatch]);
    if (!notification.message) return null;



    return (
        <div className={`notification ${notification.type}`}>
            {notification.message}
        </div>
    );
};

export default Notification;