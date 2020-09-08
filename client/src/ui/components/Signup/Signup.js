import React, { useState, useRef } from 'react';
import './Signup.scss';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback, Alert
} from 'reactstrap';
import { registerRequest, cleanUsersErrors } from '../../../redux/actions/Users/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Signup = ({history}) => {

    const dispatch = useDispatch();
    const dispatchRegisterRequest = data => dispatch(registerRequest(data));
    const dispatchCleanUsersErrors = () => dispatch(cleanUsersErrors());

    const alertMsg = useSelector(state => state.users.errors.msg.msg);
    const alertId = useSelector(state => state.users.errors.id);

    const usernameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const confirmPasswordInput = useRef();

    const validateForm = errors => {

        let valid = true;

        Object.values(errors).forEach(
            value => value.length > 0 && (valid = false)
        );

        return valid;

    }

    const formInitialState = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        errors: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
    }

    const resetForm = () => {
        setFormData(formInitialState);
    }

    const [formData, setFormData] = useState(formInitialState);

    const handleChange = e => {

        const { name, value } = e.target;
        let { errors } = formData;

        switch (name) {
            case 'username':
                errors.username =
                    /^\s+$/.test(value)
                        ? 'Field must contain almost one character'
                        : '';
                break;
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
            case 'confirmPassword':
                errors.confirmPassword =
                    value !== formData.password
                        ? 'Passwords do not match'
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

        let { username, email, password, confirmPassword } = formData;

        let { errors } = formData;

        if (username.length === 0) {
            errors.username = 'Required field';
            usernameInput.current.focus();
        } else if (email.length === 0) {
            errors.email = 'Required field';
            emailInput.current.focus();
        } else if (password.length === 0) {
            errors.password = 'Required field';
            passwordInput.current.focus();
        } else if (password && password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            confirmPasswordInput.current.focus();
        }

        setFormData(prevState => ({
            ...prevState,
            errors
        }));

        const formDataToSend = {
            username,
            email,
            password, 
            confirmPassword
        }

        if (validateForm(errors)) {

            dispatchRegisterRequest(formDataToSend, history)
            resetForm();

        }

    }

    const handleCloseAlert = () => {
        dispatchCleanUsersErrors();
    }

    return (
        <Container className="signup-container container-fluid">
            {alertId === 'REGISTER_FAIL' && <Alert color="danger" toggle={handleCloseAlert}>
                {alertMsg}
            </Alert>}
            <Form className="signup-form" onSubmit={handleSubmit} noValidate>
                <h2>Sign Up</h2>
                <Col className="p-0">
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input
                            type="text"
                            name="username"
                            id="username"
                            innerRef={usernameInput}
                            onChange={handleChange}
                            value={formData.username}
                            invalid={formData.errors.username.length > 0}
                        />
                        <FormFeedback invalid>{formData.errors.username}</FormFeedback>
                    </FormGroup>
                </Col>
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
                        <FormFeedback invalid>{formData.errors.email}</FormFeedback>
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
                        <FormFeedback invalid>{formData.errors.password}</FormFeedback>
                    </FormGroup>
                </Col>
                <Col className="p-0">
                    <FormGroup>
                        <Label for="confirmPassword">Confirm Password</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            innerRef={confirmPasswordInput}
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            invalid={formData.errors.confirmPassword.length > 0}
                        />
                        <FormFeedback invalid>{formData.errors.confirmPassword}</FormFeedback>
                    </FormGroup>
                </Col>
                <Button color="primary" className="mt-3">Sign Up</Button>
                <Link to="/signin" className="link-signin">
                    Do you have an account? Sign In
                </Link>
            </Form>
        </Container>
    );

}

export default Signup;
