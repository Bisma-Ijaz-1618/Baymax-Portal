import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import LineGraph from "./LineGraph";
const Dashboard = () => {
  return (
    <Container fluid className="py-4 p-2">
      <h2>View Sensor Time Lapse</h2>
      <Row className=" w-100 h-50 justify-content-center align-items-center">
        <Col lg={5} className=" flex-fill p-2">
          <Card>
            <Card.Header className="fire-bg text-center">
              Heart Rate
            </Card.Header>
            <Card.Body>
              <LineGraph />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} className=" flex-fill p-2">
          <Card>
            <Card.Header className="lightblue-bg text-center">SpO2</Card.Header>
            <Card.Body>
              <LineGraph />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className=" w-100 h-50 justify-content-center align-items-center">
        <Col lg={5} className=" flex-fill p-2">
          <Card>
            <Card.Header className="green-bg text-center">
              Temperature
            </Card.Header>
            <Card.Body>
              <LineGraph />
            </Card.Body>
          </Card>
        </Col>
        <Col lg={5} className=" flex-fill p-2" s>
          <Card>
            <Card.Header className="purple-bg text-center">
              Respiration Rate
            </Card.Header>
            <Card.Body>
              <LineGraph />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
