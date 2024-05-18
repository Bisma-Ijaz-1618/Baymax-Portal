import React, { useEffect } from "react";
import { Table, Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { BsCalendar, BsClockFill } from "react-icons/bs";
import { useState } from "react";
import ErrorComponent from "../../../../components/General/Error";
import LoadingComponent from "../../../../components/General/Loading";
import useDoctorAppointmentsApi from "../../../../api/Doctor/patientAppointments";
import { formatStartTime } from "../../../../utils/dateUtil";
import { useNavigate } from "react-router-dom";
import AppointmentModalAccept from "../../../../components/Appointments/AppointmentModalAccept";
import AppointmentModalReject from "../../../../components/Appointments/AppointmentModalReject";
function AppointmentList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();
  const handleCallButtonClick = (id) => {
    console.log("GOING OT CALL");
    navigate(`/auth/patient/call/${id}`);
  };

  const {
    allDoctorAppointmentsQuery,
    DoctorAcceptedAppointmentsQuery,
    DoctorCompletedAppointmentsQuery,
    DoctorRejectedAppointmentsQuery,
    DoctorRequestedAppointmentsQuery,
  } = useDoctorAppointmentsApi();
  useEffect(() => {
    setSelectedCategory("All");
    return () => {
      setSelectedCategory("All");
    };
  }, []);
  const getSelectedQuery = () => {
    switch (selectedCategory) {
      case "Accepted":
        return DoctorAcceptedAppointmentsQuery;
      case "Rejected":
        return DoctorRejectedAppointmentsQuery;
      case "Requested":
        return DoctorRequestedAppointmentsQuery;
      case "Completed":
        return DoctorCompletedAppointmentsQuery;
      case "All":
      default:
        return allDoctorAppointmentsQuery;
    }
  };
  const selectResponse = async () => {
    try {
      if (selectedCategory === "All") {
        allDoctorAppointmentsQuery.refetch();
      } else if (selectedCategory === "Accepted") {
        DoctorAcceptedAppointmentsQuery.refetch();
      } else if (selectedCategory === "Rejected") {
        DoctorRejectedAppointmentsQuery.refetch();
      } else if (selectedCategory === "Requested") {
        DoctorRequestedAppointmentsQuery.refetch();
      } else if (selectedCategory === "Completed") {
        DoctorCompletedAppointmentsQuery.refetch();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    const res = async () => {
      await selectResponse();
    };
    res();
    return () => {};
  }, [selectedCategory]);

  const CategoryList = [
    "All",
    "Accepted",
    "Rejected",
    "Completed",
    "Requested",
  ];

  if (allDoctorAppointmentsQuery.isError) {
    return <ErrorComponent message={""} />;
  }
  const handleCategoryChange = async (e) => {
    setSelectedCategory(e.target.value);
  };

  const DateOptions = Object.DateOptions;
  const TimeOptions = Object.TimeOptions;

  return (
    <>
      <Card
        className="border my-3 p-0 rounded align-items-stretch"
        style={{ border: "none" }}
      >
        <Card.Header className="d-flex flex-row justify-content-between white-bg align-items-center">
          <h5 className="black-color p-0 m-0">Appointments</h5>
          <Form.Group controlId="categorySelect">
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {CategoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Card.Header>
        <Card.Body className="p-0 m-0">
          {allDoctorAppointmentsQuery.isLoading ||
          DoctorAcceptedAppointmentsQuery.isLoading ||
          DoctorRejectedAppointmentsQuery.isLoading ||
          DoctorRequestedAppointmentsQuery.isLoading ||
          DoctorCompletedAppointmentsQuery.isLoading ? (
            <LoadingComponent />
          ) : (
            <Table className=" p-0 m-0">
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getSelectedQuery().data.map((appointment, index) => {
                  return (
                    <tr key={index}>
                      <td>{appointment.doctorId.username || "N/A"}</td>
                      <td>{appointment.status || "N/A"}</td>
                      <td>
                        {formatStartTime(appointment.startTime).date || "N/A"}
                      </td>
                      <td>
                        {formatStartTime(appointment.startTime).time || "N/A"}
                      </td>
                      <td>
                        {formatStartTime(appointment.endTime).time || "N/A"}
                      </td>
                      <td>
                        <Row
                          sm={4}
                          className="p-0 m-0 d-flex flex-row justify-content-start"
                        >
                          {appointment.status === "accepted" ? (
                            <>
                              <Col sm={4} className="p-0 m-1">
                                <Button
                                  onClick={() =>
                                    handleCallButtonClick(appointment._id)
                                  }
                                  variant="primary"
                                  className="p-1 water-bg w-100"
                                >
                                  <small>Start</small>
                                </Button>
                              </Col>
                              <Col sm={4} className="p-0 m-1">
                                <AppointmentModalReject id={appointment._id} />
                              </Col>
                            </>
                          ) : appointment.status === "requested" ? (
                            <>
                              <Col sm={4} className="p-0 m-1">
                                <AppointmentModalAccept id={appointment._id} />
                              </Col>
                              <Col sm={4} className="p-0 m-1">
                                <AppointmentModalReject id={appointment._id} />
                              </Col>
                            </>
                          ) : (
                            <></>
                          )}
                        </Row>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default AppointmentList;
