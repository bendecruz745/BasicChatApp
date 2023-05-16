import React from "react";
import { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const loginState = useSelector((state) => state.loginReducer);
  console.log("rendering navbar");
  console.log(`navbar reading login state as ${JSON.stringify(loginState)}`);

  return (
    <Navbar expanded={expanded} bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Link
          to={loginState.isLoggedIn ? "/ChatApp" : "/"}
          className="nav-link"
          onClick={() => setExpanded(false)}
        >
          <Navbar.Brand>
            Ben's Basic Chat App {loginState.isLoggedIn}
          </Navbar.Brand>
        </Link>
        <Nav navbarScroll>
          {loginState.username ? (
            <Link
              to="/Profile"
              className="nav-link "
              onClick={() => setExpanded(false)}
            >
              {loginState.username}
            </Link>
          ) : (
            <Link
              to="/Login"
              className="nav-link "
              onClick={() => setExpanded(false)}
            >
              Login
            </Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
