import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import DataCard from "../../components/DataCard";

function Data_Grid() {
  return (
    <Container className="">
      <Row>
        <Col xs={12} md={9} lg={10} className="grid-container">
          <Row xs={2} md={4} lg={4} className="g-4 justify-content-center">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Col key={idx} className="d-flex justify-content-center">
                <DataCard />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Data_Grid;
