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

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    errors: {
        msg: {},
        status: null,
        id: null
    }
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem(action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
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
       default:
            return state;
    }
}

export default usersReducer;