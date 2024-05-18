import React, { useState, useEffect } from "react";
import { Row, Col, Offcanvas } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Signout from "../../auth/Logout";
function AdminDashHeader() {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  const notifications = [
    "You have 4 notifications",
    "You have 4 Messages",
    "You have 1 Appointments Scheduled",
    "Update Your Profile",
  ];
  const [currentNotification, setCurrentNotification] = useState("");
  const [showNotificationPane, setShowNotificationPane] = useState(false);

  useEffect(() => {
    const selectRandomNotification = () => {
      const randomIndex = Math.floor(Math.random() * notifications.length);
      return notifications[randomIndex];
    };

    setCurrentNotification(selectRandomNotification());

    const interval = setInterval(() => {
      setCurrentNotification(selectRandomNotification());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => setShowNotificationPane(false);
  const handleShow = () => setShowNotificationPane(true);

  return (
    <div>
      <Row className="live-header">
        <Col className="my-2">
          <h1>Patient Dashboard</h1>
          <p className="header-animated-text">{currentNotification}</p>
        </Col>
        <Col className="my-2 d-flex flex-column justify-content-center align-items-end">
          <Row className="my-auto mx-2">
            <h5>{today}</h5>
          </Row>
          <div className="mx-1 d-flex flex-row justify-content-end align-items-end">
            <div className="search-container">
              <input
                type="text"
                className="search-bar"
                placeholder="Search..."
              />
            </div>
            <FontAwesomeIcon
              icon={faSearch}
              className="my-2 mx-2 search-icon"
            />
            <div className="notification-container">
              <div className="notification-token fire-bg">
                {notifications.length}
              </div>
            </div>
            <FontAwesomeIcon
              icon={faBell}
              className="my-2 mx-2 notification-icon"
              onClick={handleShow}
            />
            <Signout />
          </div>
        </Col>
      </Row>
      <Offcanvas
        placement="end"
        name="end"
        show={showNotificationPane}
        onHide={handleClose}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {notifications.map((notification, index) => (
            <p key={index}>{notification}</p>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default AdminDashHeader;
