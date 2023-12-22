import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import logo from "../../img/Logo.png";

const Section1 = () => {
  return (
    <Container
      fluid
      className="py-5 align-items-center justify-content-center section1-container"
    >
      <Row className="section1-row align-items-center justify-content-center">
        <Col className="col-md-3 text-end">
          <Image
            fluid
            src={logo}
            className="section1-img float-end"
            alt="Logo"
          />
        </Col>
        <Col className="col-md-4 text-left ">
          <Row className="section1-text">
            <h3>BEST REMOTE PATIENT MONITORING SYSTEM IN PAKISTAN</h3>
            <h5 className="float-start">
              Baymax is a remote medical monitoring system offering a holistic
              solution to the evolving needs of virtual healthcare. Begin your
              journey with an end-to-end platform, integrated effortlessly with
              the Baymax Kit.
            </h5>
          </Row>
          <Row className="section1-text">
            <Button className="section1-button">Learn More</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Section1;
