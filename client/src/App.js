import './styles/App.css';
import AddTaskPage from './components/AddTaskPage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';
import TaskListPage from './components/TaskListPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import checkTokenValidity from './components/CheckToken'


const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
      const validateToken = async () => {
          await checkTokenValidity(dispatch); // Вызовите функцию проверки токена
      };
      validateToken();
  }, [dispatch]);


  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" exact element={<TaskListPage />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>

  );
};

export default App;
