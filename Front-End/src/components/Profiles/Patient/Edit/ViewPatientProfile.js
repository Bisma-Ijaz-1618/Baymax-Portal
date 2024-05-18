import Main from "./Main";
import Medicine from "./Medicine";
import Education from "./Education";
import { Image, Container, Row, Col } from "react-bootstrap";
import RecordBars from "./RecordBars";
function MyComponent() {
  return (
    <Container>
      <Main />
      <RecordBars />
      <Row className="d-flex align-items-stretch justify-content-stretch">
        <Col md={8} className="me-3">
          <Education />
        </Col>
        <Col>
          <Medicine />
        </Col>
      </Row>
    </Container>
  );
}

export default MyComponent;
