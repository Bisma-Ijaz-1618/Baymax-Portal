import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const FooterBottom = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Container fluid className="footer-bottom">
      <Row ms={8} className="justify-content-sm-center header-holder">
        <Col xs={12} sm={"auto"}>
          <p>
            <FontAwesomeIcon icon={faEnvelope} /> example@example.com
          </p>
        </Col>
        <Col xs={12} sm={"auto"}>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +1234567890
          </p>
        </Col>
        <Col xs={12} sm={"auto"}>
          <p>
            <FontAwesomeIcon icon={faQuestionCircle} /> FAQ
          </p>
        </Col>
        <Col></Col>
        <Col
          xs={12}
          sm={"auto"}
          className="justify-content-xs-center justify-content-sm-center justify-content-md-end"
        >
          <Row className="justify-content-md-end justify-content-sm-center">
            <Col xs={"auto"} sm={"auto"} className="icon-button">
              <a className="footer-link" href="https://www.instagram.com/">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </Col>
            <Col xs={"auto"} sm={"auto"} className="icon-button">
              <a className="footer-link" href="https://www.facebook.com/">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </Col>
            <Col xs={"auto"} sm={"auto"} className="icon-button">
              <a className="footer-link" href="https://twitter.com/">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="footer-bottom copy-right py-3">
        <Col className="text-center">
          <h7>&copy; {currentYear} BAYMAX PORTAL. All rights reserved.</h7>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterBottom;
