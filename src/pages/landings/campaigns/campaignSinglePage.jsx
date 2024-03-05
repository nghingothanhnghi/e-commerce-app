import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  InputGroup,
  Button,
  Badge,
  Image,
  Form
} from "react-bootstrap";
import EmptyData from "../../../components/EmptyData/EmptyData";
import LoadingBox from "../../../components/Loading/Loading";
import AuthorInfo from "../../../components/AuthorInfo/AuthorInfo";
import FormGeneratedLink from "../../../components/FormGeneratedLink/FormGeneratedLink";
import { useToast } from "../../../hooks/useToast";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";
import { getCampaignDetail } from "../../../services/advertiser/apiCampaignServices";
import { useTranslation } from 'react-i18next';
import { IconCopy } from "@tabler/icons-react";
import { getImageUrl } from "../../../helpers/helpers";
import ReactMarkdown from 'react-markdown';
const CampaignSinglePage = () => {
  const { t } = useTranslation();
  const [post, setPost] = useState(null);
  const { campaignId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const [generatedLink, setGeneratedLink] = useState('');
  const [focusGeneratedLink, setFocusGeneratedLink] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');
  const toast = useToast();

  const { inputRef, copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await getCampaignDetail(campaignId);
        console.log("API Response Campaign Single Page:", response); // Log the response
        setMarkdownContent(response?.attributes?.description || '');
        setPost(response);
      } catch (error) {
        console.error("Error fetching campaigns:", error.message);
        // Handle the error as needed, e.g., display an error message to the post.
        toast.error("An error occurred while fetching data.");
        setError("An error occurred while fetching data."); // Set error state
      } finally {
        // Simulate a delay to make the loading spinner more noticeable
        setTimeout(() => {
          setLoading(false);
          setError(null); // Clear the error state when fetch is successful
        }, 1000); // Adjust the delay time as needed (in milliseconds)
      }
    }

    fetchPost();
  }, [campaignId]);


  const handleGeneratedLink = (newGeneratedLink) => {
    console.log('Received Link generated:', newGeneratedLink); // Log to verify if it receives the link
    setGeneratedLink(newGeneratedLink);
  };


  useEffect(() => {
    if (generatedLink) {
      setFocusGeneratedLink(true);
    }
  }, [generatedLink]);


  return (
    <section className="py-7 bg-body-lightorange">
      <Container className="d-flex h-100 flex-column align-items-center">
        <Row className="mb-5 w-100">
          <Col lg={{ span: 6, offset: 3 }} className="text-center">
            <h1 className="fw-bold">{post?.attributes?.campaignName || "Campaign Name Not Available"}</h1>
            <p className="text-muted">✨⭐ Campaign type: {post?.attributes?.campaignType || "Campaign type Not Available"} ⭐✨</p>
          </Col>
        </Row>
        {loading ? (
          <LoadingBox show={loading} message="Fetching. This may take a moment..." />
        ) : post ? (
          <>
            <Row className="mb-5 w-100">
              <Col lg={{ span: 4, offset: 4 }} className="text-center">
                <Card className="rounded-pill shadow-sm border-0">
                  <Card.Body className="ps-md-4 d-flex justify-content-between align-items-center card-body p-2">
                    <AuthorInfo post={post?.attributes?.author || "Unknown"} />
                    <FormGeneratedLink post={post} onGeneratedLink={handleGeneratedLink} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {generatedLink && (
              <Row className="mb-4 w-100">
                <Col lg={{ span: 4, offset: 4 }} className="text-center">
                  <Form.Label className="fw-bold">👉 {t('linkGeneratedIntro')}</Form.Label>
                  <InputGroup className="generated-link-form">
                    <Form.Control
                      value={generatedLink}
                      readOnly
                      autoFocus={focusGeneratedLink}
                      ref={inputRef}
                    />
                    <Button onClick={copyToClipboard} variant="light">
                      <IconCopy />
                    </Button>
                  </InputGroup>
                </Col>
              </Row>
            )}
            <Row className="mb-5 w-100">
              <Col lg={{ span: 8, offset: 2 }}>
                <Card className="border-0">
                  {post.attributes.media && post.attributes.media.data ? (
                    Array.isArray(post.attributes.media.data) ? (
                      post.attributes.media.data.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          src={getImageUrl(image, 'small')}
                          alt={`Image ${imageIndex + 1}`}
                          className="img-fluid" />

                      ))
                    ) : (
                      <img
                        src={getImageUrl(post.attributes.media.data, 'small')}
                        alt={`Image 1`}
                        className="img-fluid"
                      />
                    )
                  ) : (
                    <span className="p-3 text-center">{t('emptyImage')}</span>
                  )}
                  <Card.Body className="p-5">
                    <h3 className="mb-4 fw-bold text-center">✌️ {t('detail')} ✌️</h3>
                    {/* <div className="preview-container" dangerouslySetInnerHTML={{ __html: markdownContent }} /> */}
                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <EmptyData message="Campaign not found" />
        )}
      </Container>
    </section>
  );
};

export default CampaignSinglePage;
