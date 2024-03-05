import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import useScreenSize from "../../hooks/useScreenSize";
const LoadingBox = ({ show, onClose, message }) => {
  const { isDesktopView } = useScreenSize();
  return (
    <Modal show={show} onHide={onClose} backdrop="static" keyboard={false} centered dialogClassName={isDesktopView ? "modal-331w" : "modal-180w xs-loading"}>
      <Modal.Body className="text-center py-4">
        <Spinner className="mt-0 mt-md-3" animation="grow" /> <p className="text-muted my-0 mt-md-2"><small>{message}</small></p>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingBox;
