import React, { useState, useEffect } from "react";
import AC, { AgoraChat } from "agora-chat"; // Assuming AC is imported correctly
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuthHook";
import { axiosPrivate } from "../../api/axios";
import { useParams } from "react-router-dom";
const AgoraChatComponent = () => {
  const { peerId } = useParams();
  const { username } = useParams();
  console.log(username, peerId);
  const { auth } = useAuth();
  const [myId, setMyId] = useState(null);
  const [checkId, setCheckId] = useState(null);
  const [peerMessage, setPeerMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [messagesPrev, setMessagesPrev] = useState(null);

  const getchat = useQuery({
    queryKey: ["chat", myId, peerId],
    queryFn: async () => {
      console.log("reciever", peerId);
      try {
        const response = await axiosPrivate.get(`Chat/get/${peerId}`);
        console.log("chat daata", response.data);
        return response.data || [];
      } catch (err) {
        console.log("err fetching chat", err);
        return [];
      }
    },
    onSuccess: (data) => {
      console.log("success data", data);
      setMessagesPrev(data?.messages);
      setCheckId(data?.Peer1Id);
      console.log("we got a chat of prev", messagesPrev);
    },
    refetchInterval: 3000,
  });

  useEffect(() => {
    console.log("in load", peerId, "peerId", peerId);
    while (true) {
      if (auth?.userId === null) {
        console.log("didnt get haw id", auth.userId);
      } else {
        console.log("got id", auth.userId);
        setMyId(auth.userId);
        break;
      }
    }
    getchat.refetch();
    return () => {
      console.log("wassup, messages on return", messages);
      setPeerMessage("");
      setMessagesPrev(null);
    };
  }, [peerId]);

  const saveMessages = useMutation({
    mutationFn: async (messages) => {
      try {
        const response = await axiosPrivate.put(`Chat/send/${peerId}`, {
          messages,
        });
        console.log("messages sent", messages);
      } catch (err) {
        console.log("error in updating messages", err);
      }
    },
    onSuccess: () => {
      console.log("mutation success");
      setMessages(null);
      setPeerMessage("");
      getchat.refetch();
    },
  });
  const handleSendPeerMessage = (Peer) => {
    saveMessages.mutate([{ msgType: "", msgText: peerMessage }]);
  };

  return (
    <>
      <h3>{username}</h3>
      {
        <Container className="lightblue-bg border rounded mb-2 ">
          <Row>
            <Col
              className="d-flex flex-column justify-content-end "
              style={{ overflowY: "scroll", height: "400px" }}
            >
              {messagesPrev?.map((item, index) => (
                <div key={index} className="w-auto pe-2">
                  {checkId !== peerId || peerId === myId ? (
                    <div key={index} className="ps-5">
                      <div className="white-bg p-1 ms-5  my-2 border rounded d-flex flex-column justify-content-center align-items-end">
                        <div className="text-muted">{"You "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  ) : (
                    <div key={index} className="pe-5">
                      <div className="white-bg p-1 me-5 my-2 border rounded d-flex flex-column justify-content-center align-items-start">
                        <div className="text-muted">{username + " "} </div>
                        <div>{" " + item.msgText}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {messages?.map((item, index) => (
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
              ))}
            </Col>
          </Row>
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
                  onClick={() => handleSendPeerMessage(peerMessage)}
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
