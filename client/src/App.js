import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './ui/layout/NavBar/NavBar';
import ToDoList from './ui/components/ToDoList/ToDoList';
import { Provider } from 'react-redux'
import store from './redux/store/store'

const App = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <NavBar />
                <ToDoList />
            </div>
        </Provider>
    );
}

export default App;
