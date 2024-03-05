import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Spinner,
    Alert,
} from "react-bootstrap";

import { useAuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { setToken, getToken } from "../../../helpers/helpers";
import { USER_TYPES } from "../../../constants/userTypes";
import { signInPublisher } from "../../../services/publisher/apiPublisherServices";
import BannerLeftAuthen from "../bannerLeftAuthen";

const SignInPublisher = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate(`/campaigns`, { replace: true });
            // Reload the page
            window.location.reload();
        }
    }, [navigate]);


    const onFinish = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(event.target);
            const email = formData.get("email");
            const password = formData.get("password");

            if (!email || !password) {
                throw new Error("Email and password are required.");
            }


            const user = await signInPublisher(email, password);

            // Check user type
            handleUserTypeSpecificActions(user);

            // Log the user type
            console.log("User type:", user?.userType);

            // set the token
            setToken(user.jwt);

            // set the user
            setUser(user);
            toast.success(`Welcome back ${user.firstName}!`);

            navigate("/campaigns", { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserTypeSpecificActions = (user) => {
        // Handle actions specific to each user type
        switch (user?.userType) {
            case USER_TYPES.PUBLISHER:
                // Additional actions for publisher user type
                console.log("User is an publisher");
                // You can redirect or perform specific actions here
                break;
            // Add more cases for other user types if needed
            default:
                break;
        }
    };

    return (
        <>
            <Container className="h-100">
                <Row className="justify-content-md-center align-items-center h-100">
                    <Col lg="8">
                        <Card border="0" className="shadow-sm rounded-4">
                            <Card.Body className="py-5 px-5">
                                <Row>
                                    <Col className="d-none d-md-flex">
                                        <BannerLeftAuthen />
                                    </Col>
                                    <Col md={6} lg={6} className="ps-md-5 border-md-start">
                                        <div className="my-3 mb-7">
                                            <h3 className="text-body-highlight fw-bold">
                                                Welcome to FiMi
                                            </h3>
                                            {/* <p className="text-body-tertiary">
                                                Get access to Publisher
                                            </p> */}
                                        </div>
                                        <Form onSubmit={onFinish}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    name="email"
                                                    type="email"
                                                    placeholder="name@example.com"
                                                />
                                            </Form.Group>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword"
                                            >
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                            </Form.Group>
                                            <Row className="align-items-center">
                                                <Col xs="auto" lg="auto">
                                                    <Button
                                                        className="w126"
                                                        variant="primary"
                                                        type="submit"
                                                        disabled={isLoading}
                                                    >
                                                        Login{" "}
                                                        {isLoading && (
                                                            <Spinner
                                                                variant="light"
                                                                size="sm"
                                                                animation="grow"
                                                            />
                                                        )}
                                                    </Button>
                                                </Col>
                                                <Col className="text-end">
                                                    <Link to="/forgot-password/publisher" className="link-secondary">Forgot password?</Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <div className="form_help_text mt-5">
                                            New to FiMi? <Link to="/signup/publisher" className="link-secondary">Sign Up</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SignInPublisher;
