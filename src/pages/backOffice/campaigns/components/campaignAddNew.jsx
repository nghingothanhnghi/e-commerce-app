import React, { useState, useEffect, useCallback, useRef } from "react";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import FileUpload from "../../../../components/UploadFile/UploadFile";
import RichTextEditorQuillToMd from "../../../../components/RichTextEditorQuillToMd/RichTextEditorQuillToMd";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";
import { IconCopy, IconCrosshair } from "@tabler/icons-react";

import { useToast } from "../../../../hooks/useToast";
import {
  createCampaign,
} from "../../../../services/advertiser/apiCampaignServices";

export default function CampaignAddNew({ show, onClose, onAddPost, lang }) {
  const [formData, setFormData] = useState({
    campaignName: "",
    campaignUrl: "",
    campaignType: "",
    budget: "",
    currency: "VND", // Set to your default currency value
    startedDate: null, // Initialize with null
    endedDate: null, // Initialize with null
    description: "",
    media: [], // Initialize as an empty array
    status: "Inactive",
    locale: lang,
    gender:[]
  });

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputRef = useRef(null);

  // If lang can change dynamically, update formData.locale when lang changes
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      locale: lang,
    }));
  }, [lang]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    console.log("Handling change for:", name);
    console.log("Current error state:", error);

    // Check if 'error' is an object and has the specified property
    if (error && typeof error === "object" && name in error) {
      console.log(`Clearing error for ${name}`);
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } else if (!error) {
      console.log("Error state is null, creating an empty object");
      setError({ [name]: undefined });
    }
    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
      // If the changed field is 'campaignName', update 'campaignUrl'
      ...(name === "campaignName" && {
        campaignUrl: value.toLowerCase().replace(/\s+/g, "-"),
      }),
    }));

    // Clear the specific error for the field being updated
    if (name in error) {
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
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

  useEffect(() => {
    console.log("Component rerendered:", formData);
  }, [formData]);
  // const validateForm = () => {
  //   if (
  //     !formData.campaignName ||
  //     !formData.campaignType ||
  //     !formData.budget ||
  //     !formData.currency ||
  //     !formData.startedDate ||
  //     !formData.endedDate
  //   ) {
  //     toast.error("Please fill in all fields.");
  //     return false;
  //   }

  //   return true;
  // };

  const validateForm = () => {
    const errors = {};

    // Validate individual fields
    if (!formData.campaignName) {
      errors.campaignName = "Campaign Name is required";
    }
    if (!formData.campaignType) {
      errors.campaignType = "Campaign Type is required";
    }
    if (!formData.budget) {
      errors.budget = "Budget is required";
    }

    if (!formData.currency) {
      errors.currency = "Currency is required";
    }
    if (!formData.startedDate) {
      errors.startedDate = "Started Date is required";
    }
    if (!formData.endedDate) {
      errors.endedDate = "Ended Date is required";
    }

    return { errors, isValid: Object.keys(errors).length === 0 };
  };

  // const handleFileChange = (file) => {
  //   if (file.type.startsWith("image/")) {
  //     // Update formData with the selected file
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       media: file,
  //     }));
  //   } else {
  //     toast.error("Please select a valid image file.");
  //   }
  // };

  const handleFileChange = (files) => {
    setFormData((prevData) => ({
      ...prevData,
      media: [...prevData.media, ...files],
    }));
  };


  const handleSelectChange = (selectedOptions, name) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: selectedValues,
    }));
  };

  const handleAddPost = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Validate the form data
      const { errors, isValid } = validateForm();

      if (!isValid) {
        // Display error messages using toasts or other UI components
        Object.values(errors).forEach((errorMessage) => {
          toast.error(errorMessage);
        });

        setLoading(false);
        return;
      }

      // Validate budget as a number
      if (isNaN(formData.budget)) {
        toast.error("Budget must be a valid number.");
        setLoading(false);
        return;
      }

      // Upload the media file to Strapi
      // const mediaFile = await uploadFile(formData.media);
  

      // Use the RichTextEditorWithConversion component here
      // Pass the HTML content and a callback function to handle the conversion result

      handleConvertToMarkdown(formData.description);

      // Generate a unique identifier
      const uniqueId = uuidv4();
      // Include the campaignUrl in the form data
      const formDataWithUrl = {
        ...formData,
        campaignUrl: `${formData.campaignUrl}-${uniqueId}-tracking`,
        // media: mediaFile, // Assuming this is the file object returned from the server
      };

      // Log formData before making the API call
      console.log("formData before API call:", formDataWithUrl);

      // Make an API request to add the new post
      const newCampaign = await createCampaign(formDataWithUrl);

      // Log the response from the createCampaign API call
      console.log("createCampaign Response:", newCampaign);

      // Check if the API response contains the expected data
      if (!newCampaign?.data?.campaignUrl) {
        throw new Error("Invalid response format from the server.");
      }

      // Extract the new campaignUrl from the response
      const newCampaignUrl = newCampaign?.data?.campaignUrl;

      // Update the campaignUrl in the form data
      setFormData((prevData) => ({
        ...prevData,
        campaignUrl: newCampaignUrl,
      }));

      // Notify the parent component about the added post
      onAddPost(newCampaign);

      // Show success toast
      toast.success("post added successfully!");
      // Close the modal
      onClose();
      // Set success state
      setSuccess(true);
    } catch (error) {
      console.error('Error adding new post:', error.message);
      setError(error.message || 'An error occurred while adding the new post.');
      // Show error toast
      toast.error(error.message || 'Error adding new post.');
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
                type="text"
                placeholder="name@example.com"
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
              className="rounded-start-0 rounded-0 border-end-0"
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
                    placeholder="100.000.000"
                  />
                  <Form.Select
                    className="col-fixed-w90"
                    value={formData.currency}
                    onChange={handleChange}
                    name="currency"
                  >
                    <option value="VND">VND</option>
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
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="rePassword">
                    <Form.Label className="fw-bold">Ended Date</Form.Label>
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
                      loading={loading}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </dd>
          </dl>
        </Modal.Body>
        <Modal.Footer className="flex-nowrap p-0">
          <Button
            disabled={loading || success}
            onClick={handleAddPost}
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
      </Form>
    </Modal>
  );
}
