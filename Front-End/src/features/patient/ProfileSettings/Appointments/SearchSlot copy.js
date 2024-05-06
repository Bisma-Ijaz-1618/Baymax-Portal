import React, { useState } from "react";
import { Card, Container, Row, Col, Form, Table } from "react-bootstrap";
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
    onSuccess: (data) => {
      console.log("SUCCCCCC", data);
      slotsGivenDateOrAndDoctorQuery.refetch();
    },
    onError: (err) => console.log("ERRRRRRRRR", err),
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
      <Card className="white-bg m-0 p-0">
        <Card.Header>
          <Row className="d-flex flex-row align-items center justify-content-between">
            <h2 className="m-0 p-0">Available Slots</h2>
            <Col className="d-flex flex-row align-items-center justify-content-start">
              <Row>
                <Col md="auto">
                  <Form.Group controlId="doctorFilter">
                    <Form.Control
                      as="select"
                      name="doctor"
                      onChange={handleFilterChange}
                      value={selectedDoctor}
                    >
                      <option value="">Select Doctor</option>
                      {allDoctorsQuery.data.map((doctor) => (
                        <option
                          key={doctor.userId._id}
                          value={doctor.userId._id}
                        >
                          {doctor.userId.username}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md="auto">
                  <Form.Group controlId="dateFilter">
                    <Form.Control
                      type="date"
                      name="date"
                      onChange={handleFilterChange}
                      value={selectedDate}
                    />
                  </Form.Group>
                </Col>
                <Col md="auto p-0 m-0">
                  <Button
                    clasName="p-0 m-0"
                    type="submit"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table className="p-0 m-0" bordered hover>
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
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PatientPage;
