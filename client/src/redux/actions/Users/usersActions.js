import axios from 'axios';
import { 
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GET_USERS_ERRORS,
    CLEAN_USERS_ERRORS
} from '../../actions/Users/usersActionsTypes';

// Check token and load User
export const loadUser = () => {
    return (dispatch, getState) => {
        // User loading
        dispatch ({
            type: USER_LOADING
        });

        axios.get('/api/users/user', configToken(getState))
            .then(res => {
                dispatch({
                    type: USER_LOADED,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err)
                dispatch(getUsersErrors(err.response.data, err.response.status));
                dispatch({
                    type: AUTH_ERROR
                })
            })
    }
} 

export const getUsersErrors = (msg, status, id= null) => {
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

// Set config/headers and token
export const configToken = getState => {
     // Get token from localstorage
     const { token } = getState().users;

     // Headers
     const config = {
         headers: {
             "Content-type": "application/json"
         }
     }

     // If token, add headers
     if(token) {
         config.headers['x-auth-token'] = token;
     }

     return config;
}