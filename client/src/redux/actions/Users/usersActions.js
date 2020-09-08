import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,
    GET_USERS_ERRORS,
    CLEAN_USERS_ERRORS,
    GET_USERS_MSGS_SUCCESS,
    CLEAN_USERS_MSGS_SUCCESS,
    AUTH_ERROR,
} from '../../actions/Users/usersActionsTypes';
import { history } from '../../../helpers/history';
import { configToken } from '../../../helpers/configToken';

export const getUsersErrors = (msg, status, id = null) => {
    return {
        type: GET_USERS_ERRORS,
        payload: {
            msg,
            status,
            id
        }
    }
}

export const cleanUsersErrors = () => {
    return {
        type: CLEAN_USERS_ERRORS
    }
}

export const getUsersMsgsSuccess = (msg, id = null) => {
    return {
        type: GET_USERS_MSGS_SUCCESS,
        payload: {
            msg,
            id
        }
    }
}

export const cleanUsersMsgsSuccess = () => {
    return {
        type: CLEAN_USERS_MSGS_SUCCESS
    }
}

export const registerRequest = (data) => {
    return dispatch => {
        axios.post('/api/users/signup', data)
            .then(res => {
                history.push('/signin')
                dispatch(getUsersMsgsSuccess(res.data.msg, 'REGISTER_SUCCESS'))
            })
            .catch(err => {
                dispatch(getUsersErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
                dispatch({
                    type: REGISTER_FAIL
                })
            });
    }
}

export const loginRequest = (data) => {
    return dispatch => {
        axios.post('/api/users/signin', data)
            .then(res => {
                dispatch(loginSuccess(res.data));
                history.push('/');
            })
            .catch(err => {
                dispatch(getUsersErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
                dispatch({
                    type: LOGIN_FAIL
                });
            });
    }
}

export const loginSuccess = token => {
    return {
        type: LOGIN_SUCCESS,
        payload: token
    }
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const loadUserRequest = () => {
    return dispatch => {
        dispatch({
            type: USER_LOADING
        });
        axios('/api/users/user', configToken())
            .then(res => {
                dispatch(userLoaded(res.data))
            })
            .catch(err => {
                dispatch(getUsersErrors(err.response.data, err.response.status, 'LOAD_USER_FAIL'));
                dispatch({
                    type: AUTH_ERROR
                })
            });
    }
}

export const userLoaded = user => {
    return {
        type: USER_LOADED,
        payload: user
    }
}

