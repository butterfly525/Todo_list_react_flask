import './styles/App.css';
import AddTaskPage from './components/AddTaskPage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';
import TaskListPage from './components/TaskListPage';
import { Provider } from "react-redux"
import store from "./store/index"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<TaskListPage />} />
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </Provider>

  );
};

export default App;
