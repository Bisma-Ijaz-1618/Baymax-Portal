import React, { useState, useEffect } from "react";
import AC, { AgoraChat } from "agora-chat"; // Assuming AC is imported correctly
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuthHook";
import { axiosPrivate } from "../../api/axios";
import { useParams } from "react-router-dom";
const AgoraChatComponent = () => {
  const { PeerId } = useParams();
  const { username } = useParams();
  console.log(username, PeerId);
  const { auth } = useAuth();
  const [myId, setMyId] = useState(null);
  const [peerMessage, setPeerMessage] = useState("");
  const [messages, setMessages] = useState([{ msgType: "", msgText: "" }]);
  const [messagesPrev, setMessagesPrev] = useState([
    { msgType: "", msgText: "" },
  ]);

  const getchat = useQuery({
    queryKey: ["chat", myId, PeerId],
    queryFn: async () => {
      console.log("reciever", PeerId);
      try {
        const response = await axiosPrivate.get(`Chat/${PeerId}`);
        console.log("chat daata", response.data);
        return response.data || [{ msgType: "", msgText: "" }];
      } catch (err) {
        console.log("err fetching chat", err);
        return [{ msgType: "", msgText: err }];
      }
    },
    onSuccess: (data) => {
      setMessagesPrev(data);
      console.log("we got a chat of prev", messagesPrev);
    },
    refetchInterval: 2000,
  });

  useEffect(() => {
    console.log("in load", PeerId, "PeerId", PeerId);
    while (true) {
      if (myId === null) {
        console.log("didnt get id", auth.userId);
      } else {
        console.log("got id", auth.userId);
        setMyId(auth.userId);
        break;
      }
    }
    return () => {
      console.log("wassup, messages on return", messages);
      if (messages.length > 0) {
        saveMessages.mutate(messages);
      }
    };
  }, [PeerId]);

  const saveMessages = useMutation({
    mutationFn: async (messages) => {
      try {
        const response = await axiosPrivate.put(`Chat/${PeerId}`, {
          messages,
        });
        console.log("messages sent", messages);
      } catch (err) {
        console.log("error in updating messages", err);
      }
    },
    onSuccess: () => {
      console.log("mutation success");
      getchat.refetch();
    },
  });
  const handleSendPeerMessage = () => {
    setMessages((prev) => [...prev, { msgType: "", msgText: peerMessage }]);
    saveMessages.mutate(messages);
    setMessages({ msgType: "", msgText: "" });
  };

  return (
    <>
      <h3>{username}</h3>
      {
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
                    <div key={index} className="ps-5">
                      <div className="white-bg p-1 ms-5  my-2 border rounded d-flex flex-column justify-content-center align-items-start">
                        <div className="text-muted">{item.msgType + " "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  ) : (
                    <></>
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
      }
    </>
  );
};

export default AgoraChatComponent;
