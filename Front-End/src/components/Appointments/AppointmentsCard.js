import React from "react";
import { Card, Col, Badge } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";

function AppointmentCard({ appointmentsCount, appointments }) {
  return (
    <Col md={3}>
      <Card>
        <Card.Body>
          <h6>Appointments</h6>
          <h3>{appointmentsCount}</h3>
          {appointments &&
            appointments.map((appointment) => (
              <div key={appointment.id} className="mb-2">
                <BsCalendar className="mr-2" />
                <Badge variant="secondary">{appointment.status}</Badge>
              </div>
            ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AppointmentCard;
