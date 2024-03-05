import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavSideBar from "./NavSidebar";
import {
  Container,
  Navbar,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Offcanvas,
} from "react-bootstrap";
import NotificationHeader from "./NotificationHeader";
import NotificationBodyHeader from "./NotificationBodyHeader";
import {
  IconNotification,
  IconUserCircle,
  IconLogout,
} from "@tabler/icons-react";

import { useAuthContext } from "../../contexts/AuthContext";
import { removeToken } from "../../helpers/helpers";
import { USER_TYPES } from "../../constants/userTypes";

import { Link } from "react-router-dom";

const NavHeader = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    setUser(undefined);
    // Assuming you have the userType in your user object
    if (user?.userType) {
      switch (user.userType) {
        case USER_TYPES.ADVERTISER:
          navigate("/signin/advertiser", { replace: true });
          break;
        case USER_TYPES.PUBLISHER:
          navigate("/signin/publisher", { replace: true });
          break;
        // Add more cases for other user types if needed
        default:
          navigate("/signin/admin", { replace: true });
      }
    } else {
      // Default redirect if userType is not available
      navigate("/signin/admin", { replace: true });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLinkClick = () => {
    // Close the Offcanvas when a link is clicked
    handleClose();
  };

  return (
    <div className="d-none d-sm-flex align-items-center">
      <Button
        onClick={handleShow}
        variant="light"
        className="me-3 rounded-circle p-1 text-muted"
      >
        <IconNotification size={24} />
      </Button>
      {user ? (
        <>
          <Dropdown as={ButtonGroup} drop="down-centered">
            <Button variant="light">
              Signed in as: <b>{user.firstName}</b>
            </Button>
            <Dropdown.Toggle split variant="light" />
            <Dropdown.Menu className="w-100">
              <Link to="/profile" className="dropdown-item d-flex align-items-center">
                <IconUserCircle size={24} className="me-2" />
                Profile
              </Link>

              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="d-flex align-items-center">
                <IconLogout size={24} className="me-2" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      ) : (
        <></>
      )}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <NotificationHeader />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NotificationBodyHeader />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default NavHeader;
