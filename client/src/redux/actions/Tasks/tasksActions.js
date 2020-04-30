import { 
    GET_TASKS,
    ADD_TASK,
    // EDIT_TASK,
    DELETE_TASK,
    COMPLETE_TASK,
    SET_MODAL
} from '../../actions/Tasks/taskActionsTypes';

export const getTasks = () => {
    return {
        type: GET_TASKS
    }
}

export const addTask = task => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export const deleteTask = id => {
    return {
        type: DELETE_TASK,
        payload: id
    }
}

export const completeTask = id => {
    return {
        type: COMPLETE_TASK,
        payload: id
    }
}

export const setModal = (id, task) => {
    return {
        type: SET_MODAL,
        payload: {
            id,
            task
        }
    }
}