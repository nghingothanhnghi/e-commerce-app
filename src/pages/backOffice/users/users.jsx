import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API } from "../../../constants/constant";
import { useToast } from "../../../hooks/useToast";

import PageHeader from "../../../components/PageHeader/PageHeader";
import UserList from "./components/userList";
import UserAddNew from "./components/userAddNew";
import UserDetail from "./components/userDetail";
import UserEdit from "./components/userEdit";
import SearchUserList from "./components/searchUserList";
import Paging from "../../../components/Pagination/Paging";

import { fetchUsersList } from "../../../services/admin/apiAdminServices";

export default function Users() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New error state
  const [searchResults, setSearchResults] = useState([]); // Add searchResults state
  const [noMatch, setNoMatch] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null); // Track the selected user
  const [showUserDetail, setShowUserDetail] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const toast = useToast();

  useEffect(() => {
    async function fetchPosts() {
      console.log(posts, "posts");
      try {
        // const response = await axios.get(`${API}/users`);
        
        const response = await fetchUsersList();
        setPosts(response || []);
      } catch (error) {
        console.error("Error fetching news:", error.message);
        // Handle the error as needed, e.g., display an error message to the user.
        setError("An error occurred while fetching data."); // Set error state
        toast.error("An error occurred while fetching data.")
      } finally {
        // Simulate a delay to make the loading spinner more noticeable
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Adjust the delay time as needed (in milliseconds)
      }
    }

    fetchPosts();
  }, []);

  const showAddNewsDialog = useCallback(() => {
    setShowModal(true);
  }, []); //

  const handleAddUser = (newUser) => {
    // Update the state with the new user
    setPosts((prevPosts) => [...prevPosts, newUser]);
  };

  // Function to show the UserDetail modal
  const showUserDetailModal = useCallback((user) => {
    setSelectedUser(user);
    setShowUserDetail(true);
  }, []);

  // Function to close the UserDetail modal
  const closeUserDetailModal = useCallback(() => {
    setSelectedUser(null);
    setShowUserDetail(false);
  }, []);

  const showUserEditModal = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = (editedUser) => {
    // Update the posts state with the edited user
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === editedUser.id ? editedUser : post))
    );

    // Close the editing view
    setEditingUser(null);
  };

  const closeEditModal = () => {
    setEditingUser(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Make an API request to delete the user
      await axios.delete(`${API}/users/${userId}`);

      // Update the posts state by removing the deleted user
      setPosts((prevPosts) => prevPosts.filter((user) => user.id !== userId));

      // Show success toast or message
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // Show error toast
      toast.error("Error deleting user.");
    }
  };

  /** paging  */

  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(50);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (searchResults.length > 0 ? searchResults : posts).slice(
    indexOfFirstPost,
    indexOfLastPost
  );

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
        title="Users"
        showAddNewDialog={showAddNewsDialog} // handle action for add a new post with Dialog UserAddNew
        handleUsingAddNew={!showAddNew} // show or hide button add new
      />
      <div className="d-flex justify-content-between mb-3">
        <div></div>
        <div className="col-auto align-self-end">
          <SearchUserList
            posts={posts}
            setSearchResults={setSearchResults}
            setNoMatch={setNoMatch}
            placeholder="Search by email"
          />
        </div>
      </div>
      <div className="card">
        <div className="card-body p-0">
          <UserList
            // posts={searchResults.length > 0 ? searchResults : posts}
            posts={currentPosts}
            noMatch={noMatch}
            loading={loading}
            showUserDetailModal={showUserDetailModal}
            showEditUserModal={showUserEditModal}
            handleDelete={handleDeleteUser}
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

      <UserAddNew
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddUser={handleAddUser}
      />
      {showUserDetail && selectedUser && (
        <UserDetail
          show={showUserDetail}
          onClose={closeUserDetailModal}
          user={selectedUser} // Pass the selectedUser to UserDetail
        />
      )}
      {editingUser && (
        <UserEdit
          show={Boolean(editingUser)}
          onClose={closeEditModal}
          onEditUser={handleSaveEdit}
          user={editingUser}
        />
      )}
    </>
  );
}
