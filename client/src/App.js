import './styles/App.css';
import './styles/Notification.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddTaskPage from './components/AddTaskPage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';
import TaskListPage from './components/TaskListPage';
import checkTokenValidity from './components/CheckToken'
import Notification from './components/Notification';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const validateToken = () => {
      checkTokenValidity(dispatch);
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
      <Notification />
    </Router>

  );
};

export default App;
