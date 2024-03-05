import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import {
  IconCherryFilled,
} from "@tabler/icons-react";

import { useAuthContext } from "../../contexts/AuthContext";

const NavigationDesktop = () => {
  const { user, userType } = useAuthContext();
  console.log(userType, "Type user in Navigation");
  // Define menu items based on user type
  const adminMenu = (
    <>
      <NavLink
        to="/dashboard"
        className="nav-link link-dark"
        activeclassname="active"
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/campaigns"
        className="nav-link link-dark"
        activeclassname="active"
      >
        Campaigns
      </NavLink>
      <NavLink
        to="/users"
        className="nav-link link-dark"
        activeclassname="active"
      >
        Users
      </NavLink>
    </>
  );

  const advertiserMenu = (
    <>
      <NavLink
        to="/campaigns"
        className="nav-link link-dark"
        activeclassname="active"
      >
        Campaigns
      </NavLink>
    </>
  );

  const publisherMenu = (
    <>
      <NavLink
        to="/campaigns"
        className="nav-link link-dark"
        activeclassname="active"
      >
        Campaigns
      </NavLink>
    </>
  );

  return (
    <Navbar className="nav d-none d-lg-flex">
      <Navbar.Brand className='text-primary'>
        <IconCherryFilled size={32} className="d-inline-block align-top text-primary"/>
        FiMi App
      </Navbar.Brand>
      <nav className="nav d-none d-lg-flex">
        {user?.userType === "admin" && adminMenu}
        {user?.userType === "advertiser" && advertiserMenu}
        {user?.userType === "publisher" && publisherMenu}
      </nav>
    </Navbar>
  );
};

export default NavigationDesktop;
