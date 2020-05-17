import { combineReducers } from 'redux';
import tasksReducer from './Tasks/tasksReducer';
import usersReducer from './Users/usersReducer';

const rootReducer = combineReducers({
   tasks: tasksReducer,
   users: usersReducer
});

export default rootReducer;