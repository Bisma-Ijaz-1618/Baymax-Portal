import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import Call from "./Call";
import ChatBox from "./ChatBox1";
function VideoConference() {
  return (
    <Container
      fluid
      className=" border rounded my-5 main-h-100 grey-bg d-flex flex-row align-items-stretch justify-content-center"
    >
      <Col className=" d-flex flex-row align-items-stretch justify-content-center">
        <Call />
      </Col>
      <Col className="lightblue-bg m-2 border rounded d-flex align-items-start justify-content-center">
        <ChatBox
          userId={"Patient123"}
          token={
            "007eJxTYEhMfFbL3XbR2eDx2/K/j5LtKqYvsxVjWhx3T7Nf+75S71UFhjRDE0NzA3ODpBTLZBMTY0OLJIMkC0NjIxPjJANjcwvzSi2jtIZARob2ue0MjAysQMzIAOKrMCQZp1mkmZkb6KalpZrrGhqmpuomWaSZ65oaJlkmGZoZGANNAQA8SCYj"
          }
          peerId={"Doctor123"}
        />
      </Col>
    </Container>
  );
}

export default VideoConference;
