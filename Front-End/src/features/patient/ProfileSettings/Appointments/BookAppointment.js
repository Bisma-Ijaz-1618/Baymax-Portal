import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Form, Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BiSearch, BiCalendarPlus } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import useDoctorApi from "../../../../api/doctor";
import AppointmentModal from "./AppointmentModalRequest";
function BookAppointment() {
  const { allDoctorsQuery } = useDoctorApi();
  // Use useLocation hook to get access to location object
  const location = useLocation();
  const [custom, setCustom] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <Card>
      <Card.Header className="white-bg px-0 d-flex justify-content-between align-items-center ">
        <h2 className="text-left px-2 m-0">Request Custom Slot</h2>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <h5>
            Need a slot at a specific time? Click the button below to request a
            custom slot.
          </h5>
        </Card.Text>
        <Form>
          <Form.Group controlId="doctorFilter">
            <Form.Label>Select Doctor:</Form.Label>
            <Form.Control
              as="select"
              name="doctor"
              onChange={(e) => setSelectedDoctor(e.target.value)}
              value={selectedDoctor}
            >
              <option value="">Select Doctor</option>
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
          <Form.Group controlId="timeFilter" className="mb-4">
            <Form.Label>Select Time:</Form.Label>
            <Form.Control
              as="select"
              name="time"
              onChange={(e) => setSelectedTime(e.target.value)}
              value={selectedTime}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={`${hour < 10 ? "0" : ""}${hour}:00`}>
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
      </Card.Body>
    </Card>
  );
}

export default BookAppointment;
