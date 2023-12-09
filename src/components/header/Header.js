import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import whiteLogo from "../../assets/logo/logo_white.png";
import "./Header.css";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";

function NavigationBar() {
  const { logout } = useLogout();

  const { user } = useAuthContext();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
  };

  return (
    <Navbar bg="main" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">
          <img alt="Memo Logo" src={whiteLogo} width={60} height={60} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navigationbar-nav" />
        <Navbar.Collapse id="navigationbar-nav">
          <Nav className="me-auto navigationbar-options">
            <Nav.Link href="/home">Inicio</Nav.Link>
            <Nav.Link href="/plans">Planes</Nav.Link>
            <Nav.Link href="/specialties">Clases</Nav.Link>
            {userData && <Nav.Link href="/my-progress">Mis Clases</Nav.Link>}
            <Nav.Link href="/find-cards">Buscar Flashcards</Nav.Link>
          </Nav>
          {!userData ? (
            <Nav className="navigationbar-options">
              <Nav.Link href="/login">Inicia Sesión</Nav.Link>
              <Nav.Link href="/register">Regístrate</Nav.Link>
            </Nav>
          ) : (
            <Nav className="navigationbar-options">
              <NavDropdown title={userData[1]} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">Mi Perfil</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
