import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function CampaignDetail({ show, onClose, post }) {
  // Check if post is available
  if (!post) {
    return null;
  }

  const { firstName, campaignType} = post;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-bottom-0">
      <Modal.Title>
          {post.attributes.campaignName ? (
            <span>{post.attributes.campaignName }</span>
          ) : (
            <span>N/A</span>
          )}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Do not even try to press
        escape key.
      </Modal.Body>
      <Modal.Footer className="flex-nowrap p-0">
        <Button
          variant="link"
          onClick={onClose}
          className="fs-6 text-decoration-none col-6 py-3 m-0 rounded-0 border-end"
        >
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  );
}
