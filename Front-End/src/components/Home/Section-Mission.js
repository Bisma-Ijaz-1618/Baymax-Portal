import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../img/pic1.jpg";

const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
  };

  return (
    <Container fluid className="align-items-center" style={containerStyle}>
      <Row className="vission-row align-items-center justify-content-center">
        {/* Vision Container */}
        <Col md={3} className=" mx-4 vission-col py-5 text-center">
          <h2>Our Vision</h2>
          <p>
            Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...
          </p>{" "}
        </Col>

        {/* Mission Container */}
        <Col md={3} className="mx-4 vission-col  py-5 text-center">
          <h2>Our Mission</h2>
          <p>
            Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...
          </p>
        </Col>

        {/* Who We Are Container */}
        <Col md={3} className="mx-4 vission-col py-5 text-center">
          <h2>Who We Are</h2>
          <p>
            Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...Your mission content goes
            here...Your mission content goes here...
          </p>{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
