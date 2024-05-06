import React from "react";
import { Card, Col } from "react-bootstrap";
import { BsFillPersonFill } from "react-icons/bs";

function PatientCard({ patientsCount, patients }) {
  return (
    <Col md={3}>
      <Card>
        <Card.Body>
          <h6>Patients</h6>
          <h3>{patientsCount}</h3>
          {patients &&
            patients.map((patient) => (
              <div key={patient.id} className="d-flex align-items-center mb-2">
                <BsFillPersonFill className="mr-2" />
                <span>{patient.name}</span>
              </div>
            ))}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PatientCard;
