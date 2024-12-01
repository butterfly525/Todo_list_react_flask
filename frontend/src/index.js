import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddTaskPage from './components/AddTaskPage';
import LoginPage from './components/LoginPage';
import Navigation from './components/Navigation';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>

    <Router>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </Provider>
);

