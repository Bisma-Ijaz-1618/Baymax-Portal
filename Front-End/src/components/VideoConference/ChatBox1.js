import React, { useState, useEffect } from "react";
import AC, { AgoraChat } from "agora-chat"; // Assuming AC is imported correctly
import { Container, Row, Col, Card, Button } from "react-bootstrap";
const AgoraChatComponent = ({ userId, token, peerId, username }) => {
  const appKey = "611137238#1322245";
  const [peerMessage, setPeerMessage] = useState("");
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([{ name: "", Message: "" }]);
  const [conn, setConn] = useState(null);
  const handleLogin = () => {
    console.log("in handle login");
    if (conn) {
      console.log("logging in");
      conn.open({
        user: userId,
        agoraToken: token,
      });
    }
    console.log("opened?");
  };
  useEffect(() => {
    console.log("in load");
    handleLogin();
    return () => {
      console.log("wassup");
      handleLogout();
    };
  }, []);
  useEffect(() => {
    if (appKey && !conn) {
      const connection = new AC.connection({
        appKey: appKey,
      });

      connection.addEventHandler("connection&message", {
        onConnected: () => {
          setShow(true);
          console.log("connected");
        },
        onDisconnected: () => {
          console.log("disconnected");
        },
        onTextMessage: (message) => {
          console.log(message);

          setMessages((messages) => [
            ...messages,
            { name: "Recieved", Message: message.msg },
          ]);
        },
        onTokenWillExpire: (params) => {
          console.log("token expiry nearing");
        },
        onTokenExpired: (params) => {
          console.log("token expired");
        },
        onError: (error) => {
          console.log("on error", error);
        },
      });

      setConn(connection);
    }
  }, [appKey, conn]);

  const handleLogout = () => {
    if (conn) {
      conn.close();
      console.log("disconnected");
    }
  };

  const handleSendPeerMessage = () => {
    if (conn) {
      const option = {
        chatType: "singleChat",
        type: "txt",
        to: peerId,
        msg: peerMessage,
      };
      const msg = AC.message.create(option);
      conn
        .send(msg)
        .then(() => {
          console.log("send private text success");

          setMessages((messages) => [
            ...messages,
            { name: "Sent", Message: peerMessage },
          ]);
        })
        .catch((err) => {
          console.log("send private text fail", err);
        });
    }
  };

  return (
    <Container style={{ height: "80%" }} fluid className="m-3">
      <h3>{username}</h3>

      <div>
        {!show && (
          <Button
            type="button"
            className="w-100 white-bg green-color green-border m-auto blue-bg white-color py-1 px-2 m-0"
            onClick={handleLogin}
          >
            Chat
          </Button>
        )}
      </div>
      {show && (
        <Container
          fluid
          style={{ height: "100%" }}
          className="lightblue-bg border rounded"
        >
          <Row
            className="d-flex flex-column justify-content-end"
            style={{ height: "100%" }}
          >
            {messages.map((item, index) => (
              <>
                <div key={index} className="px-5">
                  {item.name === "" ? (
                    <div key={index} className="px-5">
                      <div className=" white-bg message-container-agora my-2 text-center white-bg black-color">
                        {item.Message}
                      </div>
                    </div>
                  ) : item.name === "Sent" ? (
                    <div key={index} className="pe-5">
                      <div className="white-bg p-1 me-5  my-2 border rounded d-flex flex-column justify-content-center align-items-start">
                        <div className="text-muted">{item.name + " "} </div>
                        <div>{" " + item.Message}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="ps-5">
                      <div className="white-bg p-1 ms-5 my-2 border rounded d-flex flex-column justify-content-center align-items-end">
                        <div className="text-muted">{item.name + " "} </div>
                        <div>{" " + item.Message}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-4"></div>
              </>
            ))}
            <div>
              <div className="my-2 d-flex flex-row jutify-content-around">
                <input
                  type="text"
                  placeholder="Peer message"
                  value={peerMessage}
                  className="flex-fill border rounded"
                  onChange={(e) => setPeerMessage(e.target.value)}
                />
                <Button
                  type="button"
                  className="green-bg ms-4"
                  onClick={handleSendPeerMessage}
                >
                  send
                </Button>
              </div>
            </div>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default AgoraChatComponent;
