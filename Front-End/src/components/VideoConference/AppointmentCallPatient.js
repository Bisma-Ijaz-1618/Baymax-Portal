import {
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDoctorAppointmentsApi from "../../api/Doctor/patientAppointments";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import ErrorComponent from "../General/Error";
import LoadingComponent from "../General/Loading";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {
  parseFormattedStartTime,
  formatStartTime,
  isCurrentTimeInRange,
  isStartTimeGreaterThanCurrentTime,
} from "../../utils/dateUtil";
import { FaPhone } from "react-icons/fa";
const AttendCallScreen = ({ id }) => {
  const [arrowIndex, setArrowIndex] = useState(0); // Define arrowIndex state
  const navigate = useNavigate();
  const handleAttend = () => {
    navigate("/auth/patient/chatRoom");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      // Increment arrow ibndex, and reset to 0 if it exceeds 2 (total number of arrows)
      setArrowIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 300); // Change arrow every 2 seconds (adjust as needed)

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const { UpdateAppointmentMutation, allDoctorAppointmentsQuery } =
    useDoctorAppointmentsApi();
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (
      allDoctorAppointmentsQuery.isSuccess &&
      allDoctorAppointmentsQuery.data
    ) {
      const filteredData = allDoctorAppointmentsQuery.data.filter(
        (appointment) => {
          return appointment._id === id;
        }
      );
      setSelectedAppointment(filteredData[0]);
    }
  }, [allDoctorAppointmentsQuery.isSuccess, allDoctorAppointmentsQuery.data]);

  console.log("in attend call component");
  if (allDoctorAppointmentsQuery.isError) {
    return <ErrorComponent message={"Cnat Fetch Appointment Data"} />;
  }
  if (allDoctorAppointmentsQuery.isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Container fluid>
      <Row className="my-5">
        {selectedAppointment ? (
          <Container className="px-5 m-auto">
            <Card className=" text-left mx-5">
              <Card.Header className="white-bg">
                {console.log(selectedAppointment)}
                <h3>Your Appointment</h3>
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <Row className="jutify-content-stretch">
                    <Col>
                      <ListGroup variant="font-size-small flush py-1 px-1">
                        <ListGroup.Item className="border rounded m-1 p-1">
                          <Row className="m-0 px-0 d-flex flex-row align-items-center justify-content-start text-left">
                            <Col md="auto" className="list-icon-holder p-0 m-0">
                              <Image
                                src={
                                  "https://randomuser.me/api/portraits/women/1.jpg"
                                }
                                roundedCircle
                                className=" m-0 water-color"
                                style={{ width: "100px", height: "100px" }}
                              />
                            </Col>
                            <Col className="mx-2">
                              <strong className="p-0 m-0">
                                {selectedAppointment?.patientId?.username ||
                                  "Bisma Ijaz"}
                              </strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="border rounded m-1 p-1">
                          <Row className="m-0 px-0 d-flex flex-row align-items-center justify-content-start text-left">
                            <Col md="auto" className="list-icon-holder p-0 m-0">
                              <Image
                                src={
                                  "https://randomuser.me/api/portraits/men/1.jpg"
                                }
                                style={{ width: "100px", height: "100px" }}
                                roundedCircle
                                className=" m-0 water-color"
                              />{" "}
                            </Col>
                            <Col className="mx-2">
                              <strong className="p-0 m-0">
                                {selectedAppointment?.doctorId?.username ||
                                  "Vimal Bhatia"}
                              </strong>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                    <Col className="text-center">
                      <ListGroup className=" h-100 font-size-small flush py-2 px-1">
                        <ListGroup.Item className="h-100 m-auto border rounded d-flex flex-column justify-content-center align-items-center">
                          <large>
                            Date :{" "}
                            {" " +
                              formatStartTime(selectedAppointment.startTime)
                                .date}
                          </large>
                          Start Time :
                          {"" +
                            formatStartTime(selectedAppointment.startTime).time}
                          <br />
                          EndTime :{" "}
                          {" " +
                            formatStartTime(selectedAppointment.endTime).time}
                          <Card.Text>
                            {isStartTimeGreaterThanCurrentTime(
                              selectedAppointment.startTime
                            ) ? (
                              <h5 className="water-color">
                                {" "}
                                Link for your appointment will be available at{" "}
                                {
                                  formatStartTime(selectedAppointment.startTime)
                                    .time
                                }
                              </h5>
                            ) : isCurrentTimeInRange(
                                selectedAppointment.startTime
                              ) ? (
                              <Container className=" w-100 justify-content-center align-items-ceter">
                                <Row className="mx-auto arrows d-flex flex-row m-2 align-items-center justify-content-between">
                                  {/* Render arrows based on the current arrow index */}
                                  {Array.from({ length: 3 }, (_, i) => (
                                    <Col
                                      key={i}
                                      className={`green-color arrow left ${
                                        i === arrowIndex ? "active" : ""
                                      }`}
                                    ></Col>
                                  ))}
                                  <Col>
                                    <Button
                                      onClick={handleAttend}
                                      className="m-0 p-1 green-bg white-color call-button"
                                    >
                                      <FaPhone />
                                    </Button>
                                  </Col>
                                  {Array.from({ length: 3 }, (_, i) => (
                                    <Col
                                      key={i}
                                      className={`green-color arrow ${
                                        i === arrowIndex ? "active" : ""
                                      }`}
                                    ></Col>
                                  )).reverse()}
                                </Row>
                              </Container>
                            ) : (
                              <>
                                <Container className=" fire-color w-100 justify-content-center align-items-ceter">
                                  <h5> You missed your appointment! </h5>
                                </Container>
                              </>
                            )}
                          </Card.Text>
                        </ListGroup.Item>
                      </ListGroup>
                    </Col>
                  </Row>
                </Card.Title>
              </Card.Body>
              <Card.Footer className="text-muted text-center">
                Make sure to turn your camera and microphone on
              </Card.Footer>
            </Card>
          </Container>
        ) : (
          <div>
            {console.log("we got no appointment")}
            {/* Render content when Appointment is undefined or null */}
          </div>
        )}
      </Row>
    </Container>
  );
};
function App() {
  console.log("in attend call component");
  const { id } = useParams();
  const [showContainer, setShowContainer] = useState(false);
  return <AttendCallScreen id={id} />;
}

export default App;
