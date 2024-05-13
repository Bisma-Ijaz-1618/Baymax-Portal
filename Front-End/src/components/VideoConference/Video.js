import React, { Row, Col } from "react-bootstrap";
import { useEffect, useRef } from "react";

const Participant = ({ user }) => {
  // Destructure 'user' from props
  const ref = useRef();

  useEffect(() => {
    console.log("is there a track", user.videoTrack);

    if (user.videoTrack) {
      // Check if 'videoTrack' exists
      user.videoTrack.play(ref.current);
    }

    return () => {
      if (user.videoTrack) {
        // Cleanup: stop playing the video track
        user.videoTrack.stop();
      }
    };
  }, [user]); // Add 'user' to the dependencies array

  return (
    <div
      ref={ref}
      className="col-md-6 video-holder align-items-center justify-content-center m-2"
      xs={12}
      md={6}
      lg={3}
    ></div>
  );
};

export default Participant;
