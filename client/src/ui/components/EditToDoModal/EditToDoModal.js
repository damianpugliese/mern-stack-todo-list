import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { setModal, updateTask } from '../../../redux/actions/Tasks/tasksActions'

const EditToDoModal = ({ className }) => {

    const task = useSelector(state => state.tasks.task)
    const modal = useSelector(state => state.tasks.modal)
    const dispatch = useDispatch();
    const dispatchSetModal = () => dispatch(setModal())
    const dispatchUpdateTask = (id, title) => dispatch(updateTask(id, title))

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        const taskTitle = task ? task.title : ''
        setInputValue(taskTitle)
    }, [task])

    const toggle = () => {
        dispatchSetModal()
    }

    const handleChangeInputModal = (e) => {
        setInputValue(e.target.value)
    }

    const handleUpdateTask = () => {
        const id = task._id
        const title = inputValue;
        dispatchUpdateTask(id, title);
        dispatchSetModal({})
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            if (!(/^\s+$/.test(inputValue)) && inputValue !== '') {
                handleUpdateTask()
            }
        }
    }

    return (
        <Modal isOpen={modal} toggle={toggle} className={className} autoFocus={false}>
            <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
            <ModalBody>
                <Input type="text" rows={5} value={inputValue} onChange={handleChangeInputModal} onKeyPress={handleKeyPress} autoFocus={true} />
            </ModalBody>
            <ModalFooter>
                <Button outline color="primary" onClick={handleUpdateTask}>Save</Button>{' '}
                <Button outline color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default EditToDoModal;