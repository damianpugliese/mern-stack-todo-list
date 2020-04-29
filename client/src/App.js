import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './ui/layout/NavBar/NavBar';
import ToDoList from './ui/components/ToDoList/ToDoList';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ToDoList/>
    </div>
  );
}

export default App;
