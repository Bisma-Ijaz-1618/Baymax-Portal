import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Form, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearch, BiCalendarPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useDoctorApi from "../../../../api/doctor";
import AppointmentModal from "./AppointmentModal";
function BookAppointment() {
  const queryClient = useQueryClient();
  const DoctorApi = useDoctorApi();
  // Use useLocation hook to get access to location object
  const location = useLocation();
  const [custom, setCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const allDoctorsQuery = useQuery({
    queryKey: ["doctors"],
    queryFn: () => DoctorApi.getDoctors(),
  });
  return (
    <Container>
      <h1>Book Your Appointment</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>Instant Booking!</h3>
              </Card.Title>
              <Card.Text>
                <h4>
                  Click the button below to search available slots to secure
                  your booking instantly!
                </h4>
              </Card.Text>
              <Link to="/auth/patient/searchSlot">
                <Button variant="primary">
                  <BiSearch className="mr-2" /> Search Slot
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                <h3>Request Custom Slot</h3>
              </Card.Title>
              <Card.Text>
                <h4>
                  Need a slot at a specific time? Click the button below to
                  request a custom slot.
                </h4>
              </Card.Text>
              <Button onClick={() => setCustom(true)} variant="primary">
                <BiCalendarPlus className="mr-2" /> Request Custom Slot
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {custom ? (
        <>
          {" "}
          <Form>
            <Form.Group controlId="doctorFilter">
              <Form.Label>Select Doctor:</Form.Label>
              <Form.Control
                as="select"
                name="doctor"
                onChange={(e) => setSelectedDoctor(e.target.value)}
                value={selectedDoctor}
              >
                <option value="">-- Select Doctor --</option>
                {allDoctorsQuery.data.map((doctor) => (
                  <option key={doctor.userId._id} value={doctor.userId._id}>
                    {doctor.userId.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="dateFilter">
              <Form.Label>Select Date:</Form.Label>
              <Form.Control
                type="date"
                name="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                value={selectedDate}
              />
            </Form.Group>
            <Form.Group controlId="timeFilter">
              <Form.Label>Select Time:</Form.Label>
              <Form.Control
                as="select"
                name="time"
                onChange={(e) => setSelectedTime(e.target.value)}
                value={selectedTime}
              >
                {[...Array(24).keys()].map((hour) => (
                  <option
                    key={hour}
                    value={`${hour < 10 ? "0" : ""}${hour}:00`}
                  >
                    {`${hour < 10 ? "0" : ""}${hour}:00`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            {console.log("SELECTED DATE ::", selectedDate)}
            <AppointmentModal
              appointmentDetails={{
                date: selectedDate,
                startTime: parseInt(selectedTime),
                status: "requested",
                doctorId: selectedDoctor,
              }}
            />
          </Form>
        </>
      ) : (
        <></>
      )}
    </Container>
  );

  return (
    <div>
      <h2>New Page</h2>
      <p>Variable 1: {userId}</p>
      <p>Variable 1: {username}</p>
      <p>Variable 2: {start}</p>
      <p>Variable 2: {end}</p>
    </div>
  );

  const { userId, username, start, end } = location.state || {};

  if (!userId || !username || !start || !end) {
    return <Container></Container>;
  }
}

export default BookAppointment;
