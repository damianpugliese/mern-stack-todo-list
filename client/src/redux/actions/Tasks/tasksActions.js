import axios from 'axios';

import {
    TASKS_LOADING,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAILURE,
    ADD_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    COMPLETE_TASK,
    SET_MODAL
} from '../../actions/Tasks/tasksActionsTypes';

export const setTasksLoading = () => {
    return {
        type: TASKS_LOADING
    }
}

export const getTasksSuccess = tasks => {
    return {
        type: GET_TASKS_SUCCESS,
        payload: tasks
    }
}

export const getTasksFailure = error => {
    return {
        type: GET_TASKS_FAILURE,
        payload: error
    }
}

export const addTask = task => {
    return (dispatch) => {
        axios.post('/api/tasks/add', task)
            .then(res => {
                dispatch({
                    type: ADD_TASK,
                    payload: res.data
                })
            })
    }
}

export const updateTask = (id, title) => {
    return (dispatch) => {
        axios.put(`/api/tasks/update/${id}`, { title })
            .then(res => {
                dispatch({
                    type: UPDATE_TASK,
                    payload: res.data
                })
            })
    }
}

export const deleteTask = id => {
    return (dispatch) => {
        axios.delete(`/api/tasks/delete/${id}`)
            .then(res => {
                dispatch({
                    type: DELETE_TASK,
                    payload: id
                })
            })
    }
}

export const completeTask = (id, isCompleted) => {
    return (dispatch) => {
        axios.put(`/api/tasks/complete/${id}`, { isCompleted })
            .then(res => {
                dispatch({
                    type: COMPLETE_TASK,
                    payload: id
                })
            })
    }
}

export const setModal = task => {
    return {
        type: SET_MODAL,
        payload: task
    }
}

export const getTasks = () => {
    return (dispatch) => {
        dispatch(setTasksLoading())
        axios('/api/tasks')
            .then(res => {
                const tasks = res.data;
                dispatch(getTasksSuccess(tasks));
            })
            .catch(err => {
                const error = err.message;
                dispatch(getTasksFailure(error));
            })
    }
}