import { Image, Accordion, Row, Col, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom"; // Import Link from React Router
import DoctorDashHeader from "./DoctorDashHeader";
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
        <Col className="dash-nav" lg={3}>
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
              to="datagrid"
              className={
                currentPath.includes("datagrid")
                  ? "active link-item"
                  : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>DashBoard</h5>
              </span>
            </Link>
            <Link
              to="viewSchedule"
              className={
                currentPath.includes("table") ? "active link-item" : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Schedule</h5>
              </span>
            </Link>
            <Link
              to="item1"
              className={
                currentPath.includes("item1") ? "active link-item" : "link-item"
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
              to="item1"
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
              to="item1"
              className={
                currentPath.includes("item1") ? "active link-item" : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Reviews</h5>
              </span>
            </Link>
            <Link
              to="item1"
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
                  ></Link>
                  <Link
                    to="editPatientProfile"
                    className={
                      currentPath.includes("editPatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Urgent
                  </Link>
                  <Link
                    to="deletePatientProfile"
                    className={
                      currentPath.includes("deletePatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Regular{" "}
                  </Link>
                  <Link
                    to="deletePatientProfile"
                    className={
                      currentPath.includes("deletePatientProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Cancelled{" "}
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
                    <h5 className="link-item">Profile</h5>
                  </Link>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link
                    to="viewAllDoctors"
                    className={
                      currentPath.includes("viewAllDoctors")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    View
                  </Link>
                  <Link
                    to="addDoctor"
                    className={
                      currentPath.includes("addDoctor")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Education
                  </Link>
                  <Link
                    to="addDoctor"
                    className={
                      currentPath.includes("addDoctor")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Experience
                  </Link>
                  <Link
                    to="addDoctor"
                    className={
                      currentPath.includes("addDoctor")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Specialization
                  </Link>
                  <Link
                    to="editDoctorProfile"
                    className={
                      currentPath.includes("editDoctorProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Password Settings
                  </Link>
                  <Link
                    to="deleteDoctorProfile"
                    className={
                      currentPath.includes("deleteDoctorProfile")
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
                    <h5 className="link-item">Appointments</h5>
                  </Link>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link
                    to="viewAllDoctors"
                    className={
                      currentPath.includes("viewAllDoctors")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    View All
                  </Link>
                  <Link
                    to="addDoctor"
                    className={
                      currentPath.includes("addDoctor")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Urgent
                  </Link>
                  <Link
                    to="addDoctorProfile"
                    className={
                      currentPath.includes("addDoctorProfile")
                        ? "active link-item"
                        : "link-item"
                    }
                  >
                    Regular
                  </Link>
                  <Link to="/item3" className="link-item">
                    Reschedule{" "}
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

                  <Link to="/item1" className="link-item">
                    Urgent{" "}
                  </Link>
                  <Link to="/item1" className="link-item">
                    Regular{" "}
                  </Link>
                  <Link to="/item2" className="link-item">
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
        <Col className="dash-content" lg={9}>
          <Row>
            <Col>
              <Container>
                <DoctorDashHeader />
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Outlet />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Example;
