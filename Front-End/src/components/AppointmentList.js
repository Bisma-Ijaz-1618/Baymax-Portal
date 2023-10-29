import React from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faUserMd,
  faPhone,
  faChild,
  faHeartbeat,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";

function AppointmentList() {
  const appointments = [
    {
      date: "10 Dec",
      time: "10:00 AM",
      department: "Cardiology",
      doctor: "Dr. John Doe",
      contact: "+1 (123) 456-7890",
    },
    {
      date: "19 Jan",
      time: "02:30 PM",
      department: "Pediatrics",
      doctor: "Dr. Jane Smith",
      contact: "+1 (987) 654-3210",
    },
    // Add more appointments
  ];

  const departmentIcons = {
    Cardiology: faHeartbeat,
    Pediatrics: faChild,
    Dentistry: faTooth,
    // Add more department icons
  };

  return (
    <Card className="mt-4">
      <Card.Header>
        <h5>Upcoming Appointments</h5>
      </Card.Header>
      <ListGroup variant="flush">
        {appointments.map((appointment, index) => (
          <ListGroup.Item
            key={index}
            className="d-flex border rounded my-1 p-3 mx-2"
          >
            <Row className="align-items-center">
              <Col sm={"auto"}>
                <Row>
                  <p className="mb-0">
                    <FontAwesomeIcon
                      icon={departmentIcons[appointment.department]}
                    />
                    <strong>{appointment.department}</strong>
                  </p>
                </Row>
                <Row>
                  <p className="mb-0">
                    <FontAwesomeIcon icon={faUserMd} /> {appointment.doctor}
                  </p>
                </Row>
              </Col>
              <Col></Col>
              <Col sm={"auto"}>
                <h6 className="mb-0">{appointment.date}</h6>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}

export default AppointmentList;
