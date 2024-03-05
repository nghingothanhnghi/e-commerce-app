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
import FileUpload from "../../../../components/UploadFile/UploadFile";
import RichTextEditorQuillToMd from "../../../../components/RichTextEditorQuillToMd/RichTextEditorQuillToMd";
import { IconUser } from "@tabler/icons-react";
import { useToast } from "../../../../hooks/useToast";

export default function UserAddNew({ show, onClose, onAddUser }) {
  const [formData, setFormData] = useState({
    username: "",
    confirmed: false,
    userType: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    about: "",
    avatarMedia: []
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    // Use checked for checkboxes
    const updatedValue = type === 'checkbox' ? checked : value;
  
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

  const handleFileChange = (file) => {
    console.log("selected file:", file);
  };

  // const handleFileChange = (file) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     avatarMedia: file  // Assuming you want to allow only one avatar file
  //   }));
  //   console.log("selected file:", file);
  // };

  const validateForm = () => {
    if (
      !formData.username ||
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

  const handleAddUser = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      // Validate the form data
      if (!validateForm()) {
        return;
      }

      // Use the RichTextEditorWithConversion component here
      // Pass the HTML content and a callback function to handle the conversion result
      handleConvertToMarkdown(formData.about);

      // Make an API request to add the new user
      const response = await axios.post(`${API}/users`, formData);
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
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }

      console.error("Error config:", error.config);

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
              placeholder="name@example.com"
              autoFocus
              className="border-end-0"
            />
          </FloatingLabel>
          <InputGroup.Text className="border-start-0 bg-white text-muted">
            <IconUser />
          </InputGroup.Text>
          <FloatingLabel
            controlId="userType"
            label="User Type"
            className="col-fixed-w150"
          >
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
          className="btn-group-nested-no-bdr-top justify-content-end "
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
                <Form.Group controlId="about">
                  <Form.Label className="fw-bold">about</Form.Label>
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
          <dt className="col-md-4 border-end pt-4 py-md-4">
            <span className="text-muted">Upload Avarta</span>
            <p className="fw-light mt-1">
              <small className="fw-light text-muted">Upload your image.</small>
            </p>
          </dt>
          <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
            <Form.Group className="mb-3" controlId="uploadImage">
              <Form.Label className="fw-bold">Upload your avatar</Form.Label>
              <FileUpload onFileChange={handleFileChange} multiple={false} />
            </Form.Group>
          </dd>
          <dt className="col-md-4 border-end pt-4 py-md-4">
            <span className="text-muted">Security</span>
            <p className="fw-light mt-1">
              <small className="fw-light text-muted">Mangage your passowrd.</small>
            </p>
          </dt>
          <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
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
          onClick={handleAddUser}
          variant="primary"
          className="fs-6 text-decoration-none col-6 py-2 m-0 rounded-0 border-end"
        >
          {loading ? (
            <>
              Adding... <Spinner size="sm" animation="grow" />
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
