import React, { useEffect } from 'react'
import { Container, Spinner, ListGroup, ListGroupItem } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import EditToDoModal from '../EditToDoModal/EditToDoModal'
import AddToDoBar from '../AddToDoBar/AddToDoBar'
import { useSelector, useDispatch } from 'react-redux'
import { getTasks } from '../../../redux/actions/Tasks/tasksActions'
import ToDoItem from '../ToDoItem/ToDoItem'

const ToDoList = () => {

    const loading = useSelector(state => state.tasks.loading)
    const tasks = useSelector(state => state.tasks.tasks)
    const dispatch = useDispatch();
    const dispatchGetTasks = () => dispatch(getTasks())

    useEffect(() => {
        dispatchGetTasks()
    }, [])

    return (
        <>
            <Container>
                <h5 className="text-primary">Tasks</h5>
                <AddToDoBar/>
                {loading
                    ? <Spinner color="primary" size="lg" className="circular-progress mt-4" />
                    : <ListGroup flush>
                        <TransitionGroup className="todo-list">
                            {tasks.map(({ _id, title }, i) => (
                                <CSSTransition key={_id} timeout={300} classNames="fade">
                                    <ListGroupItem  
                                        className="pl-0 pr-0" 
                                        style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            alignItems: 'center', 
                                            textDecoration: tasks[i].isCompleted ? "line-through" : "" 
                                        }}
                                    >
                                        <ToDoItem 
                                            _id={_id} 
                                            title={title} 
                                            i={i}
                                        />
                                    </ListGroupItem>
                                </CSSTransition>
                            ))}
                        </TransitionGroup>
                    </ListGroup>
                }
            </Container>
            <EditToDoModal />
        </>
    )
}

export default ToDoList
