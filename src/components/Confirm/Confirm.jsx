import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { IconTrashX } from "@tabler/icons-react";
const ConfirmBox = ({ show, onClose, message, onConfirm }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName="modal-331w"
    >
      <Modal.Body className="text-center px-5">
        <IconTrashX size={46} className="mt-4 mb-3 text-danger" />
        <p className="fw-bold mt-2 mb-5">{message}</p>
      </Modal.Body>
      <Modal.Footer className="flex-nowrap p-0">
        <Button
          variant="light"
          onClick={onConfirm}
          className="fs-6 text-decoration-none col-6 py-2 m-0 rounded-0 rounded-start border-end"
        >
          Delete
        </Button>
        <Button
          variant="light"
          onClick={onClose}
          className="fs-6 text-decoration-none col-6 py-2 m-0 rounded-0 rounded-end"
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmBox;
