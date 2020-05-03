import {
    TASKS_LOADING,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    COMPLETE_TASK,
    SET_MODAL
} from '../../actions/Tasks/taskActionsTypes';

const initialState = {
    loading: false,
    tasks: [],
    error: '',
    modal: false
}

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASKS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: ''
            }
        case GET_TASKS_FAILURE:
            return {
                ...state,
                loading: false,
                tasks: [],
                error: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks]
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? { ...task, title: action.payload.title } : task)
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        case COMPLETE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task)
            }
        case SET_MODAL:
            return {
                ...state,
                task: action.payload,
                modal: !state.modal
            }
        default:
            return state
    }
}

export default tasksReducer;