import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import Call from "./Call";
import ChatBox from "./ChatBox1";
import { Patient123 } from "../../Config/Agora";

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
        <ChatBox
          userId={"Patient123"}
          token={Patient123}
          peerId={"Doctor123"}
        />
      </Col>
    </Container>
  );
}

export default VideoConference;
