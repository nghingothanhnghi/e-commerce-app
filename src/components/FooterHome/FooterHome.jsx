import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
const FooterHome = ({content}) => {
  return (
    <>
      <footer className="footer mt-auto py-3 bg-body-tertiary border-top">
        <Container>
        <span className="text-body-secondary">Copyright © 2024 FiMi.com</span>
        </Container>
      </footer>
    </>
  );
};

export default FooterHome;
