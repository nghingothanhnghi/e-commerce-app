import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
} from "react-bootstrap";

import BannerLeftAuthen from "../bannerLeftAuthen";
import { signUpPublisher } from "../../../services/publisher/apiPublisherServices";

const SignUpPublisher = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      // Use the new signUpPublisher function
      const user = await signUpPublisher(username, email, password);

      // set the user
      setUser(user);
      toast.success(`Welcome to Dashboard ${user.username}!`);

      navigate("/signin/advertiser", { replace: true });
      // Reload the page
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };


  return (
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
                  <div className="mt-5 mb-7">
                    <h3 className="text-body-highlight fw-bold">New account?</h3>
                  </div>
                  <Form onSubmit={onFinish}>
                    <Form.Group className="mb-3">
                      <Form.Label>Username</Form.Label>
                      <Form.Control name="username" type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="name@example.com"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isLoading}
                    >
                      Submit{" "}
                      {isLoading && (
                        <Spinner variant="light" size="sm" animation="grow" />
                      )}
                    </Button>
                  </Form>
                  <div className="form_help_text mt-5">
                    Already have an account? <Link to="/signin/publisher">Sign In</Link>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPublisher;
