import Main from "../Doctor/Main";
import Specialization from "../Doctor/Specialization";
import Education from "../Doctor/Education";
import { Image, Container, Row, Col } from "react-bootstrap";
function MyComponent() {
  return (
    <Container>
      <Main />
      <Specialization />
      <Education />
    </Container>
  );
}

export default MyComponent;
