import { Button, Container, Row, Col } from "react-bootstrap";
import UserList from "./UserList";
import VideoConference from "./VideoConferenceDoctor";
import ChatBox from "./ChatBox1";
import Messages from "../Messages/Messages";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [showContainer, setShowContainer] = useState(false);

  return (
    <>
      <Container fluid>
        <VideoConference />
      </Container>
    </>
  );
}

export default App;
