import React, { useState } from "react";
import { Container, Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Sample data for messages
const doctorMessages = [
  {
    id: 1,
    name: "Doctor 1",
    messageCount: 5,
    messages: [
      "Hello",
      "How can I assist you?",
      "Please describe your symptoms.",
    ],
  },
  {
    id: 2,
    name: "Doctor 2",
    messageCount: 3,
    messages: ["Good morning", "What brings you here today?"],
  },
];

const patientMessages = [
  {
    id: 1,
    name: "Patient 1",
    messageCount: 7,
    messages: ["I've been having headaches.", "It started last week."],
  },
  {
    id: 2,
    name: "Patient 2",
    messageCount: 2,
    messages: ["I'm feeling better now.", "Thank you for your help."],
  },
];

// Component to display messages in a list
const MessageList = ({ messages, onItemClick }) => {
  return (
    <div>
      {messages.map((message) => (
        <div
          key={message.id}
          className="message-item"
          onClick={() => onItemClick(message)}
        >
          <FontAwesomeIcon icon={faUser} className="account-icon" />
          <span className="name">{message.name}</span>
          <span className="message-count">{message.messageCount}</span>
        </div>
      ))}
    </div>
  );
};

// Main MessagingPage component
const MessagingPage = () => {
  const [activeTab, setActiveTab] = useState("doctor");
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const handleChatItemClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleSend = () => {
    // Here you can implement sending the message
    console.log("Sending message:", newMessage);
    setNewMessage(""); // Clearing the input field after sending
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={5}>
          <h1>Your Messages</h1>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <Tab.Container
            id="left-tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
            <Row>
              <Col>
                <Nav className="justify-content-center">
                  <Nav.Item>
                    <Nav.Link eventKey="doctor">Doctors</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="patient">Patients</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col>
                {activeTab === "doctor" && (
                  <MessageList
                    messages={doctorMessages}
                    onItemClick={handleChatItemClick}
                  />
                )}
                {activeTab === "patient" && (
                  <MessageList
                    messages={patientMessages}
                    onItemClick={handleChatItemClick}
                  />
                )}
              </Col>
            </Row>
          </Tab.Container>
        </Col>
        <Col sm={9}>
          {/* Right column for chat display */}
          <div className="chat-display">
            {selectedChat && (
              <>
                {selectedChat.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={
                      selectedChat.name === "You"
                        ? "sent-message"
                        : "received-message"
                    }
                  >
                    <div className="chat-bubble water-bg">
                      <p className="message">{msg}</p>
                      <p className="timestamp">12:34 PM</p>
                    </div>
                  </div>
                ))}
              </>
            )}
            <Form
              className="message-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <Form.Control
                className="message-input"
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button className="send-button" variant="primary" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MessagingPage;
