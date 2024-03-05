import React, { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useToast } from "../../../hooks/useToast";
import { API } from "../../../constants/constant";
import { setToken } from "../../../helpers/helpers";
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
import BannerLeftAuthen from "../bannerLeftAuthen";
import { forgotPasswordAdmin } from "../../../services/admin/apiAdminServices";

const ForgotPasswordAdmin = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { setUser } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const onFinish = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const userEmail = formData.get("email");
      setEmail(userEmail);

      // Use the new service function
      await forgotPasswordAdmin(userEmail);
      // Handle navigation or UI changes as needed
      navigate("/confirm-code", { replace: true });
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
                  <div className="my-3 mb-7">
                    <h3 className="text-body-highlight fw-bold">
                      Forgot Password?
                    </h3>
                    <p className="text-body-tertiary">
                      Give your email's aldready signed up on FiMi
                    </p>
                  </div>
                  <Form onSubmit={onFinish}>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        placeholder="name@example.com"
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
                    Already have an account? <Link to="/signin/admin">Sign In</Link>
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

export default ForgotPasswordAdmin;
