import React, { useState } from 'react';
import { Form, Button, Offcanvas, OffcanvasTitle, Container, Row, Col, Spinner } from "react-bootstrap";
import { IconLinkPlus } from '@tabler/icons-react';
import useToggleClass from "../../hooks/useToggleClass";
import { useToast } from '../../hooks/useToast';
import { signUpPublisher } from '../../services/publisher/apiPublisherServices';
import { generateRandomPassword } from '../../helpers/helpers';
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from 'react-i18next';
const FormGeneratedLink = ({ post, onGeneratedLink }) => {
    const { t } = useTranslation();
    const [isActive, toggleClass] = useToggleClass();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        introCode: '',
        password: '',
        referLinked: '',
    });

    const toast = useToast();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        toggleClass(); // Call the first action
        setShow(true); // Call the second action
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const generateCode = () => {
        // Create a code based on the form data or any other logic
        const generatedCode = `${formData.introCode}${Math.floor(Math.random() * 1000000)}`;
        console.log('Generated Code:', generatedCode);
        // Handle the generated code as needed
    };

    const validateForm = () => {
        const errors = {};
        // Validate individual fields
        if (!formData.firstName) {
            errors.firstName = "First Name is required";
        }
        if (!formData.lastName) {
            errors.lastName = "Last Name is required";
        }
        if (!formData.email) {
            errors.email = "email is required";
        }

        if (!formData.introCode) {
            errors.introCode = "Code reference is required";
        }

        return { errors, isValid: Object.keys(errors).length === 0 };
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
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

            // If password is not provided, generate a random one
            const password = formData.password || generateRandomPassword();

            // Use the email as the username
            const username = formData.email;

            // Generate the link using the specified format
            const generatedLink = `${post.attributes.campaignName.replace(/\s+/g, '-')}-${formData.introCode}-${uuidv4()}`;


            console.log('Full error object:', generatedLink);

            // Set referedLink to the generatedLink in the form data
            const formDataWithReferedLink = {
                ...formData,
                referLinked: generatedLink,
            };

            // Call the signUpPublisher service with the form data
            await signUpPublisher({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                introCode: formData.introCode,
                referLinked: formDataWithReferedLink.referLinked,
                username,
                password,
            });

            // If successful, generate code and close the Offcanvas
            generateCode();

            // Pass the generated link to the parent component
            onGeneratedLink(generatedLink);


            // Set success state to true
            setSuccess(true); // Set success state to true
            // toast success and generated link
            toast.success(`Generated link has been created successfully! Link: ${generatedLink}`);
            // Add a delay to allow the user to see the success message
            setTimeout(() => {
                handleClose();
                setSuccess(false);
            }, 2000); // Adjust the delay time as needed

        } catch (error) {
            // Log the entire error object to inspect its structure
            console.log('Full error object:', error);
            setError(error || 'An error occurred while generate a link.');
            // Handle API error, show error message, etc.
            toast.error(error || 'Error adding new guest for generated link.'); // Show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={handleShow} variant="warning" className="align-items-center p-2 rounded-pill justify-content-center fs-6">
                <IconLinkPlus />
            </Button>
            <Offcanvas show={show} onHide={handleClose} placement="bottom" className={`form-offcanvas-container ${isActive ? 'active' : ''}`}>
                <Offcanvas.Header>
                    <Container>
                        <Row className='py-4'>
                            <Col lg={{ span: 6, offset: 3 }}>
                                <div className='d-flex justify-content-between'>
                                    <div className='col'>
                                        <Offcanvas.Title className='fw-bold'>✨⭐ {post.attributes.campaignName}</Offcanvas.Title></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="formFirstName" className='mb-3'>
                                            <Form.Label>{t('firstName')}</Form.Label>
                                            <Form.Control type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formLastName" className='mb-3'>
                                            <Form.Label>{t('lastName')}</Form.Label>
                                            <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="formEmail" className='mb-3'>
                                    <Form.Label>{t('email')}</Form.Label>
                                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                                </Form.Group>
                                <Form.Group controlId="formIntroCode" className='mb-3'>
                                    <Form.Label>{t('introductionCode')}</Form.Label>
                                    <Form.Control type="text" name="introCode" pattern="[A-Za-z0-9]{6}" title="Six characters, including alphabets and numbers" value={formData.introCode} onChange={handleChange} required />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </Offcanvas.Body>
                <div className="offcanvas-footer">
                    <Container>
                        <Row>
                            <Col lg={{ span: 6, offset: 3 }} className='p-3 d-flex gap-2 justify-content-end'>
                                <Button onClick={handleFormSubmit} variant="warning" type="submit" disabled={loading} className='d-flex align-items-center justify-content-center px-4 col col-lg-4 '>
                                    {loading ? (
                                        <Spinner animation="border" size="sm" role="status" aria-hidden="true" />
                                    ) : (
                                        <>
                                            <IconLinkPlus className='me-1' /> {t('generateLink')}
                                        </>
                                    )}
                                </Button>
                                <Button onClick={handleClose} variant="light" type="reset" className='d-flex align-items-center justify-content-center px-4 col col-lg-4'>
                                    {t('close')}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Offcanvas>
        </>
    );
};

export default FormGeneratedLink;
