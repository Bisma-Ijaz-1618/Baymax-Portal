import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import Call from "./Call";
import ChatBox from "./ChatBox1";
import DraggableModal from "./test";
import { Doctor123 } from "../../Config/Agora";
import agoraChat from "agora-chat";
function VideoConference() {
  return (
    <Container
      fluid
      className=" border rounded my-5 main-h-100 grey-bg d-flex flex-row align-items-stretch justify-content-center"
    >
      <Col className="col-md-8 d-flex flex-row align-items-stretch justify-content-center">
        <Call />
      </Col>
      <Col className="lightblue-bg ms-2 my-3 border rounded d-flex align-items-center justify-content-center">
        <ChatBox userId={"Doctor123"} token={Doctor123} peerId={"Patient123"} />
      </Col>
    </Container>
  );
}

export default VideoConference;
