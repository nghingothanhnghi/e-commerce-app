import NavSideBar from "./NavSidebar";
import NavHeader from "./NavHeader";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavigationDesktop from "../NavigationDesktop/NavigationDesktop";



const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary border-bottom">
        <Container fluid>
          <NavSideBar/>
          <NavigationDesktop/>
          <NavHeader/>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
