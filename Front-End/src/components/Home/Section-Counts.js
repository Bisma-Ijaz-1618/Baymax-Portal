import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../img/pic4.jpg";

const Home = () => {
  const containerStyle = {
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "250px",
  };

  return (
    <Container fluid className="align-items-center" style={containerStyle}>
      <Row className="vission-row align-items-center justify-content-center">
        {/* Vision Container */}
        <Col md={2} className="mx-2 vission-col py-2 text-center">
          <h2>12+</h2>
          <h2>Doctors</h2>
        </Col>

        {/* Mission Container */}
        <Col md={2} className="mx-2 vission-col py-2 text-center">
          <h2>23+</h2>
          <h2>Patients</h2>
        </Col>

        {/* Who We Are Container */}
        <Col md={2} className="mx-2 vission-col py-2 text-center">
          <h2>999+</h2>
          <h2>Records</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
