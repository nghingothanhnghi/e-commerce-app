import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API } from "../../../../constants/constant";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import RichTextEditorQuillToMd from "../../../../components/RichTextEditorQuillToMd/RichTextEditorQuillToMd";
import { IconUser } from "@tabler/icons-react";
import { useToast } from "../../../../hooks/useToast";

export default function UserEdit({ show, onClose, onEditUser, user }) {
  const [formData, setFormData] = useState({
    username: "",
    confirmed: false,
    userType: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    console.log("User prop:", user);
    console.log("FormData about:", formData.about);
    // Update formData when the user prop changes
    setFormData({
      username: user.username || "",
      confirmed: user.confirmed || false,
      userType: user.userType || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      about: user.about || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    // Use a conditional to handle the type of input
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleAboutChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      about: value,
    }));
  };

  const handleConvertToMarkdown = (mdContent) => {
    console.log("Markdown Content:", mdContent);
    // You can use the converted Markdown content as needed
  };

  const validateForm = () => {
    if (
      !formData.username ||
      !formData.confirmed ||
      !formData.userType ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  const handleEditUser = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      // Validate the form data
      if (!validateForm()) {
        return;
      }

      // Make an API request to add the new user
      const response = await axios.put(`${API}/users/${user.id}`, formData);
      const newUser = response.data;

      // Notify the parent component about the added user
      onAddUser(newUser);
      // Show success toast
      toast.success("User added successfully!");
      // Close the modal
      onClose();
      // Set success state
      setSuccess(true);
    } catch (error) {
      console.error("Error adding new user:", error.message);
      setError("An error occurred while adding the new user.");
      // Show error toast
      toast.error("Error adding new user.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      show={show}
      onHide={onClose}
      size="lg"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-bottom-0 px-4 pb-0">
        <InputGroup>
          <FloatingLabel controlId="floatingInput" label="Username">
            <Form.Control
              value={formData.username}
              onChange={handleChange}
              name="username"
              type="text"
              autoFocus
              readOnly
              className="border-end-0"
            />
          </FloatingLabel>
          <InputGroup.Text className="border-start-0 bg-white text-muted">
            <IconUser />
          </InputGroup.Text>
          <FloatingLabel controlId="userType" label="User Type">
            <Form.Select
              className="rounded-start-0 rounded-top rounded-0"
              value={formData.userType}
              onChange={handleChange}
              name="userType"
            >
              <option disabled>---- Select ----</option>
              <option value="admin" disabled={formData.userType === "admin"}>
                Admin
              </option>
              <option
                value="advertiser"
                disabled={formData.userType === "advertiser"}
              >
                Advertiser
              </option>
              <option
                value="publisher"
                disabled={formData.userType === "publisher"}
              >
                Publisher
              </option>
            </Form.Select>
          </FloatingLabel>
        </InputGroup>
      </Modal.Header>
      <div className="px-4">
        <InputGroup
          size="sm"
          className="btn-group-nested-no-bdr-top input-group input-group-sm"
        >
          <Form.Check
            type="switch"
            name="confirmed"
            label="Confirmed"
            checked={formData.confirmed}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <Modal.Body className="px-4 py-0 modal-dialog-scrollable scrll-max-h400">
        <dl className="row mb-0">
          <dt className="col-md-4 border-end pt-4 py-md-4">
            <span className="text-muted">User Information</span>
            <p className="fw-light mt-1">
              <small className="fw-light text-muted">
                Personal details of the user, such as name, email address,
                username, and contact information.
              </small>
            </p>
          </dt>
          <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="fw-bold">First Name</Form.Label>
                  <Form.Control
                    value={formData.firstName}
                    onChange={handleChange}
                    name="firstName"
                    type="text"
                    placeholder="Your First Name"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="fw-bold">Last Name</Form.Label>
                  <Form.Control
                    value={formData.lastName}
                    onChange={handleChange}
                    name="lastName"
                    type="text"
                    placeholder="Your Last Name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="fw-bold">Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="rePassword">
                  <Form.Label className="fw-bold">Confirm Password</Form.Label>
                  <Form.Control
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="about">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  {/* <Form.Control
                    value={formData.about}
                    onChange={handleChange}
                    name="about"
                    as="textarea"
                    rows={3}
                  /> */}
                  <RichTextEditorQuillToMd
                    value={formData.about}
                    onChange={(value) => handleAboutChange(value)}
                    onConvert={(mdContent) =>
                      handleConvertToMarkdown(mdContent)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          </dd>
        </dl>

        {/* {error && (
            <Alert variant="danger" className="m-4">
              {error}
            </Alert>
          )}
          {success && (
            <Alert variant="success" className="m-4">
              User added successfully!
            </Alert>
          )} */}
      </Modal.Body>
      <Modal.Footer className="flex-nowrap p-0">
        <Button
          disabled={loading}
          onClick={handleEditUser}
          variant="primary"
          className="fs-6 text-decoration-none col-6 py-2 m-0 rounded-0 border-end"
        >
          {loading ? (
            <>
              Editting... <Spinner size="sm" animation="grow" />
            </>
          ) : (
            "Ok"
          )}
        </Button>
        <Button
          variant="link"
          onClick={onClose}
          className="fs-6 text-decoration-none col-6 py-2 m-0 rounded-0"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
