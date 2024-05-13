import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaChartLine,
  FaMicrophone,
  FaVideo,
  FaPhoneSlash,
  FaFacebookMessenger,
  FaMicrophoneSlash,
  FaVideoSlash,
} from "react-icons/fa";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useState } from "react";
import Video from "./Video";
import LineGraph from "./LineGraph";
import DraggableOffcanvas from "./test";
import { VideoToken } from "../../Config/Agora";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuthHook";
function VideoConference() {
  const { auth } = useAuth();
  const [localUser, setLocalUser] = useState(auth?.userId ? auth.userId : null);
  const [users, setUsers] = useState([]);
  const [joinedChannel, setJoinedChannel] = useState(false); // Add state to track channel join status
  const [joinCall, setJoinCall] = useState(true); // Add state to track channel join status
  const [localTracks, setLocalTracks] = useState([]); // Add state to track channel join status
  const [microphoneEnabled, setMicrophoneEnabled] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const APP_ID_AGORA = "853b605cc63b4efb8e8006806c213168";
  const TOKEN_ID = VideoToken;
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
      user?.audioTrack?.play();
    }
  };

  const handleUserLeft = (user) => {
    setUsers((previousUsers) => {
      previousUsers.filter((u) => u.uid !== user.uid);
    });
  };
  useEffect(() => {
    if (!joinedChannel && joinCall) {
      client.on("user-published", handleUserJoined);
      client.on("user-left", handleUserLeft);
      client
        .join(APP_ID_AGORA, CHANNEL_ID, TOKEN_ID, localUser)
        .then((uid) => {
          console.log("Successfully joined channel with UID:", uid);

          // Create tracks and return them along with UID
          return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
        })
        .then(([tracks, uid]) => {
          const [audioTrack, videoTrack] = tracks;
          setLocalTracks(tracks);
          audioTrack.setEnabled(false);
          videoTrack.setEnabled(false);
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
  }, [client, joinedChannel, joinCall]);
  const endCall = async () => {
    // Clean-up resources and leave the channel
    if (client) {
      for (let i = 0; localTracks.length > i; i++) {
        localTracks[i].stop(); // Disable microphone track
        localTracks[i].close(); // Disable microphone track
      }
      await client.leave();
      setJoinCall(false);
      setJoinedChannel(false);
      setLocalTracks([]);
      console.log("ended call");
    }
  };
  useEffect(() => {
    return () => {
      endCall();
    };
  }, []);

  const toggleMicrophone = () => {
    if (localTracks[0]) {
      // Assuming microphone track is the first one in the localTracks array
      if (microphoneEnabled) {
        localTracks[0].setEnabled(false); // Disable microphone track
        setMicrophoneEnabled(false); // Update state
      } else {
        localTracks[0].setEnabled(true); // Enable microphone track
        setMicrophoneEnabled(true); // Update state
      }
    }
  };
  const toggleVideo = () => {
    if (localTracks[1]) {
      // Assuming microphone track is the first one in the localTracks array
      if (videoEnabled) {
        localTracks[1].setEnabled(false); // Disable microphone track
        setVideoEnabled(false); // Update state
      } else {
        localTracks[1].setEnabled(true); // Enable microphone track
        setVideoEnabled(true); // Update state
      }
    }
  };
  if (!joinCall) {
    return (
      <Container
        className="d-flex flex-row justify-content-center fire-color align-items-center text-center"
        align="middle"
      >
        <h3>You Left the Meeting</h3>
        <Button
          className="mx-2 py-1 px-3 white-bg water-color"
          onClick={() => setJoinCall(true)}
        >
          Join
        </Button>
      </Container>
    );
  }
  return (
    <>
      <Container
        fluid
        className="h-100  m-0 all-videos-container grey-bg d-flex flex-column justify-content-end"
      >
        <Row className="">
          <div className="video-container m-auto p-2 d-flex p-auto align-content-center justify-content-center">
            {users.map((user) => (
              <Video key={user.uid} user={user} />
            ))}
          </div>
        </Row>
        <Row className=" align-items-center justify-content-center">
          <Col className="p-0 pb-4 d-flex flex-row align-items-center justify-content-center">
            <Button
              onClick={() => toggleMicrophone()}
              variant="outline-primary"
              className="mx-1"
            >
              {microphoneEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />}
            </Button>
            <Button
              onClick={() => toggleVideo()}
              variant="outline-primary"
              className="mx-1"
            >
              {videoEnabled ? <FaVideo /> : <FaVideoSlash />}
            </Button>
            <DraggableOffcanvas />{" "}
            <Button
              onClick={() => endCall()}
              variant="outline-danger"
              className="mx-1"
            >
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
