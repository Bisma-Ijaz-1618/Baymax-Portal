import React, { useEffect, useState } from "react";
import useDoctorApi from "../../../../api/doctor"; // Adjust the path accordingly
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AppoitnmentModalBook from "./AppoitnmentModalBook";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Table,
  Stack,
} from "react-bootstrap";
import BookAppointment from "./BookAppointment";

const DoctorComponent = () => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { allDoctorsQuery } = useDoctorApi();

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
    onSuccess: (data) => {
      console.log("QUERY DATA", data);
    },
    onError: (err) => {
      console.log("QUERY Error", err);
    },
  });

  useEffect(() => {
    if (allDoctorsQuery.isSuccess) {
      console.log("Doctors data:", allDoctorsQuery.data);
    }
  }, [allDoctorsQuery.isSuccess]);
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

  if (allDoctorsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (allDoctorsQuery.isError) {
    return <div>Error: {allDoctorsQuery.error.message}</div>;
  }

  const fillTable = () => {
    return (
      <Table className="p-0 m-0" bordered hover>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Book Right Now</th>
          </tr>
        </thead>
        <tbody>
          {slotsGivenDateOrAndDoctorQuery.data &&
            slotsGivenDateOrAndDoctorQuery.data.map(
              (doctor) =>
                doctor &&
                doctor.events &&
                doctor.events.map((event, index) => {
                  // Check if the event and its start property are not null or undefined
                  if (event && event.start && event.end) {
                    const startDate = new Date(event.start);
                    const endDate = new Date(event.end);
                    const month = startDate.toLocaleString("default", {
                      month: "short",
                    });
                    const day = startDate.getDate();
                    const formattedDate = `${month}, ${day}`;
                    const startTime = startDate.getHours();
                    const endTime = endDate.getHours();

                    return (
                      <tr key={index}>
                        <td>{doctor.userId.username}</td>
                        <td>{doctor.department}</td>
                        {/* Render your event data inside <td> elements */}
                        <td>{formattedDate}</td>
                        <td>
                          {startTime} :00 - {endTime} : 00
                        </td>
                        <td>
                          <AppoitnmentModalBook
                            appointmentDetails={{
                              date: startDate.toISOString(),
                              startTime: startTime,
                              status: "accepted",
                              doctorId: doctor.userId._id,
                            }}
                          />
                        </td>{" "}
                      </tr>
                    );
                  } else {
                    return <></>; // Return null if event or start property is null or undefined
                  }
                })
            )}
          <tr>
            <td colSpan={5} align="center">
              {"<< "}No More Items To Show{" >>"}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };
  // Render your UI with the fetched data
  return (
    <Container>
      <Row className="my-3 d-flex flex-row justify content-stretch">
        <Col md={8}>
          <Card className=" h-100 white-bg m-0 p-0">
            <Card.Header className="white-bg px-0 d-flex justify-content-between align-items-center ">
              <Row className="w-100 p-0 m-0">
                <Stack direction="horizontal" gap={3}>
                  <div className="p-0 m-0">
                    <h2 className="m-0 p-0">Available Slots</h2>
                  </div>
                  <div className="p-0 m-0 ms-auto">
                    <Form.Group controlId="doctorFilter" className="m-0">
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
                  </div>
                  <div className="p-0 m-0">
                    <Form.Group controlId="dateFilter" className="m-0">
                      <Form.Control
                        type="date"
                        name="date"
                        onChange={handleFilterChange}
                        value={selectedDate}
                      />
                    </Form.Group>
                  </div>
                  <div className="p-0 m-0">
                    <Button
                      className="water-bg py-1 px-2 my-0"
                      type="submit"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </Stack>
              </Row>
            </Card.Header>
            <Card.Body className="p-0 m-0">{fillTable()}</Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <BookAppointment />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorComponent;
