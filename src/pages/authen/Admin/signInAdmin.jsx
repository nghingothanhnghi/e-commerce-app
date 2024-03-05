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
import { signInAdmin } from "../../../services/admin/apiAdminServices";
import BannerLeftAuthen from "../bannerLeftAuthen";
import { useTranslation } from 'react-i18next';

const SignInAdmin = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();
    const { setUser } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const token = getToken();
        if (token) {
            navigate(`/dashboard`, { replace: true });
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

            const user = await signInAdmin(email, password, 'admin');

            // set the token
            setToken(user.jwt);

            // set the user
            setUser(user);
            toast.success(`Welcome back ${user.firstName}!`);
            navigate("/dashboard", { replace: true });
            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error("Sign-in error:", error);
            toast.error(error?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
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
                                                {t('signin')}
                                            </h3>
                                            <p className="text-body-tertiary">
                                            {t('signin_message_01')}
                                            </p>
                                        </div>
                                        <Form onSubmit={onFinish}>
                                            <Form.Group
                                                className="mb-3"
                                                controlId="exampleForm.ControlInput1"
                                            >
                                                <Form.Label>{t('username_label')}</Form.Label>
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
                                                <Form.Label> {t('password_label')}</Form.Label>
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
                                                         {t('signin')}{" "}
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
                                                    <Link to="/forgot-password/admin" className="link-secondary">Forgot password?</Link>
                                                </Col>
                                            </Row>
                                        </Form>
                                        <div className="form_help_text mt-5">
                                        {t('signin_message_02')} <Link to="/signup/admin" className="link-secondary">Sign Up</Link>
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

export default SignInAdmin;
