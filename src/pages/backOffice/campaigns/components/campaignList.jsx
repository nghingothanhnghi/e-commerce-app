import React, { useState, useRef, useEffect } from "react";
import { Button, ButtonGroup, Table, Spinner } from "react-bootstrap";
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconSearchOff,
  IconMoodEmpty,
} from "@tabler/icons-react";
import LoadingBox from "../../../../components/Loading/Loading";
import ConfirmBox from "../../../../components/Confirm/Confirm";

import useCalculateHeight from "../../../../hooks/useCalculateHeight";


const statusClasses = {
  Inactive: "text-muted",
  "Pending Review": "text-bg-secondary",
  Approved: "text-bg-success",
  Running: "text-bg-primary",
  Rejected: "text-bg-danger",
  pendingReview: "text-bg-secondary", // Adjust the class names as needed
  processing: "text-bg-primary",
  success: "text-bg-success",
  // Add more status classes as needed
};

export default function CampaignList({
  columns: defaultColumns = ["Campaign Name", "Campaign Type", "Status"],
  posts,
  loading,
  error,
  message,
  noMatch,
  handleDelete,
  showPostDetailModal,
  showEditPostModal,
}) {


  const tableRef = useRef(null);
  const calculatedHeight = useCalculateHeight(tableRef, "bottom");
  const [tableHeight, setTableHeight] = useState('auto');

  useEffect(() => {
    // Find the header and footer elements by their classes
    const headerElement = document.querySelector('header');
    const footerElement = document.querySelector('.card-footer');

    // Get the actual heights or use default values if elements are not found
    const headerHeight = headerElement ? headerElement.offsetHeight : 0;
    const footerHeight = footerElement ? footerElement.offsetHeight : 0;

    // Calculate the table height based on screen height, header height, and footer height
    const screenHeight = window.innerHeight;
    const calculatedTableHeight = screenHeight - headerHeight - footerHeight - calculatedHeight;
    setTableHeight(calculatedTableHeight > 0 ? `${calculatedTableHeight}px` : 'auto');
  }, [calculatedHeight]);


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const confirmDelete = (postId) => {
    setDeleteItemId(postId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItemId) {
      handleDelete(deleteItemId);
      setShowDeleteModal(false);
      setDeleteItemId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteItemId(null);
  };

  return (
    <>
      {loading ? (
        <LoadingBox show={loading} message={message} />
      ) : (
        <div
          className="table-responsive"
          ref={tableRef}
          style={{ maxHeight: tableHeight, overflowY: 'auto' }}
        >
          <Table bordered size="sm" className="mb-0 cx_table-default">
            <thead>
              <tr>
                <th scope="col" className="col-no bg-light">
                  No
                </th>
                <th scope="col">Campaign Name</th>
                <th scope="col">Campaign Type</th>
                <th scope="col" className="text-center">
                  Status
                </th>
                <th scope="col" className="col-action_table bg-light"></th>
              </tr>
            </thead>
            <tbody>
              {noMatch ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <IconSearchOff size={64} stroke={1} />
                    <p className="text-muted leading">No match found.</p>
                  </td>
                </tr>
              ) : Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr key={index}>
                    <th
                      scope="row"
                      className="align-middle text-center bg-light"
                    >
                      {index + 1}
                    </th>
                    <td className="align-middle">
                      {post.attributes.campaignName ? (
                        <span>{post.attributes.campaignName}</span>
                      ) : (
                        <span>N/A</span>
                      )}
                    </td>
                    <td className="align-middle">
                      {post.attributes.campaignType}
                    </td>
                    <td
                      className={`align-middle text-center ${
                        statusClasses[post.attributes.status] || "text-muted"
                      }`}
                    >
                      {post.attributes.status || "N/A"}
                    </td>
                    <td className="align-middle text-center bg-light">
                      <Button
                        onClick={() => confirmDelete(post.id)}
                        variant="light"
                        size="sm"
                        disabled={deleteItemId}
                      >
                        {deleteItemId === post.id ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <IconTrash size={16} stroke={1} />
                        )}
                      </Button>
                      <ButtonGroup size="sm" className="ms-2">
                        <Button
                          onClick={() => showEditPostModal(post)}
                          variant="light"
                        >
                          <IconEdit size={16} stroke={1} />
                        </Button>
                        <Button
                          onClick={() => showPostDetailModal(post)}
                          variant="light"
                        >
                          <IconEye size={16} stroke={1} />
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <IconMoodEmpty size={64} stroke={1} />
                    <p className="text-muted leading">No campaigns found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
      {error && typeof error === "object" && (
        <div className="alert alert-danger" role="alert">
          Error: {error.message}
        </div>
      )}
      {/* Delete confirmation modal */}
      <ConfirmBox
        show={showDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this campaign?"
      />
    </>
  );
}
