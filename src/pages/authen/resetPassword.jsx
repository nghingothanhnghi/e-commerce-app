import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import { API } from "../../constants/constant";
import { setToken } from "../../helpers/helpers";
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
import BannerLeftAuthen from "./bannerLeftAuthen";

const ResetPassword = ({ email }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onFinish = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const newPassword = formData.get("newPassword");

      const response = await fetch(`${API}/auth/local/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        toast.success(`Welcome to Dashboard ${data.user.email}!`);

        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const [showAlert, setShowAlert] = useState(false);

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
                    <h3 className="text-body-highlight fw-bold">
                      Reset a new newPassword
                    </h3>
                    <p className="text-body-tertiary">
                      Get access to your account
                    </p>
                  </div>
                  <Form onSubmit={onFinish}>
                    {error && (
                      <Alert
                        show={showAlert}
                        variant="danger"
                        onClose={() => setShowAlert(false)}
                        dismissible
                      >
                        {error}
                      </Alert>
                    )}
                    <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        name="newPassword"
                        type="password"
                        placeholder="newPassword"
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
                    Already have an account? <Link to="/signin">Sign In</Link>
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

export default ResetPassword;
