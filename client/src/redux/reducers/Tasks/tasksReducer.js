import { 
    GET_TASKS,
    ADD_TASK,
    // EDIT_TASK,
    DELETE_TASK,
    COMPLETE_TASK,
    SET_MODAL
} from '../../actions/Tasks/taskActionsTypes';
import { v4 as uuid } from 'uuid';

const initialState = {
    tasks: [
        { id: uuid(), title: 'Correr', isCompleted: false },
        { id: uuid(), title: 'Nadar', isCompleted: false },
        { id: uuid(), title: 'Saltar', isCompleted: false },
        { id: uuid(), title: 'Brincar', isCompleted: false },
    ],
    task: {},
    taskId: '',
    modal: false
}

const tasksReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TASKS:
            return {
                ...state
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task=>task.id !== action.payload)
            }
        case COMPLETE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task=>task.id === action.payload ? { ...task, isCompleted: !task.isCompleted } : task)
            }
        case SET_MODAL:
            return {
                ...state,
                modal: !state.modal
            }
        default:
            return state
    }
}

export default tasksReducer;