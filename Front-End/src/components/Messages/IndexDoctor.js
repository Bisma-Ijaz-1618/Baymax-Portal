import React, { Button, Row, Col, Card, Container } from "react-bootstrap";
import useUserChatApi from "../../api/userChat";
import LoadingComponent from "../General/Loading";
import ErrorComponent from "../General/Error";
import ChatBox from "./ChatBox1";
import { useEffect, useState } from "react";
import { Doctor123 } from "../../Config/Agora";
import { Outlet, Link } from "react-router-dom";
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
                <Link to={`${user._id}/${user.username}`}>
                  <Button
                    className="white-bg lightblue-color lightblue-border w-100  d-flex text-left"
                    onClick={() => {
                      setShow(false);
                      setShow(true);
                    }}
                  >
                    {user.username}
                  </Button>
                </Link>
              </div>
            ))
          )}
        </Col>
        <Col
          className="border rounded d-flex flex-column align-items-center justify-content-center"
          sm={9}
        >
          {" "}
          {show ? (
            <>
              <Outlet />
            </>
          ) : (
            <div className="text-center" align="middle">
              {" "}
              <h4>Choose A Chat</h4>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MessagingPage;
