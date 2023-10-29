import { Image, Accordion, Row, Col, Container } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom"; // Import Link from React Router
import AdminDashHeader from "./AdminDashHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { faEdit, faInbox, fadel } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../img/background.jpg";

function Example() {
  return (
    <Container fluid className="dash-nav-container">
      <Row>
        <Col className="dash-nav" lg={3}>
          <Row>
            <Col lg={"auto"}>
              <Image className="dash-img" fluid roundedCircle src={logo} />
            </Col>
            <Col lg={9} className="dash-heading d-flex align-items-center">
              <h3>Whitefox Apparel</h3>
            </Col>
          </Row>
          <Container className="link-item-container">
            <Link to="datagrid" className="link-item ">
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>All Items</h5>
              </span>
            </Link>
            <Link to="table" className="link-item ">
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>Table</h5>
              </span>
            </Link>
            <Link to="/item1" className="link-item ">
              <span className="link-item-icon">
                <FontAwesomeIcon icon={faEdit} />
              </span>
              <span className="link-item-text">
                <h5>links</h5>
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
                  <h5>links</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="/item1" className="link-item">
                    List Item 1
                  </Link>
                  <Link to="/item2" className="link-item">
                    List Item 2
                  </Link>
                  <Link to="/item3" className="link-item">
                    List Item 3
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="1"
              >
                <Accordion.Header className="transparent">
                  <h5>links</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="/item1" className="link-item">
                    List Item 1
                  </Link>
                  <Link to="/item2" className="link-item">
                    List Item 2
                  </Link>
                  <Link to="/item3" className="link-item">
                    List Item 3
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="2"
              >
                <Accordion.Header className="transparent">
                  <h5>links</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="/item1" className="link-item">
                    List Item 1
                  </Link>
                  <Link to="/item2" className="link-item">
                    List Item 2
                  </Link>
                  <Link to="/item3" className="link-item">
                    List Item 3
                  </Link>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item
                className="transparent"
                alwaysOpen={true}
                eventKey="3"
              >
                <Accordion.Header className="transparent">
                  <h5>links</h5>
                </Accordion.Header>
                <Accordion.Body className="transparent">
                  <Link to="/item1" className="link-item">
                    List Item 1
                  </Link>
                  <Link to="/item2" className="link-item">
                    List Item 2
                  </Link>
                  <Link to="/item3" className="link-item">
                    List Item 3
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
