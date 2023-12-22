import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import logo from "../img/Logo.png";

import { Link } from "react-router-dom";
function Navigation_Bar() {
  return (
    <>
      <Navbar
        justify="true"
        expand="lg"
        variant="light"
        bg="light"
        className="bg-white"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <h3 className="logo-letters">BAYMAX PORTAL</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              justify
              className="me-auto my-2 my-lg-0 justify-content-end"
              bg="light"
              variant="light"
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <NavDropdown title="Doctors" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Dashboard</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Apointments</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Sales</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Admins" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/auth/admin">
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Profile</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Patients" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Dashbboard</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Appointments
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5"></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#action2">About</Nav.Link>
              <Nav.Link href="#action2">Contact</Nav.Link>
              <Nav.Link href="#action2">Services</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Link to="/auth/login">
                <Button variant="outline-primary" className="nav_button">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-primary" className="nav_button">
                  SignUp
                </Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation_Bar;
