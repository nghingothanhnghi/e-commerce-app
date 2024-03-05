import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { IconMenu, IconLock } from "@tabler/icons-react";
import useScrollToSections from "../../hooks/useScrollToSections";
import LanguageSwitch from "../LanguageSwitch/LanguageSwitch";
import { useTranslation } from 'react-i18next';
import CartCounter from "../CartCount/CartCount";
import AuthButton from "../AuthButton/AuthButton";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import ProfileInfoBox from "../ProfileInfoBox/ProfileInfoBox";
import WishlistCount from "../WishlistCount/WishlistCount";
import Logo from "../../assets/chuotxanh_ico.png"

const NavigationHome = () => {
  const { t, i18n } = useTranslation();
  const { scrollToSection } = useScrollToSections();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLinkClick = (section) => {
    scrollToSection(section);
    // Close the Offcanvas when a link is clicked
    handleClose();
  };

  useEffect(() => {
    // Set the language to 'vn' immediately after the component mounts
    i18n.changeLanguage('vn');
  }, [i18n]);

  // Directly define the translated sections here
  const sections = ["campaigns"].map(section => t(section));

  return (
    <>
      <Navbar className="bg-body-tertiary border-bottom">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-dark">
            <img
              alt=""
              src={Logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            <span className="brand-text fw-bold">Chuot Xanh Media</span>
            </Link>
          </Navbar.Brand>
          <Nav className="d-lg-flex d-none justify-content-end">
            {sections.map((section, index) => (
              <button
                key={index}
                className="nav-link fw-semibold"
                onClick={() => handleLinkClick(section)}
              >
                {section}
              </button>
            ))}
            <NavLink className="nav-link fw-semibold">{t('question')}</NavLink>
          </Nav>
          <Nav className="d-none d-lg-flex gap-2 align-items-center justify-content-end">
            <LanguageSwitch />
            <div className="vr d-none d-lg-flex h-100 mx-lg-2 align-self-center"></div>
            <ThemeSwitch />
            <WishlistCount />
            <CartCounter />
            <div className="vr d-none d-lg-flex h-100 mx-lg-2 align-self-center"></div>
            <AuthButton />
          </Nav>
          <Button
            variant="light"
            onClick={handleShow}
            className="d-flex d-lg-none"
          >
            <IconMenu />
          </Button>
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton className="border-bottom">
              <ProfileInfoBox />
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <h6 className="fs-6 text-muted">What are you looking for?</h6>
                {sections.map((section, index) => (
                  <NavLink
                    key={index}
                    className="nav-link fw-semibold"
                    onClick={() => handleLinkClick(section)}
                  >
                    {section}
                  </NavLink>
                ))}
                <NavLink className="nav-link fw-semibold">{t('question')}</NavLink>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationHome;
