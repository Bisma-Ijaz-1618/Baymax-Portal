import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container className="footer-container">
      <Row className="footer-links">
        <Col>
          <ul className="footer-list">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            {/* Add more links to other important pages */}
          </ul>
        </Col>
        <Col>
          <ul className="footer-list">
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
            {/* Add more links to other important pages */}
          </ul>
        </Col>
      </Row>
      <Row className="footer-bottom">
        <Col className="text-center">
          <p>&copy; {currentYear} WhiteFox Apparel. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
