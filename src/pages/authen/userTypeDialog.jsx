import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const UserTypeDialog = ({ show, onHide, onSelectUserType }) => {
  const [userTypeSelected, setUserTypeSelected] = useState(false);
  const handleUserTypeSelect = (userType) => {
    onSelectUserType(userType);
    setUserTypeSelected(true);
    setTimeout(() => {
      onHide(); // Close the dialog after selecting a user type
    }, 0);
  };
    // If user type is already selected, do not render the modal
    if (!show || userTypeSelected) {
      return null;
    }
  return (
    <Modal
    show={show && !userTypeSelected}
      onHide={() => handleUserTypeSelect()}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className="border-bottom-0 px-4 fw-bold">
        Please select your user type?
      </Modal.Header>
      <Modal.Body className="px-4 pb-5"></Modal.Body>
      <Modal.Footer className="flex-nowrap p-0">
        <Button
          variant="primary"
          onClick={() => handleUserTypeSelect("advertiser")}
          className="fs-6 text-decoration-none col-6 py-4 m-0 rounded-0 border-end"
        >
          Advertiser
        </Button>{" "}
        <Button
          variant="secondary"
          onClick={() => handleUserTypeSelect("publisher")}
          className="fs-6 text-decoration-none col-6 py-4 m-0 rounded-0"
        >
          Publisher
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserTypeDialog;
