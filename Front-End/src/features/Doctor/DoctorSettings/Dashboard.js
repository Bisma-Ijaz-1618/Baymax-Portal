import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import {
  BsFillPersonFill,
  BsCalendar,
  BsChatDots,
  BsFileText,
} from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";

// Function to generate random data
const generateRandomData = () => {
  return {
    patientsCount: Math.floor(Math.random() * 50) + 10,
    appointmentsCount: Math.floor(Math.random() * 20) + 5,
    messagesCount: Math.floor(Math.random() * 100) + 20,
    invoicesCount: Math.floor(Math.random() * 30) + 5,
    patients: generateRandomPatients(),
    appointments: generateRandomAppointments(),
    invoices: generateRandomInvoices(),
  };
};

// Function to generate random patients
const generateRandomPatients = () => {
  const patients = [];
  const names = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Brown"];
  for (let i = 0; i < 5; i++) {
    patients.push({
      id: i + 1,
      name: names[Math.floor(Math.random() * names.length)],
      imageUrl: `https://randomuser.me/api/portraits/men/${i}.jpg`,
    });
  }
  return patients;
};

// Function to generate random appointments
const generateRandomAppointments = () => {
  const appointments = [];
  const statuses = ["Request", "Pending", "Completed", "Rejected"];
  for (let i = 0; i < 5; i++) {
    appointments.push({
      id: i + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return appointments;
};

// Function to generate random invoices
const generateRandomInvoices = () => {
  const invoices = [];
  const statuses = ["Paid", "Unpaid"];
  for (let i = 0; i < 5; i++) {
    invoices.push({
      id: i + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return invoices;
};

const DoctorDashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    setData(generateRandomData());
  }, []);

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Doctor Dashboard</h2>
          <Row>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h6>Patients</h6>
                  <h3>{data.patientsCount}</h3>
                  {data &&
                    data.patients &&
                    data.patients.map((patient) => (
                      <div
                        key={patient.id}
                        className="d-flex align-items-center mb-2"
                      >
                        <BsFillPersonFill className="mr-2" />
                        <span>{patient.name}</span>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h6>Appointments</h6>
                  <h3>{data.appointmentsCount}</h3>
                  {data.appointments &&
                    data.appointments.map((appointment) => (
                      <div key={appointment.id} className="mb-2">
                        <BsCalendar className="mr-2" />
                        <Badge variant="secondary">{appointment.status}</Badge>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h6>Messages</h6>
                  <h3>{data.messagesCount}</h3>
                  <AiFillMessage size={30} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <h6>Invoices</h6>
                  <h3>{data.invoicesCount}</h3>
                  {data.invoices &&
                    data.invoices.map((invoice) => (
                      <div key={invoice.id} className="mb-2">
                        <BsFileText className="mr-2" />
                        <Badge
                          variant={
                            invoice.status === "Paid" ? "success" : "danger"
                          }
                        >
                          {invoice.status}
                        </Badge>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
