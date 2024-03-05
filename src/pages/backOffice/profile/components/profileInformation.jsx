import { Card, Form, Row, Col, Button } from "react-bootstrap";
import { useState } from "react";

import HtmlQuillRenderer from "../../../../components/HtmlQuillRenderer/HtmlQuillRenderer";

export default function ProfileInformation({
  user,
  setFormData,
  formData,
  handleProfileUpdate,
  handleCancel,
  handleInputChange,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <>
      <Form>
        <Card border="0" className="shadow-sm mb-3">
          <Card.Header className="border-bottom-0 px-4 pt-4 bg-white">
            <Card.Title>Account Information</Card.Title>
            <p className="mb-0 fs-6 text-muted">
              Edit your personal information and address.
            </p>
          </Card.Header>
          <Card.Body className="px-4">
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="fw-bold">First Name</Form.Label>
                  <Form.Control
                    value={formData.firstName || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="fw-bold">Last Name</Form.Label>
                  <Form.Control
                    value={formData.lastName}
                    onChange={handleInputChange}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control
                    value={formData.email}
                    onChange={handleInputChange}
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label className="fw-bold">Website Url</Form.Label>
                  <Form.Control
                    value={formData.website_url}
                    onChange={handleInputChange}
                    type="text"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="bio">
                  <Row className="justify-content-between">
                    <Col>
                      <Form.Label className="fw-bold">Bio</Form.Label>
                    </Col>
                    <Col xs="auto">
                      <Button
                        className="mb-2"
                        variant="light"
                        onClick={() => setIsEditMode((prevMode) => !prevMode)}
                      >
                        {isEditMode ? "View" : "Edit"}
                      </Button>
                    </Col>
                  </Row>

                  <HtmlQuillRenderer
                    content={formData.bio}
                    onContentChange={(editedBio) =>
                      setFormData({ ...formData, bio: editedBio })
                    }
                    readOnly={!isEditMode}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="bg-white border-top-0 pb-3">
            <Button onClick={handleProfileUpdate} className="me-2">
              Save
            </Button>
            <Button variant="light" onClick={handleCancel}>
              Cancel
            </Button>
          </Card.Footer>
        </Card>
      </Form>
    </>
  );
}
