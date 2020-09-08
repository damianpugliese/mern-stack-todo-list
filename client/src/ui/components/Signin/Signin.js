import React, { useState, useRef } from 'react';
import './Signin.scss';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Alert, FormFeedback
} from 'reactstrap';
import { loginRequest, cleanUsersErrors, cleanUsersMsgsSuccess } from '../../../redux/actions/Users/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Signin = () => {

    const dispatch = useDispatch();
    const dispatchLoginRequest = data => dispatch(loginRequest(data));
    const dispatchCleanUsersErrors = () => dispatch(cleanUsersErrors());
    const dispatchCleanUsersMsgsSuccess = () => dispatch(cleanUsersMsgsSuccess());

    const alertMsg = useSelector(state => state.users.errors.msg.msg);
    const alertId = useSelector(state => state.users.errors.id);
    const successMsg = useSelector(state => state.users.msgsSuccess.msg);
    const successId = useSelector(state => state.users.msgsSuccess.id);

    const emailInput = useRef();
    const passwordInput = useRef();

    const validateForm = errors => {

        let valid = true;

        Object.values(errors).forEach(
            value => value.length > 0 && (valid = false)
        );

        return valid;

    }

    const formInitialState = {
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',
        },
    }

    const resetForm  = () => {
        setFormData(formInitialState);
    }

    const [formData, setFormData] = useState(formInitialState);

    const handleChange = e => {

        const { name, value } = e.target;
        let { errors } = formData;

        switch (name) {
            case 'email':
                errors.email =
                    !(/\S+@\S+\.\S+/.test(value))
                        ? "Enter a valid email"
                        : '';
                break;
            case 'password':
                errors.password =
                    /^\s+$/.test(value)
                        ? 'Field must contain almost one character'
                        : '';
                break;
            default:
                break;
        }

        setFormData({
            ...formData,
            [name]: value
        });

    }

    const handleSubmit = e => {
        e.preventDefault();

        let { email, password } = formData;

        let { errors } = formData;

        if (email.length === 0) {
            errors.email = 'Required field';
            emailInput.current.focus();
        } else if (password.length === 0) {
            errors.password = 'Required field';
            passwordInput.current.focus();
        } 

        setFormData(prevState => ({
            ...prevState,
            errors
        }));

        const formDataToSend = {
            email,
            password
        }

        if (validateForm(errors)) {
            dispatchLoginRequest(formDataToSend);
            resetForm();
        }

    }

    const handleCloseAlert = () => {
        dispatchCleanUsersErrors();
        dispatchCleanUsersMsgsSuccess();
    }

    return (
        <Container className="signin-container">
            {alertId === 'LOGIN_FAIL' && <Alert color="danger" toggle={handleCloseAlert}>
                {alertMsg}
            </Alert>}
            {successId === 'REGISTER_SUCCESS' && <Alert color="success" toggle={handleCloseAlert}>
                {successMsg}
            </Alert>}
            <Form className="signin-form" onSubmit={handleSubmit} noValidate>
                <h2>Sign In</h2>
                <Col className="p-0">
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            innerRef={emailInput}
                            onChange={handleChange}
                            value={formData.email}
                            invalid={formData.errors.email.length > 0}
                        />
                        <FormFeedback invalid="true">{formData.errors.email}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col className="p-0">
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            innerRef={passwordInput}
                            onChange={handleChange}
                            value={formData.password}
                            invalid={formData.errors.password.length > 0}
                        />
                        <FormFeedback invalid="true">{formData.errors.password}</FormFeedback>
                    </FormGroup>
                </Col>
                <Button color="primary" className="mt-3">Sign In</Button>
                <Link to="/signup" className="link-signup">
                    Don't have an account? Sign Up
                </Link>
            </Form>
        </Container>
    );

}

export default Signin;