import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { BsCalendar, BsClockFill } from "react-icons/bs";
import { useState } from "react";
import ErrorComponent from "../../../components/General/Error";
import LoadingComponent from "../../../components/General/Loading";
import useDoctorAppointmentsApi from "../../../api/Doctor/patientAppointments";
import { formatStartTime } from "../../../utils/dateUtil";
import { useNavigate } from "react-router-dom";
import AppointmentModalAccept from "../../../components/Appointments/AppointmentModalAccept";
import AppointmentModalReject from "../../../components/Appointments/AppointmentModalReject";
function AppointmentList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const handleCallButtonClick = (id) => {
    console.log("GOING OT CALL");
    navigate(`/auth/doctor/call/${id}`);
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
      <Card className="align-items-stretch" style={{ border: "none" }}>
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
        <ListGroup variant="flush py-1 px-1">
          {allDoctorAppointmentsQuery.isLoading ||
          DoctorAcceptedAppointmentsQuery.isLoading ||
          DoctorRejectedAppointmentsQuery.isLoading ||
          DoctorRequestedAppointmentsQuery.isLoading ||
          DoctorCompletedAppointmentsQuery.isLoading ? (
            <LoadingComponent />
          ) : (
            getSelectedQuery().data.map((appointment, index) => (
              <ListGroup.Item key={index} className="border rounded m-1 p-1">
                <Row className="m-0 px-0 d-flex flex-row align-items-center justify-content-start text-left">
                  <Col
                    md="auto"
                    className="align-items-center list-icon-holder p-0 m-0"
                  >
                    <BsClockFill className=" m-0 water-color" />
                  </Col>
                  <Col className="mx-2">
                    <Row>
                      <strong className="p-0 m-0">
                        {appointment.patientId.username}
                      </strong>
                    </Row>
                    <Row>Status : {appointment.status}</Row>
                    <Row>{formatStartTime(appointment.startTime).date}</Row>
                    <Row>
                      {formatStartTime(appointment.startTime).time} -{" "}
                      {formatStartTime(appointment.endTime).time}
                    </Row>
                  </Col>
                  <Col sm="auto" className="p-0 m-0 justify-content-start">
                    {appointment.status === "accepted" ? (
                      <>
                        <Row sm="auto" className="p-0 m-1">
                          <Button
                            onClick={() =>
                              handleCallButtonClick(appointment._id)
                            }
                            variant="primary"
                            className="p-1 water-bg w-100"
                          >
                            <small>Start</small>
                          </Button>
                        </Row>
                        <Row sm="auto" className="p-0 m-1">
                          <AppointmentModalReject id={appointment._id} />
                        </Row>
                      </>
                    ) : appointment.status === "requested" ? (
                      <>
                        <Row sm="auto" className="p-0 m-1">
                          <AppointmentModalAccept id={appointment._id} />
                        </Row>
                        <Row sm="auto" className="p-0 m-1">
                          {/* <Button
                            onClick={() =>
                              handleRejectAppointment(appointment._id)
                            }
                            variant="outline-danger"
                            className="p-1 w-100"
                            >
                            <small>Reject</small>
                          </Button> */}
                          <AppointmentModalReject id={appointment._id} />
                        </Row>
                      </>
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Card>
    </>
  );
}

export default AppointmentList;
