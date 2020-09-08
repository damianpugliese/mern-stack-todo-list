import React, { useEffect } from 'react'
import './ToDoList.scss'
import { Container, Spinner, ListGroup } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import EditToDoModal from '../EditToDoModal/EditToDoModal'
import AddToDoBar from '../AddToDoBar/AddToDoBar'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../../redux/actions/Tasks/tasksActions'
import ToDoItems from '../ToDoItems/ToDoItems'

const ToDoList = () => {

    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch();
    const dispatchGetTasks = () => dispatch(getTasks())

    useEffect(() => {
        dispatchGetTasks()
    }, [])

    return (
        <>
            <Container className="todo-list-container">
                <h5 className="text-primary">Tasks</h5>
                <AddToDoBar />
                <ListGroup flush>
                    <TransitionGroup className="todo-list">
                        {tasks && tasks.map(({ _id, title }, i) => (
                            <CSSTransition key={_id} timeout={300} classNames="fade">
                                <ToDoItems
                                    tasks={tasks}
                                    id={_id}
                                    title={title}
                                    i={i}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
            <EditToDoModal />
        </>
    )
}

export default ToDoList
