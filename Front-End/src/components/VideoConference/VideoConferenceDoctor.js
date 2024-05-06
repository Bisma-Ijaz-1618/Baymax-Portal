import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaPhone } from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import Call from "./Call";
import ChatBox from "./ChatBox1";
import DraggableModal from "./test";
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
          userId={"Doctor123"}
          token={
            "007eJxTYLi0XdBWYYbNBDldyx+tsRM3+27giJ07mSdkTWHV0rOtP98rMKQZmhiaG5gbJKVYJpuYGBtaJBkkWRgaG5kYJxkYm1uYd2kZpTUEMjJM/DSDhZGBlYERCEF8FYZEy0RTM4NEA920tFRzXUPD1FTdREPjFF1jc5NUY+NUc/M0IyMA+VAmQw=="
          }
          peerId={"Patient123"}
        />
      </Col>
    </Container>
  );
}

export default VideoConference;
