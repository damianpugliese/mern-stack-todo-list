import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    GET_USERS_ERRORS,
    CLEAN_USERS_ERRORS,
    REGISTER_FAIL,
    GET_USERS_MSGS_SUCCESS,
    CLEAN_USERS_MSGS_SUCCESS,
} from '../../actions/Users/usersActionsTypes';

const initialState = {
    isAuthenticated: null,
    isLoading: true,
    user: null,
    errors: {
        msg: {},
        status: null,
        id: null
    },
    msgsSuccess: {
        msg: {},
        id: null
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: null,
                isLoading: false,
                user: null,
            };
        case GET_USERS_ERRORS:
            return {
                ...state,
                errors: {
                    msg: action.payload.msg,
                    status: action.payload.status,
                    id: action.payload.id
                }
            };
        case CLEAN_USERS_ERRORS:
            return {
                ...state,
                errors: {
                    msg: {},
                    status: null,
                    id: null
                }
            };
        case GET_USERS_MSGS_SUCCESS:
            return {
                ...state,
                msgsSuccess: {
                    msg: action.payload.msg,
                    id: action.payload.id
                }
            };
        case CLEAN_USERS_MSGS_SUCCESS:
            return {
                ...state,
                msgsSuccess: {
                    msg: {},
                    id: null
                }
            };
        default:
            return state;
    }
}

export default usersReducer;