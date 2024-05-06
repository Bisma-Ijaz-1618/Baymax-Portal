import React, { Button, Row, Col, Card, Container } from "react-bootstrap";
import useUserChatApi from "../../api/userChat";
import LoadingComponent from "../General/Loading";
import ErrorComponent from "../General/Error";
import ChatBox1 from "../VideoConference/ChatBox1";
import { useState } from "react";
const MessagingPage = () => {
  const { AllUsersQuery } = useUserChatApi();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);
  return (
    <Container className="my-4">
      <Row className="w-80 mx-5 p-5">
        <Col
          sm={3}
          className="border rounded "
          style={{
            overflowY: "scroll",
            height: "500px",
          }}
        >
          <h3>Users</h3>
          {AllUsersQuery.isLoading ? (
            <LoadingComponent />
          ) : AllUsersQuery.isError ? (
            <ErrorComponent message={""} />
          ) : (
            AllUsersQuery.data.map((user, index) => (
              <div key={index} className="my-1 ">
                <Button
                  className="white-bg lightblue-color lightblue-border w-100  d-flex text-left"
                  onClick={() => {
                    setShow(true);
                    setUser(user.username);
                  }}
                >
                  {user.username}
                </Button>
              </div>
            ))
          )}
        </Col>
        <Col className="border rounded" sm={9}>
          {show ? (
            <>
              <ChatBox1
                username={user}
                userId={"Doctor123"}
                token={
                  "007eJxTYLi0XdBWYYbNBDldyx+tsRM3+27giJ07mSdkTWHV0rOtP98rMKQZmhiaG5gbJKVYJpuYGBtaJBkkWRgaG5kYJxkYm1uYd2kZpTUEMjJM/DSDhZGBlYERCEF8FYZEy0RTM4NEA920tFRzXUPD1FTdREPjFF1jc5NUY+NUc/M0IyMA+VAmQw=="
                }
                peerId={"Patient123"}
              />
            </>
          ) : (
            <div className="text-center"> Choose A Chat</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MessagingPage;
