import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import NavBar from './ui/layout/NavBar/NavBar';
import { UncontrolledAlert } from 'reactstrap';
import PrivateRoute from './ui/components/PrivateRoute/PrivateRoute';
import ToDoList from './ui/components/ToDoList/ToDoList';
import Signup from './ui/components/Signup/Signup';
import Signin from './ui/components/Signin/Signin';
import { useDispatch } from 'react-redux';
import { loadUser } from '../src/redux/actions/Users/usersActions';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect 
} from "react-router-dom";
import { history } from './helpers/history';

const App = () => {

    const dispatch = useDispatch();
    const dispatchLoadUser = () => dispatch(loadUser());

    useEffect(()=>{
        dispatchLoadUser();
    }, [])

    return (
        <div className="App">
            <Router history={history}>
                <NavBar />
                {alert.msg && <UncontrolledAlert color={alert.color}>
                    {alert.msg}
                </UncontrolledAlert>}
                <Switch>
                    <PrivateRoute exact path="/" component={ToDoList}/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/signup"component={Signup}/>
                    <Redirect from='*' to='/'/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
