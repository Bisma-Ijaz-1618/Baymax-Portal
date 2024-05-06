import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaChartLine,
  FaMicrophone,
  FaVideo,
  FaPhoneSlash,
  FaFacebookMessenger,
} from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import Video from "./Video";
import LineGraph from "./LineGraph";
import DraggableOffcanvas from "./test";

function VideoConference() {
  const [users, setUsers] = useState([]);
  const [joinedChannel, setJoinedChannel] = useState(false); // Add state to track channel join status
  const [localTracks, setLocalTracks] = useState([]); // Add state to track channel join status
  const APP_ID_AGORA = "853b605cc63b4efb8e8006806c213168";
  const TOKEN_ID =
    "007eJxTYHh9ofGF7rNbb6bbiErUTI/WnxfMyf4irj/JJTnc4+6XCHUFBgtT4yQzA9PkZDPjJJPUtCSLVAsDAzMLA7NkI0NjQzOLLi6jtIZARgY95emsjAwQCOIzMSQbMjAAANumHDA=";
  const CHANNEL_ID = "c1";
  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });
  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }
    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) => {
      previousUsers.filter((u) => u.uid !== user.uid);
    });
  };
  useEffect(() => {
    if (!joinedChannel) {
      client.on("user-published", handleUserJoined);
      client.on("user-left", handleUserLeft);
      client
        .join(APP_ID_AGORA, CHANNEL_ID, TOKEN_ID, null)
        .then((uid) => {
          // Create tracks and return them along with UID
          return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
        })
        .then(([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          setLocalTracks(tracks);
          // Add UID and tracks to the state
          setUsers((previousUsers) => [
            ...previousUsers,
            { uid, audioTrack, videoTrack },
          ]);
          // Publish tracks
          client.publish(tracks);
        })
        .then(() => {
          setJoinedChannel(true); // Set the flag to true after successfully joining the channel
        })
        .catch((error) => {
          console.error("Error joining channel:", error);
        });

      return () => {
        client.off("user-left", handleUserLeft);
      };
    }
  }, [client, joinedChannel]);
  return (
    <>
      <Container
        fluid
        className="h-100  m-0 all-videos-container grey-bg d-flex flex-column justify-content-end"
      >
        <Row className="flex-fill">
          <div className="video-container m-auto p-2 d-flex p-auto align-content-center justify-content-center">
            {users.map((user) => (
              <Video key={user.uid} user={user} />
            ))}
          </div>
        </Row>
        <Row className=" align-items-center justify-content-center">
          <Col className="p-0 pb-4 d-flex flex-row align-items-center justify-content-center">
            <Button variant="outline-primary" className="mx-1">
              <FaMicrophone /> {/* Microphone icon */}
            </Button>
            <Button variant="outline-primary" className="mx-1">
              <FaVideo /> {/* Camera icon */}
            </Button>
            <DraggableOffcanvas />{" "}
            <Button variant="outline-primary" className="mx-1">
              <FaFacebookMessenger /> {/* Camera icon */}
            </Button>
            <Button variant="outline-danger" className="mx-1">
              <FaPhoneSlash /> {/* End call icon */}
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Buttons */}
    </>
  );
}

export default VideoConference;
