import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Header from './ui/layout/Header/Header';
import Main from './ui/layout/Main/Main';
import Footer from './ui/layout/Footer/Footer';
import PrivateRoute from './ui/components/PrivateRoute/PrivateRoute';
import ToDoList from './ui/components/ToDoList/ToDoList';
import Signup from './ui/components/Signup/Signup';
import Signin from './ui/components/Signin/Signin';
import { useDispatch } from 'react-redux';
import { loadUserRequest } from '../src/redux/actions/Users/usersActions';
import {
    Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { history } from './helpers/history';

const App = () => {

    const dispatch = useDispatch();
    const dispatachLoadUserRequest = () => dispatch(loadUserRequest());

    useEffect(() => {
        dispatachLoadUserRequest();
        // history.listen((location, action) => {
        //     // dispatch();
        // });
    }, []);

    return (
        <div className="App">
            <Router history={history}>
                <Header />
                <Main>
                    <Switch>
                        <PrivateRoute exact path="/" component={ToDoList} />
                        <Route path="/signin" component={Signin} />
                        <Route path="/signup" component={Signup} />
                        <Redirect from='*' to='/' />
                    </Switch>
                </Main>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
