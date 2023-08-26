import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../images/logo.jpeg";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DepositModal from "./Deposit";

import {
    AiOutlineDollarCircle,
  AiOutlineHome,
  AiOutlineShop,
  AiOutlineShoppingCart,
  AiOutlineTeam
} from "react-icons/ai";

import { CgBulb, CgCardSpades,} from "react-icons/cg";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  let pf_value = 100;
  let f_value = 89;

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/working" onClick={() => updateExpanded(false)}>
                <CgBulb style={{ marginBottom: "2px" }} /> How it Works
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <DepositModal />
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                as={Link} to="/portfolio" onClick={() => updateExpanded(false)}
                className="fork-btn-inner"
              >
                <AiOutlineDollarCircle style={{ fontSize: "1.2em" }} />{" "}
                {"Portfolio: $"+pf_value}
              </Button>
            </Nav.Item>
            <Nav.Item className="fork-btn">
              <Button
                as={Link} to="/" onClick={() => updateExpanded(false)}
                className="fork-btn-inner"
              >
                <AiOutlineDollarCircle style={{ fontSize: "1.2em" }} />{" "}
                {"Fund: $"+f_value}
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
