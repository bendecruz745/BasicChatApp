import React from "react";
import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import store from "../store";
import { useSelector } from "react-redux";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const username = useSelector((state) => state.loginReducer.username);
  const loggedIn = useSelector((state) => state.loginReducer.isLoggedIn);

  return (
    <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Link
          to="BasicChatApp"
          className="nav-link"
          onClick={() => setExpanded(false)}
        >
          <Navbar.Brand>Ben's Basic Chat App</Navbar.Brand>
        </Link>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav navbarScroll>
            {loggedIn ? (
              <Link
                to="BasicChatApp/Profile"
                className="nav-link"
                onClick={() => setExpanded(false)}
              >
                {username}
              </Link>
            ) : (
              <Link
                to="BasicChatApp/Login"
                className="nav-link "
                onClick={() => setExpanded(false)}
              >
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
