import { Image, Accordion, Row, Col, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom"; // Import Link from React Router
import AdminDashHeader from "./AdminDashHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { faEdit, faInbox, fadel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../../img/background.jpg";
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
              <Image className="dash-img" fluid roundedCircle src={logo} />
            </Col>
            <Col lg={9} className="dash-heading d-flex align-items-center">
              <h3>Baymax Portal</h3>
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
                <h5>Account Summary</h5>
              </span>
            </Link>
            <Link
              to="table"
              className={
                currentPath.includes("table") ? "active link-item" : "link-item"
              }
            >
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Doctors Summary</h5>
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
                <h5>Patients Summary</h5>
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
                  <h5>Patients</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="viewAllPatients" className="link-item">
                    View All
                  </Link>
                  <Link to="addPatient" className="link-item">
                    Add Account
                  </Link>
                  <Link to="editPatientProfile" className="link-item">
                    Edit Account
                  </Link>
                  <Link to="deletePatientProfile" className="link-item">
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
                  <h5>Doctors</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="viewAllDoctors" className="link-item">
                    View All
                  </Link>
                  <Link to="addDoctor" className="link-item">
                    Add Account
                  </Link>
                  <Link to="editDoctorProfile" className="link-item">
                    Edit Account
                  </Link>
                  <Link to="deleteDoctorProfile" className="link-item">
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
                  <h5>Admins</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="viewAllAdmins" className="link-item">
                    View All
                  </Link>
                  <Link to="addAdmin" className="link-item">
                    Add Account
                  </Link>
                  <Link to="addAdminProfile" className="link-item">
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
                  <h5>Appointments</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="/item1" className="link-item">
                    View All{" "}
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
                <AdminDashHeader />
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
