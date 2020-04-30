import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux'
import { setModal } from '../../../redux/actions/Tasks/tasksActions'


const EditModal = ({className}) => {
  
    const modal = useSelector(state => state.tasks.modal)
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('')
   
    const dispatchSetModal = (id, task) => dispatch(setModal(id, task))

    const toggle = () => {
        dispatchSetModal({})
    }

    const handleChangeInputModal = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
            <ModalBody>
                <Input type="text" rows={5} value={inputValue} onChange={handleChangeInputModal}/>
            </ModalBody>
            <ModalFooter>
                <Button outline color="primary" onClick={toggle}>Save</Button>{' '}
                <Button outline color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default EditModal;