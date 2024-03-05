import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Badge,
  Image,
} from "react-bootstrap";
import EmptyData from "../EmptyData/EmptyData";
import LoadingBox from "../Loading/Loading";
import FeaturedList from "../FeaturedList/FeaturedList";
import { IconShoppingCartPlus, IconArrowNarrowRight, IconHeart } from '@tabler/icons-react';
import { useToast } from "../../hooks/useToast";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useAuthContext } from "../../contexts/AuthContext";
import { fetchCampaigns } from "../../services/advertiser/apiCampaignServices";
import { useTranslation } from 'react-i18next';
import { getImageUrl } from "../../helpers/helpers";
const CampaignsHome = ({ id }) => {
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const [posts, setPosts] = useState([]);
  const [locale, setLocale] = useState("en");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const toast = useToast();
  const { addToCart } = useCart(); // Get the addToCart function from useCart
  const { addToWishlist, isItemInWishlist } = useWishlist();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetchCampaigns(locale);
        console.log("API Response:", response); // Log the response
        setPosts(response);
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

    fetchPosts();
  }, [locale]);
  function setLang() {
    setLocale(window.locales.value);
  }

  useEffect(() => {
    // Log media information when posts change
    posts.forEach((post, postIndex) => {
      console.log(`Post ${postIndex + 1} Media:`);

      if (post.attributes.media && post.attributes.media.data && post.attributes.media.data.length > 0) {
        post.attributes.media.data.forEach((media, mediaIndex) => {
          if (media.attributes && media.attributes.formats && media.attributes.formats.small) {
            const smallImageUrl = media.attributes.formats.small.url;
            console.log(`  Media ${mediaIndex + 1}:`);
            console.log("    Small Image URL:", smallImageUrl);
          } else {
            console.log(`  Media ${mediaIndex + 1} is missing required attributes`);
          }
        });
      } else {
        console.log("  No media available");
      }
    });
  }, [posts]);


  // Function to handle adding an item to the cart
  const handleAddToCart = (campaign) => {
    // Use the quantity from the API response, or default to 1 if not present
    const quantity = campaign.attributes.quantity || 1;
    addToCart({
      id: campaign.id,
      name: campaign.attributes.campaignName,
      price: campaign.attributes.price || 0, // Adjust based on your API response
      quantity: quantity,
    });
    toast.success(`${campaign.attributes.campaignName} added to the cart!`);
  };


  return (
    <section id={id} className="album py-7 bg-body-tertiary">
      <Container className="d-flex h-100 flex-column align-items-center">
        <Row className="mb-5 w-100">
          <Col lg={{ span: 6, offset: 3 }} className="text-center">
            <h2 className="fw-bold">🔥{t('campaigns')}</h2>
          </Col>
        </Row>
        {loading ? (
          <LoadingBox show={loading} message="Fetching. This may take a moment..." />
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="w-100 align-items-stretch">
            {Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post, index) => (
                <Col key={index} className="mb-4">
                  <Card className="card-sm border-0 shadow-sm h-100">
                    {post.attributes.media && post.attributes.media.data ? (
                      Array.isArray(post.attributes.media.data) ? (
                        post.attributes.media.data.map((image, imageIndex) => (
                          <Card.Img
                            variant="top"
                            key={imageIndex}
                            src={getImageUrl(image, 'small')}
                            alt={`Image ${imageIndex + 1}`}
                          />
                        ))
                      ) : (
                        <Card.Img
                          variant="top"
                          src={getImageUrl(post.attributes.media.data, 'small')}
                          alt={`Image 1`}
                        />
                      )
                    ) : (
                      <span className="p-3 text-center">No images available</span>
                    )}
                    <Card.Body className="p-0">
                      <Card.Title className="p-3">
                        {post.attributes.campaignName ? (
                          <Link to={`campaigns/${post.id}`} className="link-dark text-decoration-none">{post.attributes.campaignName}</Link>
                        ) : (
                          <Link to={`campaigns/${post.id}`} className="link-dark text-decoration-none">N/A</Link>
                        )}
                      </Card.Title>
                      <FeaturedList content={post.attributes.featureds || []} />
                    </Card.Body>
                    {user ? (
                      <Card.Footer className="p-0 text-center d-flex card-footer">
                        <button
                          className="btn btn-light col rounded-0 d-flex justify-content-center align-items-center"
                          onClick={() => handleAddToCart(post)}
                        >
                          <IconShoppingCartPlus size={18} className="me-1" /> Add
                        </button>
                        <button
                          className="btn btn-light col rounded-0 d-flex justify-content-center align-items-center"
                          onClick={() => {
                            if (!isItemInWishlist(post.id)) {
                              addToWishlist(post);
                              toast.success(`${post.attributes.campaignName} added to the wishlist!`);
                            } else {
                              toast.info(`${post.attributes.campaignName} is already in the wishlist.`);
                            }
                          }}
                          disabled={isItemInWishlist(post.id)}
                        >
                          <IconHeart size={18} className="me-1" /> Wishlist
                        </button>
                      </Card.Footer>
                    ) : null}

                  </Card>
                </Col>
              ))
            ) : (
              <Col className="mx-auto">
                <EmptyData message="No posts available" />
              </Col>
            )}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default CampaignsHome;
