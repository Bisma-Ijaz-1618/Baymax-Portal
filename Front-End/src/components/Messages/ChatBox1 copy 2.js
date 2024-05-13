import React, { useState, useEffect } from "react";
import AC, { AgoraChat } from "agora-chat"; // Assuming AC is imported correctly
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuthHook";
import { axiosPrivate } from "../../api/axios";
import { useParams } from "react-router-dom";
const AgoraChatComponent = ({ userId, token, peerId }) => {
  const { receiverId } = useParams();
  const { username } = useParams();
  console.log(
    "inchatbox1 we have",
    userId,
    token,
    peerId,
    username,
    receiverId
  );
  const { auth } = useAuth();
  const [sender, setSender] = useState(null);

  const appKey = "611137238#1322245";
  const [peerMessage, setPeerMessage] = useState("");
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([{ msgType: "", msgText: "" }]);
  const [messagesPrev, setMessagesPrev] = useState([
    { msgType: "", msgText: "" },
  ]);
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
  const getchat = useQuery({
    queryKey: ["chat", sender, receiverId],
    queryFn: async () => {
      console.log("reciever", receiverId);
      try {
        const response = await axiosPrivate.get(`Chat/${receiverId}`);
        console.log("chat daata", response.data);
        return response.data || [];
      } catch (err) {
        console.log("err fetching chat", err);
        return [];
      }
    },
    onSuccess: (data) => {
      setMessagesPrev(data);
      console.log("prec", messagesPrev);
    },
  });

  useEffect(() => {
    console.log("in load", receiverId, "receiverId", receiverId);
    while (true) {
      if (auth?.userId === null) {
        console.log("didnt get id", auth.userId);
      } else {
        console.log("got id", auth.userId);
        setSender(auth.userId);
        break;
      }
    }
    return () => {
      console.log("wassup", messages);
      const filteredData = messages.filter((message) => {
        return (
          (message.msgType === "sent" || message.msgType === "received") &&
          message.msgText !== ""
        );
      });
      console.log("filtered", filteredData, messages);
      if (filteredData.length > 0) {
        saveMessages.mutate(filteredData);
      }
      handleLogout();
    };
  }, [receiverId]);
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
            { msgType: "received", msgText: message.msg },
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

  const saveMessages = useMutation({
    mutationFn: async (messages) => {
      try {
        const response = await axiosPrivate.put(`Chat/${receiverId}`, {
          messages,
        });
        console.log("messages sent", messages);
      } catch (err) {
        console.log("error in updating messages", err);
      }
    },
  });
  const handleLogout = async () => {
    if (conn) {
      conn.close();
      console.log("disconnected");
    }
    setSender(null);
    setShow(false);
    setMessages([{ msgType: "", msgText: "" }]);
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
            { msgType: "sent", msgText: peerMessage },
          ]);
        })
        .catch((err) => {
          console.log("send private text fail", err);
        });
    }
  };

  return (
    <>
      <h3>{username}</h3>

      {!show && (
        <div className="d-flex align-items-center justify-content-center">
          <Button
            type="button"
            className="w-100 white-bg water-color m-auto py-1 px-2 m-0"
            onClick={handleLogin}
          >
            Start Messaging
          </Button>
        </div>
      )}
      {show && (
        <Container fluid className="lightblue-bg border rounded">
          <Col
            className="d-flex flex-column justify-content-end"
            style={{ overflowY: "scroll", height: "450px" }}
          >
            {messagesPrev?.map((item, index) => (
              <>
                <div key={index} className="">
                  {item.msgType === "sent" ? (
                    <div key={index} className="ps-5">
                      <div className="white-bg p-1 ms-5  my-2 border rounded d-flex flex-column justify-content-center align-items-end">
                        <div className="text-muted">{item.msgType + " "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="pe-5">
                      <div className="white-bg p-1 me-5 my-2 border rounded d-flex flex-column justify-content-center align-items-start">
                        <div className="text-muted">{item.msgType + " "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-4"></div>
              </>
            ))}
            {messages.map((item, index) => (
              <>
                <div key={index} className="">
                  {item.msgType === "" ? (
                    <div key={index} className="px-5">
                      <div className=" white-bg message-container-agora my-2 text-center white-bg black-color">
                        {item.msgText}
                      </div>
                    </div>
                  ) : item.msgType === "sent" ? (
                    <div key={index} className="ps-5">
                      <div className="white-bg p-1 ms-5  my-2 border rounded d-flex flex-column justify-content-center align-items-start">
                        <div className="text-muted">{item.msgType + " "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className=" pe-5">
                      <div className="white-bg p-1 me-5 my-2 border rounded d-flex flex-column justify-content-center align-items-end">
                        <div className="text-muted">{item.msgType + " "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-md-4"></div>
              </>
            ))}
          </Col>
          <Row>
            <div>
              <div className="my-2 d-flex flex-row jutify-content-around">
                <input
                  type="text"
                  placeholder="Peer message"
                  value={peerMessage}
                  className="px-2 flex-fill border rounded"
                  onChange={(e) => setPeerMessage(e.target.value)}
                />
                <Button
                  type="button"
                  className="white-bg water-color ms-4"
                  onClick={handleSendPeerMessage}
                >
                  send
                </Button>
              </div>
            </div>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AgoraChatComponent;
