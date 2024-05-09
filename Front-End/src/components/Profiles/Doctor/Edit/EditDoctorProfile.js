import Main from "./Main";
import Specialization from "./Specialization";
import Education from "./Education";
import { Image, Container, Row, Col } from "react-bootstrap";
function MyComponent() {
  return (
    <Container>
      <Main />
      <Education />
      <Specialization />
    </Container>
  );
}

export default MyComponent;
