import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  IconMenu,
  IconLayoutDashboard,
  IconSpeakerphone,
  IconUsers,
  IconCherryFilled,
} from "@tabler/icons-react";

const NavSideBar = () => {
  const { user } = useAuthContext();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLinkClick = () => {
    // Close the Offcanvas when a link is clicked
    handleClose();
  };

  return (
    <aside className="d-flex d-lg-none">
      <Button variant="light" onClick={handleShow}>
        <IconMenu />
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Navbar.Brand href="#home">
            <IconCherryFilled
              size={32}
              className="d-inline-block align-top text-primary"
            />
          </Navbar.Brand>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link link-body-emphasis"
                onClick={handleLinkClick}
              >
                <IconLayoutDashboard className="me-2" />
                Dashboard
              </Link>
            </li>
            {user?.userType === "advertiser" || user?.userType === "admin" && (
              <li className="nav-item">
                <Link
                  to="/campaigns"
                  className="nav-link link-body-emphasis"
                  onClick={handleLinkClick}
                >
                  <IconSpeakerphone className="me-2" />
                  Campaigns
                </Link>
              </li>
            )}
            {user?.userType === "admin" && (
              <li className="nav-item">
                <Link
                  to="/users"
                  className="nav-link link-body-emphasis me-2"
                  onClick={handleLinkClick}
                >
                  <IconUsers className="me-2" />
                  Users
                </Link>
              </li>
            )}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </aside>
  );
};

export default NavSideBar;
