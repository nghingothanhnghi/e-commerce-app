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

import { useAuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../hooks/useToast";
import { API } from "../../constants/constant";
import { setToken } from "../../helpers/helpers";
import { getToken } from "../../helpers/helpers";

import BannerLeftAuthen from "./bannerLeftAuthen";
// import UserTypeDialog from "./userTypeDialog";

const SignIn = () => {
  const navigate = useNavigate();
  const toast = useToast();
  // const { setUser, userType } = useAuthContext();
  const { setUser} = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const [showUserTypeDialog, setShowUserTypeDialog] = useState(false);
  // const [selectedUserType, setSelectedUserType] = useState(null);

  useEffect(() => {
    const token = getToken();

  //   if (token) {
  //     navigate(`/dashboard?usertype=${userType}`, { replace: true });
  //   } else {
  //     // Show the user type dialog on the first sign-in
  //     setShowUserTypeDialog(true);
  //   }
  // }, [navigate, userType]);
  if (token) {
    navigate(`/dashboard`, { replace: true });
  } 
}, [navigate]);

  // const onSelectUserType = (userType) => {
  //   console.log("Selected User Type:", userType);
  //   // Set the selected user type
  //   setSelectedUserType(userType);
  //   console.log("Render - Selected User Type:", selectedUserType);
  //   // Hide the dialog and navigate to the selected user type route
  //   setShowUserTypeDialog(false);
  //   navigate(`/signin?usertype=${userType}`);
  // };

  const onFinish = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.target);
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password }),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);
        toast.success(`Welcome back ${data.user.firstName}!`);

        // Navigate to the dashboard with the user type as a query parameter
        // const userTypeRoute = selectedUserType
        //   ? `/dashboard?usertype=${selectedUserType.toLowerCase()}`
        //   : "/dashboard";
        // navigate(userTypeRoute, { replace: true });

        navigate("/dashboard", { replace: true });
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
    <>
      <Container className="h-100">
        <Row className="justify-content-md-center align-items-center h-100">
          <Col lg="12">
            <Card border="0" className="shadow-sm rounded-4">
              <Card.Body className="py-5 px-5">
                <Row>
                  <Col className="d-none d-md-flex">
                    <BannerLeftAuthen />
                  </Col>
                  <Col md={6} lg={4} className="ps-md-5 border-md-start">
                    <div className="mt-3 mb-7">
                      <h3 className="text-body-highlight fw-bold">
                        Welcome to FiMi
                      </h3>
                      <p className="text-body-tertiary">
                        {/* {selectedUserType === "publisher"
                          ? "Get access to Publisher"
                          : selectedUserType === "advertiser"
                          ? "Get access to Advertiser"
                          : "The best Advertiser & Publisher in Vietnam"} */}
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
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Email address</Form.Label>
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
                          <Link to="/forgot-password">Forgot password?</Link>
                        </Col>
                      </Row>
                    </Form>
                    <div className="form_help_text mt-5">
                      New to Social Cards? <Link to="/signup">Sign Up</Link>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Render the user type dialog */}
      {/* <UserTypeDialog
        show={showUserTypeDialog && !getToken() && !selectedUserType}
        onHide={() => setShowUserTypeDialog(false)}
        onSelectUserType={onSelectUserType}
      /> */}
    </>
  );
};

export default SignIn;
