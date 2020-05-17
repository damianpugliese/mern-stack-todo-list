import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBar from './ui/layout/NavBar/NavBar';
import ToDoList from './ui/components/ToDoList/ToDoList';
import Signup from './ui/components/Signup/Signup';
import { useDispatch } from 'react-redux';
import { loadUser } from '../src/redux/actions/Users/usersActions';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Signin from './ui/components/Signin/Signin';

const App = () => {

    const dispatch = useDispatch();
    const dispatchLoadUser = () => dispatch(loadUser());

    useEffect(()=>{
        dispatchLoadUser();
    }, [])

    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup"component={Signup}/>
                    <Route path="/tasks" component={ToDoList}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
