import React from 'react'
import { Button, ListGroupItem } from 'reactstrap'
import { MdEdit, MdDelete, MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md'
import ReactTooltip from "react-tooltip";
import { useSelector, useDispatch } from 'react-redux'
import { deleteTask, completeTask, setModal } from '../../../redux/actions/Tasks/tasksActions'

const ToDoItems = (props) => {

    const dispatch = useDispatch();
    const dispatchCompleteTask = (id, isCompleted) => dispatch(completeTask(id, isCompleted))
    const dispatchDeleteTask = id => dispatch(deleteTask(id))
    const dispatchSetModal = task => dispatch(setModal(task))

    const handleClickCompleteTask = (i) => {
        const id = props.tasks[i]._id;
        const isCompleted = !props.tasks[i].isCompleted;
        dispatchCompleteTask(id, isCompleted)
    }

    const handleClickEditTask = (i) => {
        const task = props.tasks[i]
        dispatchSetModal(task);
    }

    const handleClickDeleteTask = (i) => {
        const id = props.tasks[i]._id
        dispatchDeleteTask(id);
    }

    return (
        <ListGroupItem  
            className="pl-0 pr-0" 
            style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                textDecoration: props.tasks[props.i].isCompleted ? "line-through" : "" 
            }}
        >
            <span>
                <Button
                    color="link"
                    size="sm"
                    className="pl-0 pr-0"
                    onClick={() => handleClickCompleteTask(props.i)}
                    data-for={`button-complete-${props.id}`}
                    data-tip="Mark as completed"
                >
                    {props.tasks[props.i].isCompleted
                        ? <MdCheckCircle size={20} />
                        : <MdRadioButtonUnchecked size={20} />
                    }
                </Button>
                <ReactTooltip id={`button-complete-${props.id}`} place="top" type="light" effect="solid" />
                <p className="m-0 pl-2">{props.title}</p>
            </span>
            <span>
                <Button
                    color="link"
                    size="sm"
                    onClick={() => handleClickEditTask(props.i)}
                    data-for={`button-edit-${props.id}`}
                    data-tip="Edit task"
                >
                    <MdEdit size={20} />
                </Button>
                <ReactTooltip id={`button-edit-${props.id}`} place="top" type="light" effect="solid" />
                <Button
                    color="link"
                    size="sm"
                    onClick={() => handleClickDeleteTask(props.i)}
                    data-for={`button-delete-${props.id}`}
                    data-tip="Delete task"
                >
                    <MdDelete size={20} />
                </Button>
                <ReactTooltip id={`button-delete-${props.id}`} place="top" type="light" effect="solid" />
            </span>
        </ListGroupItem>
    )
}

export default ToDoItems
