import React, { useState } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { v4 as uuid } from 'uuid';

const ToDoList = () => {

    const [tasks, setTasks] = useState([
        { id: uuid(), title: 'Correr' },
        { id: uuid(), title: 'Nadar' },
        { id: uuid(), title: 'Comer' },
        { id: uuid(), title: 'Cocinar' }
    ])

    const handleClickAddTask = () => {
        const title = prompt('Enter a task')
        if (title) {
            setTasks([...tasks, { id: uuid(), title }])
        }
    }

    const handleClickEditTask = (id, title) => {
        const newTitle = prompt('Editar', title)
        if(newTitle) {
            setTasks()
        }
    }

    const handleClickDeleteTask = (id) => {
        console.log(id)
        setTasks(
            tasks.filter(task => task.id !== id)
        )
    }

    return (
        <Container>
            <h5 className="text-primary">Tasks</h5>
            <Button
                color="primary"
                className="mt-3 mb-3"
                onClick={handleClickAddTask}
            >
                Add a task
            </Button>
            <ListGroup flush>
                <TransitionGroup className="todo-list">
                    {tasks.map(({ id, title }) => (
                        <CSSTransition key={id} timeout={300} classNames="fade">
                            <ListGroupItem className="pl-0 pr-0" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        className="mr-3"
                                    >
                                        Check
                                    </Button>
                                    {title}
                                </span>
                                <span>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        className="mr-2"
                                        onClick={()=>handleClickEditTask(id, title)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={()=>handleClickDeleteTask(id)}
                                    >
                                        Borrar
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
