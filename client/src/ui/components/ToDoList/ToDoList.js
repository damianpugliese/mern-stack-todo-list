import React, { useState, useEffect, useRef } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdEdit, MdDelete, MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md'
// import axios from 'axios'
import EditModal from '../EditModal.js/EditModal'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks, addTask, deleteTask, completeTask, setModal } from '../../../redux/actions/Tasks/tasksActions'
import { v4 as uuid } from 'uuid'

const ToDoList = () => {

    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch();

    const dispatchGetTasks = () => dispatch(getTasks())
    const dispatchDeleteTask = id => dispatch(deleteTask(id))
    const dispatchAddTask = task => dispatch(addTask(task))
    const dispatchSetModal = () => dispatch(setModal())
    const dispatchCompleteTask = id => dispatch(completeTask(id))

    const [taskTitle, setTaskTitle] = useState('')
    const [inputValue, setInputValue] = useState(false)

    const inputAddTaskRef = useRef();
    const addTaskContainerRef = useRef();
    const buttonAddTaskValue = useRef();

    useEffect(() => {
        dispatchGetTasks()
    }, [])

    const handleClickAddTask = () => {
        inputAddTaskRef.current.focus();
    }

    const handleClickAddTaskValue = () => {
        const newTask = {
            id: uuid(),
            title: taskTitle,
            isCompleted: false
        }
        
        dispatchAddTask(newTask)
            
        setTaskTitle('');
        setInputValue(false);
        inputAddTaskRef.current.focus();
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if(!(/^\s+$/.test(taskTitle))) {
                handleClickAddTaskValue()
            }
        }
    }

    const handleChangeInputAddTask = (e) => {
        const inputValue = e.target.value;
        setTaskTitle(inputValue)
        if (inputValue !== '') {
            setInputValue(true)
        } else {
            setInputValue(false)
        }
    }

    const handleClickCheckTask = (i) => {
        const id = tasks[i].id;
        dispatchCompleteTask(id)
    }

    const handleClickEditTask = () => {
        dispatchSetModal();
    }

    const handleClickDeleteTask = (i) => {
        const id = tasks[i].id
        dispatchDeleteTask(id)
    }

    return (
        <>
        <Container>
            <h5 className="text-primary">Tasks</h5>
            <div className="add-task-container" ref={addTaskContainerRef}>
                <Button
                    color="link"
                    className="pl-0"
                    onClick={handleClickAddTask}
                >
                    <IoIosAddCircleOutline size={20} />
                </Button>
                <input className="input-add-task" type="text" ref={inputAddTaskRef} placeholder="Add a Task" value={taskTitle} name="task" onKeyPress={handleKeyPress} onChange={handleChangeInputAddTask}>
                </input>
                {inputValue &&
                    <Button
                        color="link"
                        size="sm"
                        onClick={handleClickAddTaskValue}
                        disabled={/^\s+$/.test(taskTitle)}
                        ref={buttonAddTaskValue}
                    >
                        ADD
                    </Button>
                }
            </div>
            <ListGroup flush>
                <TransitionGroup className="todo-list">
                    {tasks.map(({ _id, title }, i) => (
                        <CSSTransition key={_id} timeout={300} classNames="fade">
                            <ListGroupItem className="pl-0 pr-0" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: tasks[i].isCompleted ? "line-through" : "" }}>
                                <span>
                                    <Button
                                        color="link"
                                        size="sm"
                                        className="pl-0"
                                        onClick={() => handleClickCheckTask(i)}
                                    >
                                        {!tasks[i].isCompleted
                                            ? <MdRadioButtonUnchecked size={20} />
                                            : <MdCheckCircle size={20} />
                                        }
                                    </Button>
                                    {title}
                                </span>
                                <span>
                                    <Button
                                        color="link"
                                        size="sm"
                                        onClick={() => handleClickEditTask()}
                                    >
                                        <MdEdit size={20} />
                                    </Button>
                                    <Button
                                        color="link"
                                        size="sm"
                                        onClick={() => handleClickDeleteTask(i)}
                                    >
                                        <MdDelete size={20} />
                                    </Button>
                                </span>
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
        <EditModal/>
        </>
    )
}

export default ToDoList
