import React from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/api/apiSlice";

const Navbars = () => {
  const { user } = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();

  function handleLogout () {
    logoutUser().then(({error}) => {
      if (!error) {
        console.log("berhasil logout");
      }
    })
  }
  
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.reload();
  // }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Bhinneka Academy</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="btn btn-danger text-white">Login</Nav.Link>
            </LinkContainer>

            {user && (
              <NavDropdown
                title={user.email}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/new-article">
                  <NavDropdown.Item>Artikel Baru</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/articles/me">
                  <NavDropdown.Item>Artikel Saya</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Button onClick={handleLogout} variant="outline-danger">Keluar</Button>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
