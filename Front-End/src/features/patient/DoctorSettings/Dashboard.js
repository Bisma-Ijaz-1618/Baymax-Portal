import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import WeeklyReport from "./WeeklyReport";
import AppointmentList from "./AppointmentListPatient";
import UsersTable from "./DoctorsTable";
import BMIComponent from "./BMICalculator/Index";
import RecordBars from "./RecordBars";
const DoctorDashboard = () => {
  return (
    <Container fluid className="mb-5">
      <Row className="align-items-stretch">
        <Col sm={8}>
          <Row className="my-3">
            <h3>Welcome Bisma,</h3>
            <h6 className="text-muted">Have a Great and Healthy Day!</h6>
          </Row>
          <WeeklyReport />
        </Col>
        <Col sm={4} className=" my-3 p-0 rounded white-bg">
          <BMIComponent />
        </Col>
      </Row>
      <Row className="align-items-stretch">
        <Col sm={8} className="">
          <RecordBars />
          <UsersTable headers={["username", "email", "age"]} noOfItems={3} />
        </Col>

        <Col sm={4} className="p-0 border rounded white-bg">
          <AppointmentList />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
