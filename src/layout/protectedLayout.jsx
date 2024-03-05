/// ProtectedLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Container from "react-bootstrap/Container";
export default function ProtectedLayout() {
  return (
    <>
      <Header />
      <Container fluid="xxl">
        <Outlet />
      </Container>
    </>
  );
}
