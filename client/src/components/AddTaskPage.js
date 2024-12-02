import React from 'react';
import TaskForm from './TaskForm';


const AddTaskPage = () => {
    return (
        <div className='container'>
            <h1 className='centered-title'>Создание задачи</h1>
            <TaskForm />
        </div>
    );
};

export default AddTaskPage;