import React, { useState, useEffect } from 'react';
import './Signin.scss';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button
} from 'reactstrap';

const Signin = () => {

    return (
        <Container className="signin-container">
            <Form className="signin-form">
                <h2>Sign In</h2>
                <Col className="p-0">
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                        />
                    </FormGroup>
                </Col>
                <Col className="p-0">
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                        />
                    </FormGroup>
                </Col>
                <Button color="primary" className="mt-3">Sign In</Button>
            </Form>
        </Container>
    );

}

export default Signin;