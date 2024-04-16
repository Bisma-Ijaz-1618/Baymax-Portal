import React from "react";
import { Container, Row } from "react-bootstrap";

function Basic() {
  return (
    <Container>
      <Row>
        {/* Your content goes here */}
        <div className="col">Column 1</div>
        <div className="col">Column 2</div>
        <div className="col">Column 3</div>
      </Row>
    </Container>
  );
}

export default Basic;
