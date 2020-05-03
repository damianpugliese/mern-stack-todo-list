import React from 'react'
import { Button } from 'reactstrap'
import { MdEdit, MdDelete, MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md'
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, completeTask, setModal } from '../../../redux/actions/Tasks/tasksActions'

const ToDoItem = ({_id, title, i}) => {

    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch();
    const dispatchCompleteTask = (id, isCompleted) => dispatch(completeTask(id, isCompleted))
    const dispatchDeleteTask = id => dispatch(deleteTask(id))
    const dispatchSetModal = task => dispatch(setModal(task))

    const handleClickCompleteTask = (i) => {
        const id = tasks[i]._id;
        const isCompleted = !tasks[i].isCompleted;
        dispatchCompleteTask(id, isCompleted)
    }

    const handleClickEditTask = (i) => {
        const task = tasks[i]
        dispatchSetModal(task);
    }

    const handleClickDeleteTask = (i) => {
        const id = tasks[i]._id
        dispatchDeleteTask(id);
    }

    return (
        <>
            <span>
                <Button
                    color="link"
                    size="sm"
                    className="pl-0 pr-0"
                    onClick={() => handleClickCompleteTask(i)}
                    data-for={`button-complete-${_id}`}
                    data-tip="Mark as completed"
                >
                    {!tasks[i].isCompleted
                        ? <MdRadioButtonUnchecked size={20} />
                        : <MdCheckCircle size={20} />
                    }
                </Button>
                <ReactTooltip id={`button-complete-${_id}`} place="top" type="light" effect="solid" />
                <p className="m-0 pl-2">{title}</p>
            </span>
            <span>
                <Button
                    color="link"
                    size="sm"
                    onClick={() => handleClickEditTask(i)}
                    data-for={`button-edit-${_id}`}
                    data-tip="Edit task"
                >
                    <MdEdit size={20} />
                </Button>
                <ReactTooltip id={`button-edit-${_id}`} place="top" type="light" effect="solid" />
                <Button
                    color="link"
                    size="sm"
                    onClick={() => handleClickDeleteTask(i)}
                    data-for={`button-delete-${_id}`}
                    data-tip="Delete task"
                >
                    <MdDelete size={20} />
                </Button>
                <ReactTooltip id={`button-delete-${_id}`} place="top" type="light" effect="solid" />
            </span>
        </>
    )
}

export default ToDoItem
