import React from 'react';
import TaskForm from './AddTaskForm';


const AddTaskPage = () => {
    return (
        <div className='container'>
            <h1 className='centered-title'>Создание задачи</h1>
            <TaskForm />
        </div>
    );
};

export default AddTaskPage;