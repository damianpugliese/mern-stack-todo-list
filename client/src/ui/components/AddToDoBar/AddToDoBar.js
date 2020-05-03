import React, { useState, useRef } from 'react'
import { Button } from 'reactstrap'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { addTask } from '../../../redux/actions/Tasks/tasksActions'
import { useDispatch } from 'react-redux'

const AddTaskBar = () => {

    const dispatch = useDispatch();
    const dispatchAddTask = task => dispatch(addTask(task))

    const [taskTitle, setTaskTitle] = useState('')
    const [inputValue, setInputValue] = useState(false)

    const inputAddTaskRef = useRef();
    const addTaskContainerRef = useRef();
    const buttonAddTaskValue = useRef();

    const handleClickAddTask = () => {
        inputAddTaskRef.current.focus();
    }

    const handleClickAddTaskValue = () => {
        const newTask = {
            title: taskTitle,
        }

        dispatchAddTask(newTask)

        setTaskTitle('');
        setInputValue(false);
        inputAddTaskRef.current.focus();
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (!(/^\s+$/.test(taskTitle))) {
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

    return (
        <div className="add-task-container" ref={addTaskContainerRef}>
            <Button
                color="link"
                className="pl-0"
                onClick={handleClickAddTask}
                id="add-task-button"
            >
                <IoIosAddCircleOutline size={20} />
            </Button>
            <input 
                className="input-add-task" 
                type="text" ref={inputAddTaskRef} 
                placeholder="Add a Task" 
                value={taskTitle} 
                name="task" 
                onKeyPress={handleKeyPress} 
                onChange={handleChangeInputAddTask}
            />
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
    )
}

export default AddTaskBar
