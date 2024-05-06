import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import WeeklyReport from "./WeeklyReport";
import SmallDashCalendar from "./SmallDashCalendar";
import AppointmentList from "./AppointmentListDoctor";
import usePatientControllerApi from "../../../api/Doctor/patientController";
import UsersTable from "./PatientsTable";
import useDoctorAppointmentsApi from "../../../api/Doctor/doctorAppointments";
import ErrorComponent from "../../../components/General/Error";
import LoadingComponent from "../../../components/General/Loading";

const DoctorDashboard = () => {
  return (
    <Container fluid className="mb-5">
      <Row>
        <Col sm={8}>
          <Row className="my-3">
            <h3>Welcome, Dr. Bisma</h3>
            <h6 className="text-muted">Have a great day at work!</h6>
          </Row>
          <WeeklyReport />
        </Col>
        <Col
          sm={4}
          className="my-3 border rounded white-bg d-flex flex-column align-items-center justify-content-center"
        >
          <SmallDashCalendar allEvents={[]} />
        </Col>
      </Row>

      <Row className="px-0 d-flex flex-row align-items-stretch justify-content-center">
        <Col sm={8} className=" pl-2 pr-1 m-0">
          <div className="h-100 border rounded white-bg">
            <UsersTable
              headers={["username", "email", "bloodGroup"]}
              noOfItems={3}
            />
          </div>
        </Col>
        <Col sm={4} className="p-0 border rounded white-bg">
          <AppointmentList />
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
