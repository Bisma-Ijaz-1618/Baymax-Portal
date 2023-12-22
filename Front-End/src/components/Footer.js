import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container fluid className="footer footer-container">
      <Row className="justify-content-center align-items-center py-4">
        <Col md="3">
          <ul className="footer-list">
            <li>
              <a className="footer-link" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="footer-link" href="/about">
                About Us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/services">
                Services
              </a>
            </li>

            <li>
              <a className="footer-link" href="/about">
                About Us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/services">
                Services
              </a>
            </li>
            {/* Add more links to other important pages */}
          </ul>
        </Col>
        <Col md="3">
          <ul className="footer-list">
            <li>
              <a className="footer-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="footer-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/faq">
                FAQ
              </a>
            </li>
            {/* Add more links to other important pages */}
          </ul>
        </Col>
        <Col md="3">
          <ul className="footer-list">
            <li>
              <a className="footer-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/faq">
                FAQ
              </a>
            </li>
            <li>
              <a className="footer-link" href="/contact">
                Contact Us
              </a>
            </li>
            <li>
              <a className="footer-link" href="/faq">
                FAQ
              </a>
            </li>
            {/* Add more links to other important pages */}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
