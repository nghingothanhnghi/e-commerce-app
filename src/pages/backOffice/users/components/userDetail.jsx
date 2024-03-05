import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

export default function UserDetail({ show, onClose, user }) {
  // Check if user is available
  if (!user) {
    return null;
  }

  const { firstName, lastName, email, status } = user;

  return (
    <Modal show={show} onHide={onClose} size="lg" centered backdrop="static" keyboard={false}>
      <Modal.Header className="p-4">
        <Modal.Title>
          {firstName && lastName ? (
            <span>{firstName} {lastName}</span>
          ) : (
            <span>N/A</span>
          )}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-0 modal-dialog-scrollable scrll-max-h400">
        <dl className="row mb-0">
          <dt className="col-md-4 border-end pt-4 py-md-4">
            <span className="text-muted">User Information</span>
            <p className="fw-light mt-1"><small className="fw-light text-muted">Personal details of the user, such as name, email address, username, and contact information.</small></p>
          </dt>
          <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label sm="2">
                    First Name
                  </Form.Label>
                  <Form.Control plaintext readOnly defaultValue={firstName} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label sm="2">
                    Last Name
                  </Form.Label>
                  <Form.Control plaintext readOnly defaultValue={lastName} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label sm="2">
                    Email
                  </Form.Label>
                  <Form.Control plaintext readOnly defaultValue={email} />
                </Form.Group>
              </Col>
            </Row>
          </dd>
        </dl>
      </Modal.Body>
      <Modal.Footer className='flex-nowrap p-0'>
        <Button variant="link" onClick={onClose} className='fs-6 text-decoration-none col py-2 m-0 rounded-0'>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
