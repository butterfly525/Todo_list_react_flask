import React from 'react';
import '../styles/Notification.css'; // Импортируйте стили для уведомления

const Notification = ({ message, type }) => {
    if (!message) return null; // Если нет сообщения, не отображаем ничего

    return (
        <div className={`notification ${type}`}>
            {message}
        </div>
    );
};

export default Notification;