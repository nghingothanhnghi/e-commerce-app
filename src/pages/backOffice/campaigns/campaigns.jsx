import React, { useState, useEffect, useCallback } from "react";
import { useToast } from "../../../hooks/useToast";
import {
  fetchCampaigns,
  createCampaign,
  editCampaign,
  deleteCampaign,
  getCampaignDetail,
} from "../../../services/advertiser/apiCampaignServices";
import PageHeader from "../../../components/PageHeader/PageHeader";
import SearchCampaignList from "./components/searchCampaignList";
import CampaignList from "./components/campaignList";
import CampaignAddNew from "./components/campaignAddNew";
import CampaignDetail from "./components/campaignDetail";
import CampaignEdit from "./components/campaignEdit";
import Paging from "../../../components/Pagination/Paging";



export default function Campaigns() {
  const [posts, setPosts] = useState([]);
  const [locale, setLocale] = useState("en");
  const [showModal, setShowModal] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const [searchResults, setSearchResults] = useState([]); // Add searchResults state
  const [noMatch, setNoMatch] = useState(false);

  const [selectedPost, setSelectedPost] = useState(null); // Track the selected Post
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [editingPost, setEditingPost] = useState(null);


  const toast = useToast();

  useEffect(() => {
    async function fetchPosts() {
      try {
        // const response = await axios.get(`${API}/campaigns?_locale=${locale}`);
        const response = await fetchCampaigns(locale);
        console.log("API Response:", response); // Log the response
        // Assuming the campaigns are nested under the "data" property
        // const postsArray = response?.data?.data || [];
        // setPosts(postsArray);
        setPosts(response);
      } catch (error) {
        console.error("Error fetching news:", error.message);
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

  const showAddNewsDialog = useCallback(() => {
    setShowModal(true);
  }, []); //

  const handleAddPost = (newPost) => {
    // Update the state with the new Post
    setPosts((prevPosts) => {
      const updatedPosts = [...prevPosts, newPost];
      console.log("Updated Posts:", updatedPosts);
      return updatedPosts;
    });
  };

  // Function to show the PostDetail modal
  const showPostDetailModal = useCallback((post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  }, []);

  // Function to close the PostDetail modal
  const closePostDetailModal = useCallback(() => {
    setSelectedPost(null);
    setShowPostDetail(false);
  }, []);

  const showPostEditModal = (post) => {
    setEditingPost(post);
  };

  const refreshCampaignsList = async () => {
    try {
      const campaigns = await await fetchCampaigns(locale);
      setPosts(campaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      toast.error("Error fetching campaigns.");
    }
  };

  useEffect(() => {
    refreshCampaignsList();
  }, []);

  const handleSaveEdit = async (editedPost) => {
    try {
      const updatedPost = await editCampaign(editedPost.id, editedPost);
      console.log("Updated Post:", updatedPost);
      // Create a new array with the updated post
      const updatedPosts = posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      console.log("Updated Posts Array:", updatedPosts);
      setPosts(updatedPosts);
      setEditingPost(null);
      toast.success("Campaign updated successfully!");
    } catch (error) {
      console.error("Error editing campaign:", error);
      toast.error("Error editing campaign.");
    }
  };

  const closeEditModal = () => {
    setEditingPost(null);
  };

  const handleDeleteCampaign = async (postId) => {
    try {
      await deleteCampaign(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Campaign deleted successfully!");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Error deleting campaign.");
    } 
  };

  /** paging  */

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(50);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    Array.isArray(searchResults) && searchResults.length > 0
      ? searchResults.slice(indexOfFirstPost, indexOfLastPost)
      : posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handlePageSizeChange = (newSize) => {
    setCurrentPage(0); // Reset to the first page when changing page size
    setPostsPerPage(newSize);
  };

  return (
    <>
      <PageHeader
        title="Campaigns"
        showAddNewDialog={showAddNewsDialog} // handle action for add a new post with Dialog CampaignAddNew
        handleUsingAddNew={!showAddNew} // show or hide button add new
      />
      <div className="d-flex justify-content-between mb-3">
        <div></div>
        <div className="col-auto align-self-end">
          <SearchCampaignList
            posts={posts}
            setSearchResults={setSearchResults}
            setNoMatch={setNoMatch}
            placeholder="Search by campaign name..."
          />
        </div>
      </div>
      <div className="card">
        <div className="card-body p-0">
          <CampaignList
            // posts={searchResults.length > 0 ? searchResults : posts}
            posts={currentPosts}
            noMatch={noMatch}
            loading={loading}
            showPostDetailModal={showPostDetailModal}
            showEditPostModal={showPostEditModal}
            handleDelete={handleDeleteCampaign}
            message="Fetching. This may take a moment..."
          />
        </div>
        <div className="card-footer bg-light border-top-0">
          <Paging
            pageCount={Math.ceil(
              (searchResults.length > 0 ? searchResults : posts).length /
                postsPerPage
            )}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            totalItems={
              (searchResults.length > 0 ? searchResults : posts).length
            }
          />
        </div>
      </div>
      <CampaignAddNew
        onAddPost={handleAddPost}
        show={showModal}
        onClose={() => setShowModal(false)}
        lang={setLang}
      />
      {showPostDetail && selectedPost && (
        <CampaignDetail
          show={showPostDetail}
          onClose={closePostDetailModal}
          post={selectedPost} // Pass the selectedPost to PostDetail
        />
      )}

      {editingPost && (
        <CampaignEdit
          show={Boolean(editingPost)}
          onClose={closeEditModal}
          onSaveEdit={handleSaveEdit}
          post={editingPost}
          refreshCampaignsList={refreshCampaignsList} // Pass the refresh callback
        />
      )}
    </>
  );
}
