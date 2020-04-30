import React, { useState, useEffect, useRef } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { MdEdit, MdDelete, MdRadioButtonUnchecked, MdCheckCircle } from 'react-icons/md'
import axios from 'axios'

const ToDoList = () => {

    const [tasks, setTasks] = useState([])
    const [taskTitle, setTaskTitle] = useState('')
    const [inputValue, setInputValue] = useState(false)

    const inputAddTaskRef = useRef();
    const addTaskContainerRef = useRef();

    useEffect(() => {
        axios('/api/tasks')
            .then(res => {
                setTasks(res.data)
            })
    }, [tasks])

    const handleClickAddTask = () => {
        inputAddTaskRef.current.focus();
    }

    const handleClickAddTaskValue = () => {
        axios.post('/api/tasks/add', { title: taskTitle })
            .then(() => {
                setTaskTitle('');
                setInputValue(false);
                inputAddTaskRef.current.focus();
            })
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            axios.post('/api/tasks/add', { title: taskTitle })
                .then(() => {
                    setTaskTitle('');
                    setInputValue(false);
                    inputAddTaskRef.current.focus();
                })
        }
    }

    const handleChangeInputAddTask = (e) => {
        setTaskTitle(e.target.value)
        if (e.target.value !== '') {
            setInputValue(true)
        } else {
            setInputValue(false)
        }
    }

    const handleClickCheckTask = (i) => {
        const newTasks = [...tasks]
        const isCompleted = !tasks[i].isCompleted
        newTasks[i].isCompleted = !tasks[i].isCompleted;
        const id = newTasks[i]._id
        axios.put(`/api/tasks/completed/${id}`, { isCompleted })
    }

    const handleClickEditTask = (i, title) => {
        const newTitle = prompt('Editar', title)
        const id = tasks[i]._id
        axios.put(`/api/tasks/edit/${id}`, { title: newTitle })
    }

    const handleClickDeleteTask = (i) => {
        const id = tasks[i]._id
        axios.delete(`/api/tasks/delete/${id}`)
    }

    return (
        <Container>
            <h5 className="text-primary">Tasks</h5>
            <div className="add-task-container" ref={addTaskContainerRef}>
                <Button
                    color="link"
                    className="pl-0"
                    onClick={handleClickAddTask}
                    style={{ textDecoration: 'none' }}
                >
                    <IoIosAddCircleOutline size={20} />
                </Button>
                <input className="input-add-task" type="text" ref={inputAddTaskRef} placeholder="Add a Task" value={taskTitle} name="task" onKeyPress={handleKeyPress} onChange={handleChangeInputAddTask}></input>
                {inputValue &&
                    <Button
                        color="link"
                        size="sm"
                        onClick={handleClickAddTaskValue}
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
                                        onClick={() => handleClickEditTask(i, title)}
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
    )
}

export default ToDoList
