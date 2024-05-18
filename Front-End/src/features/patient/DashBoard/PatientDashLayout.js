import { Image, Accordion, Row, Col, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom"; // Import Link from React Router
import PatientDashHeader from "./PatientDashHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { faEdit, faInbox, fadel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../img/LogoHorizontal.jpeg";
import { useLocation } from "react-router-dom";
function Example() {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Container fluid className="dash-nav-container">
      <Row>
        <Col className="dash-nav" lg={2}>
          <Row>
            <Col lg={"auto"}>
              <Image className="dash-img" fluid src={logo} />
            </Col>
          </Row>
          <Container className="link-item-container">
            <Link
              to="welcome"
              className={
                currentPath.includes("welcome")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Welcome</h5>
              </span>
            </Link>
            <Link
              to="dashboard"
              className={
                currentPath.includes("dashboard")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Dashboard</h5>
              </span>
            </Link>

            <Link
              to="searchSlot"
              className={
                currentPath.includes("searchSlot")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Book Appointment</h5>
              </span>
            </Link>
            <Link
              to="viewAppointments"
              className={
                currentPath.includes("viewAppointments")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Appointments</h5>
              </span>
            </Link>
            <Link
              to="kitConnection"
              className={
                currentPath.includes("kitConnection")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Kit Connection</h5>
              </span>
            </Link>
            <Link
              to="recordList"
              className={
                currentPath.includes("recordList")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>All Records</h5>
              </span>
            </Link>
            <Link
              to="viewAllDoctors"
              className={
                currentPath.includes("viewAllDoctors")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Doctors</h5>
              </span>
            </Link>
            <Link
              to="viewAllPatients"
              className={
                currentPath.includes("viewAllPatients")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Patients</h5>
              </span>
            </Link>
            <Link
              to="invoices"
              className={
                currentPath.includes("item1") ? "active link-item" : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Invoices</h5>
              </span>
            </Link>
            <Link
              to="messages"
              className={
                currentPath.includes("messages")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Messages</h5>
              </span>
            </Link>
            <Link
              to="chatRoom"
              className={
                currentPath.includes("chaRoom")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Chat Room</h5>
              </span>
            </Link>
            <Link
              to="myProfile"
              className={
                currentPath.includes("myProfile")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Profile</h5>
              </span>
            </Link>
          </Container>
          <Container>
            <Accordion flush className="">
              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="0"
              >
                <Accordion.Header className="transparent">
                  <Link>
                    <h5 className="link-item">Kit Connection</h5>
                  </Link>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link
                    to="sensors"
                    className={
                      currentPath.includes("sensors")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Connect Sensors
                  </Link>
                  <Link
                    to="recordHistory"
                    className={
                      currentPath.includes("recordHistory")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Record History
                  </Link>
                  <Link
                    to="editPatientProfile"
                    className={
                      currentPath.includes("editPatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Edit Account
                  </Link>
                  <Link
                    to="deletePatientProfile"
                    className={
                      currentPath.includes("deletePatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Delete Account{" "}
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="1"
              >
                <Accordion.Header className="transparent">
                  <Link>
                    <h5 className="link-item">Patients</h5>
                  </Link>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link
                    to="viewAllPatients"
                    className={
                      currentPath.includes("viewAllPatients")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    View All
                  </Link>
                  <Link
                    to="addPatient"
                    className={
                      currentPath.includes("addPatient")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Add Account
                  </Link>
                  <Link
                    to="editPatientProfile"
                    className={
                      currentPath.includes("editPatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Edit Account
                  </Link>
                  <Link
                    to="deletePatientProfile"
                    className={
                      currentPath.includes("deletePatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Delete Account{" "}
                  </Link>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="2"
              >
                <Accordion.Header className="transparent">
                  <Link>
                    <h5 className="link-item">Doctors</h5>
                  </Link>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link
                    to="viewAllPatients"
                    className={
                      currentPath.includes("viewAllPatients")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    View All
                  </Link>
                  <Link
                    to="addPatient"
                    className={
                      currentPath.includes("addPatient")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Add Account
                  </Link>
                  <Link
                    to="addPatientProfile"
                    className={
                      currentPath.includes("addPatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Edit Account
                  </Link>
                  <Link to="/item3" className="link-item">
                    Delete Account{" "}
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="3"
              >
                <Accordion.Header className="transparent">
                  <Link>
                    <h5 className="link-item">Appointments</h5>
                  </Link>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="/item1" className="link-item">
                    View All{" "}
                  </Link>
                  <Link to="./searchSlot" className="link-item">
                    Search Free Slot{" "}
                  </Link>
                  <Link to="./bookAppointment" className="link-item">
                    Add Appointment{" "}
                  </Link>
                  <Link to="/item3" className="link-item">
                    Delete Appointment
                  </Link>
                  <Link to="/item3" className="link-item">
                    Edit Appointment
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Col>
        <Col className="dash-content water-color" lg={10}>
          <>
            <PatientDashHeader />
          </>

          <Row className="white-bg">
            <Col>
              <Container>
                <Outlet />
              </Container>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Example;
