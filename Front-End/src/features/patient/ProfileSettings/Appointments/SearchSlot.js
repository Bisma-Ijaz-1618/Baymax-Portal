import React, { useState } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useDoctorApi from "../../../../api/doctor"; // Adjust the path accordingly
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppointmentModal from "./AppointmentModal";
const PatientPage = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const queryClient = useQueryClient();
  const { getDoctors } = useDoctorApi();
  const navigate = useNavigate();

  const allDoctorsQuery = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(),
    onSuccess: () => slotsGivenDateOrAndDoctorQuery.refetch(),
  });
  const slotsGivenDateOrAndDoctorQuery = useQuery({
    queryKey: ["slots", selectedDate, selectedDoctor],
    enabled: allDoctorsQuery.isSuccess,
    queryFn: async () => {
      try {
        if (!selectedDate && selectedDoctor) {
          console.log("no date only username");
          const filteredDoctors =
            allDoctorsQuery.data.filter(
              (doctor) => doctor.userId._id === selectedDoctor
            ) || [];
          return filteredDoctors;
        } else if (selectedDate && !selectedDoctor) {
          console.log("Filtering by selected date only...");

          const doctorsWithSelectedDateEvent = allDoctorsQuery.data.filter(
            (doctor) =>
              doctor.events.some((event) => {
                if (event && event.start) {
                  const eventDateOnly = event.start.split("T")[0];
                  console.log("Start date of event:", eventDateOnly);
                  return eventDateOnly === selectedDate;
                }
                return false;
              })
          );

          console.log(
            "Doctors with events on selected date:",
            doctorsWithSelectedDateEvent
          );

          return doctorsWithSelectedDateEvent;
        } else if (selectedDate && selectedDoctor) {
          console.log("both");
          const filteredDoctors =
            allDoctorsQuery.data.filter(
              (doctor) => doctor.userId._id === selectedDoctor
            ) || [];
          if (filteredDoctors) {
            const doctorsWithSelectedDateEvent = filteredDoctors.filter(
              (doctor) =>
                doctor.events.some((event) => {
                  if (event && event.start) {
                    const eventDateOnly = event.start.split("T")[0];
                    console.log("Start date of event:", eventDateOnly);
                    return eventDateOnly === selectedDate;
                  }
                  return false;
                })
            );
            return doctorsWithSelectedDateEvent || [];
          }
        } else {
          console.log("none");
          return allDoctorsQuery.data || [];
        }
      } catch (error) {
        console.log("error", error);
      }
    },
  });

  // Function to handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "doctor") {
      setSelectedDoctor(value);
    } else if (name === "date") {
      setSelectedDate(value);
    }
  };

  const handleReset = (e) => {
    setSelectedDate("");
    setSelectedDoctor("");
    e.preventDefault();
    console.log("in reset");
  };

  const displayEvent = (event, index, Id) => {
    if (event) {
      const startDate = new Date(event.start);
      const endDate = new Date(event.end);
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();
      const hours = [];

      // Add each hour between the start and end times to the hours array
      for (let hour = startHour; hour <= endHour; hour++) {
        hours.push(hour);
      }

      return (
        <>
          <React.Fragment key={index}>
            <div>Date: {startDate.toLocaleDateString()}</div>
            {hours.map((hour, hourIndex) => (
              <li key={`${index}-${hourIndex}`}>
                Time Slot: {hour}:00 - {hour + 1}:00
                <AppointmentModal
                  appointmentDetails={{
                    date: startDate.toISOString(),
                    startTime: hour,
                    status: "accepted",
                    doctorId: Id,
                  }}
                />
              </li>
            ))}
          </React.Fragment>
        </>
      );
    }
  };

  if (allDoctorsQuery.isLoading) return <div>Loading...</div>;
  if (allDoctorsQuery.isError) return <div>Error fetching data</div>;

  return (
    <Container>
      <Row>
        <Col>
          <h2>Find Available Slots</h2>
          <Form>
            <Form.Group controlId="doctorFilter">
              <Form.Label>Select Doctor:</Form.Label>
              <Form.Control
                as="select"
                name="doctor"
                onChange={handleFilterChange}
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
                onChange={handleFilterChange}
                value={selectedDate}
              />
            </Form.Group>
            <Button type="submit" onClick={handleReset}>
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Appointments</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {slotsGivenDateOrAndDoctorQuery.data &&
                slotsGivenDateOrAndDoctorQuery.data.map(
                  (doctor) =>
                    doctor &&
                    doctor.events && (
                      <tr key={doctor.userId._id}>
                        <td>{doctor.userId.username}</td>
                        <td>{doctor.department}</td>
                        <td>
                          <ul>
                            {doctor.events.map(
                              (event, index) =>
                                event && (
                                  <div>
                                    {displayEvent(
                                      event,
                                      index,
                                      doctor.userId._id
                                    )}
                                  </div>
                                )
                            )}
                          </ul>
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientPage;
