import Main from "./Main";
import Medicine from "./Medicine";
import Education from "./Education";
import { Image, Container, Row, Col } from "react-bootstrap";
function MyComponent() {
  return (
    <Container>
      <Main />
      <Education />
      <Medicine />
    </Container>
  );
}

export default MyComponent;
