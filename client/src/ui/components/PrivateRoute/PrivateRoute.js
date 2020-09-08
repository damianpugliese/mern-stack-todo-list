import React from 'react';
import { Spinner } from 'reactstrap'
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = useSelector(state => state.users.isAuthenticated);
    const isLoading = useSelector(state => state.users.isLoading);

    return (
        <>
            {isLoading ?
                <Spinner  color="primary" className="circular-progress"/>
                :
                < Route {...rest} render={props => (
                    isAuthenticated
                        ? <Component {...props} />
                        : <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
                )} />
            }
        </>
    )

}


export default PrivateRoute;