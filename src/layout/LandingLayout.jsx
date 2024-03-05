import { Outlet } from "react-router-dom";
import NavigationHome from "../components/NavigationHome/NavigationHome";
import FooterHome from "../components/FooterHome/FooterHome";
export default function LandingLayout() {
  return (
    <>
      <NavigationHome />
      <Outlet />
      <FooterHome />
    </>
  );
}
