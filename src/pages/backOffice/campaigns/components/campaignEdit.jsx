import React, { useState, useEffect, useCallback, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import FileUpload from "../../../../components/UploadFile/UploadFile";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RichTextEditorQuillToMd from "../../../../components/RichTextEditorQuillToMd/RichTextEditorQuillToMd";
import { IconPennant, IconCopy, IconCrosshair } from "@tabler/icons-react";
import { formatDecimal, getCurrencySymbol } from "../../../../helpers/helpers";
import { useToast } from "../../../../hooks/useToast";
import { editCampaign } from "../../../../services/advertiser/apiCampaignServices";

export default function CampaignEdit({
  show,
  onClose,
  onSaveEdit,
  post,
  refreshCampaignsList,
}) {
  const [formData, setFormData] = useState({
    campaignName: "",
    campaignUrl: "",
    campaignType: "",
    budget: "",
    currency: "",
    startedDate: "", // Initialize with null
    endedDate: "", // Initialize with null
    description: "",
    file: null,
    status: "",
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const inputRef = useRef(null);

  // change currency also change symbol from budget
  useEffect(() => {
    const formattedBudget = formatDecimal(
      post.attributes.budget,
      getCurrencySymbol(formData.currency)
    );

    setFormData((prevData) => ({
      ...prevData,
      budget: formattedBudget,
    }));
  }, [formData.currency, post.attributes.budget]);

  useEffect(() => {
    const formattedBudget = formatDecimal(
      post.attributes.budget,
      getCurrencySymbol(post.attributes.currency)
    );
    // Update formData when the post prop changes
    setFormData({
      campaignName: post.attributes.campaignName || "",
      campaignUrl: post.attributes.campaignUrl || "",
      campaignType: post.attributes.campaignType || "",
      budget: formattedBudget,
      currency: post.attributes.currency || "",
      description: post.attributes.description || "",
      startedDate: post.attributes.startedDate
        ? new Date(post.attributes.startedDate)
        : null,
      endedDate: post.attributes.endedDate
        ? new Date(post.attributes.endedDate)
        : null,
      status: post.attributes.status || "",
    });
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      description: value,
    }));
  };

  const handleConvertToMarkdown = (mdContent) => {
    console.log("Markdown Content:", mdContent);
    // You can use the converted Markdown content as needed
  };

  const handleCopyClick = () => {
    // Check if the input reference exists
    if (inputRef.current) {
      // Select the text inside the input
      inputRef.current.select();
      // Copy the selected text to the clipboard
      document.execCommand("copy");
      // Deselect the text
      inputRef.current.setSelectionRange(0, 0);
      // Show a toast or any other indication that the text is copied
      toast.success("URL Tracking copied to clipboard!");
    }
  };

  const validateForm = () => {
    if (!formData.campaignName) {
      toast.error("Please fill in all fields.");
      return false;
    }

    return true;
  };

  const handleFileChange = (file) => {
    if (file.type.startsWith("image/")) {
      // Update formData with the selected file
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleSelectChange = (selectedOptions, name) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      // Validate the form data
      if (!validateForm()) {
        return;
      }
      // Make an API request to edit the campaign
      const updatedPost = await editCampaign(post.id, { data: formData });

      // Notify the parent component about the edited campaign
      onSaveEdit(updatedPost);
      // Call the callback to refresh the campaigns list
      refreshCampaignsList();
      // Show success toast
      toast.success("Campaign updated successfully!");
      // Close the modal
      onClose();
      // Set success state
      setSuccess(true);
    } catch (error) {
      console.error("Error updating campaign:", error.message);
      setError("An error occurred while updating campaign.");
      // Show error toast
      toast.error("Error updating campaign.");
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
      <Form className="d-flex flex-column">
        <Modal.Header className="border-bottom-0 px-4 pb-0">
          <InputGroup>
            <FloatingLabel controlId="campaignName" label="Campaign Name">
              <Form.Control
                value={formData.campaignName}
                onChange={handleChange}
                name="campaignName"
                autoFocus
                className="border-end-0 rounded-top rounded-0 rounded-end-0"
              />
            </FloatingLabel>
            <InputGroup.Text className="border-end-0 bg-white rounded-0 text-muted">
              <IconCrosshair />
            </InputGroup.Text>
            <FloatingLabel controlId="status" label="Status" className="col-fixed-w150">
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="rounded-start-0 rounded-top rounded-0"
              >
                <option value="Inactive">Inactive</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Rejected">Rejected</option>
                <option value="Approved">Approved</option>
                <option value="Running">Running</option>
              </Form.Select>
            </FloatingLabel>
          </InputGroup>
        </Modal.Header>
        <div className="px-4">
          <InputGroup size="sm" className="btn-group-nested-no-bdr-top">
            <Form.Control
              ref={inputRef}
              name="campaignUrl"
              value={formData.campaignUrl}
              onChange={handleChange}
              className="rounded-start-0 rounded-0 border-end-0 text-muted"
              readOnly
            />
            <InputGroup.Text className="border-start-0 border-end-0 bg-white rounded-0 text-muted">
              URL Tracking
            </InputGroup.Text>
            <InputGroup.Text
              onClick={handleCopyClick}
              className="border-start-0 bg-white rounded-start-0 rounded-0 rounded-bottom"
              title="Copy Url"
            >
              <IconCopy />
            </InputGroup.Text>
          </InputGroup>
        </div>
        <Modal.Body className="px-4 py-0 modal-dialog-scrollable scrll-max-h400">
          <dl className="row mb-0">
            <dt className="col-md-4 border-end pt-4 py-md-4">
              <span className="text-muted">Basic Information</span>
              <p className="fw-light mt-1">
                <small className="fw-light text-muted">
                  A campaign typically requires various pieces of information to
                  effectively plan, execute, and track its progress. Beside is a
                  short description of key information elements needed for a
                  campaign.
                </small>
              </p>
            </dt>
            <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="description">
                    <Form.Label className="fw-bold">Description</Form.Label>
                    <RichTextEditorQuillToMd
                      value={formData.description}
                      onChange={(value) => handleDescriptionChange(value)}
                      onConvert={(mdContent) =>
                        handleConvertToMarkdown(mdContent)
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="campaignType">
                <Form.Label className="fw-bold">Campaign Type</Form.Label>
                <Form.Select
                  value={formData.campaignType}
                  onChange={handleChange}
                  name="campaignType"
                >
                  <option>---- Select ----</option>
                  <option value="Image">Image</option>
                  <option value="Video">Video</option>
                  <option value="Other">Others</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Budget</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={formData.budget}
                    onChange={handleChange}
                    name="budget"
                  />
                  <Form.Select
                    className="col-fixed-w90"
                    value={formData.currency}
                    onChange={handleChange}
                    name="currency"
                  >
                    <option value="VNĐ">VND</option>
                    <option value="USD">USD</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="startedDate">
                    <Form.Label className="fw-bold">Started Date</Form.Label>
                    <DatePicker
                      className="form-control"
                      selected={formData.startedDate}
                      onChange={(date) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          startedDate: date,
                        }))
                      }
                      showTimeSelect
                      dateFormat="Pp"
                    />
                    {/* <Form.Control
                      name="startedDate"
                      type="date"
                      value={formData.startedDate || ""}
                      onChange={handleChange}
                    /> */}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="rePassword">
                    <Form.Label className="fw-bold">Ended Date</Form.Label>
                    {/* <Form.Control
                      name="endedDate"
                      type="date"
                      value={formData.endedDate || ""}
                      onChange={handleChange}
                    /> */}
                    <DatePicker
                      className="form-control"
                      selected={formData.endedDate}
                      onChange={(date) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          endedDate: date,
                        }))
                      }
                      showTimeSelect
                      dateFormat="Pp"
                    />
                  </Form.Group>
                </Col>
              </Row>
            </dd>
            <dt className="col-md-4 border-end pt-4 py-md-4">
              <span className="text-muted">What Is a Target Audience?</span>
              <p className="fw-light mt-1">
                <small className="fw-light text-muted">
                  Your target audience refers to the specific group of consumers
                  most likely to want your product or service, and therefore,
                  the group of people who should see your ad campaigns. Target
                  audience may be dictated by age, gender, income, location,
                  interests or a myriad of other factors..
                </small>
              </p>
            </dt>
            <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Label className="fw-bold">Gender</Form.Label>
                    <Row>
                      <Col>
                        <Select
                          isMulti
                          options={[
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                          ]}
                          onChange={(selectedOptions) =>
                            handleSelectChange(selectedOptions, "gender")
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Label className="fw-bold">Age</Form.Label>
                    <Row>
                      <Col>
                        <Select
                          isMulti
                          options={[
                            { value: "18", label: "18" },
                            { value: "20", label: "20" },
                            { value: "30", label: "30" },
                          ]}
                          onChange={(selectedOptions) =>
                            handleSelectChange(selectedOptions, "age")
                          }
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-3" controlId="browsers">
                <Form.Label className="fw-bold">Browsers</Form.Label>
                <Row>
                  <Col>
                    <Select
                      isMulti
                      options={[
                        { value: "chrome", label: "Chrome" },
                        { value: "firefox", label: "Firefox" },
                        { value: "safari", label: "Safari" },
                      ]}
                      onChange={(selectedOptions) =>
                        handleSelectChange(selectedOptions, "browsers")
                      }
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="os">
                <Form.Label className="fw-bold">
                  OS{" "}
                  <small className="fw-light text-muted">
                    (Operation System)
                  </small>
                </Form.Label>
                <Row>
                  <Col>
                    <Select
                      isMulti
                      options={[
                        { value: "window", label: "Window" },
                        { value: "macos", label: "MacOS" },
                        { value: "linux", label: "Linux" },
                      ]}
                      onChange={(selectedOptions) =>
                        handleSelectChange(selectedOptions, "os")
                      }
                    />
                  </Col>
                </Row>
              </Form.Group>
            </dd>
            <dt className="col-md-4 border-end pt-4 py-md-4">
              <span className="text-muted">Upload Media</span>
              <p className="fw-light mt-1">
                <small className="fw-light text-muted">
                  You can upload image with format: jpg. Maximum 1MB
                </small>
              </p>
            </dt>
            <dd className="col-md-8 ps-lg-4 pt-0 pb-4 py-md-4">
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="uploadImage">
                    <Form.Label className="fw-bold">Upload</Form.Label>
                    <FileUpload
                      onFileChange={handleFileChange}
                      multiple={true}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </dd>
          </dl>
        </Modal.Body>
        <Modal.Footer className="flex-nowrap p-0">
          <Button
            disabled={loading}
            onClick={handleSaveEdit}
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
      </Form>
    </Modal>
  );
}
