import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AppointmentList from "./AppointmentList"; // Importing AppointmentList
import useDoctorAppointmentsApi from "../../../../api/Doctor/patientAppointments";
import ErrorComponent from "../../../../components/General/Error";
import LoadingComponent from "../../../../components/General/Loading";

// ComponentB representing a container for AppointmentList
const ViewAllAppointments = () => {
  const {
    DoctorAcceptedAppointmentsQuery,
    DoctorCompletedAppointmentsQuery,
    DoctorRejectedAppointmentsQuery,
    DoctorRequestedAppointmentsQuery,
    allDoctorAppointmentsQuery,
  } = useDoctorAppointmentsApi();

  if (allDoctorAppointmentsQuery.isFetching) {
    return <LoadingComponent />;
  }
  if (allDoctorAppointmentsQuery.isError) {
    return <ErrorComponent message={""} />;
  }
  const convertedList = (InitilialList) => {
    console.log("List recieved", InitilialList);
    const convertedList = [];

    InitilialList.map((item) => {
      const newListItem = {
        value1: item.patientId.username, //username of patient
        value2: item.startTime, //date
        value3: item.startTime,
        value4: item.endTime,
      };
      convertedList.push(newListItem);
    });
    return convertedList || [];
  };
  const allAppointmentList = allDoctorAppointmentsQuery.isSuccess
    ? allDoctorAppointmentsQuery.data || []
    : [];
  const AcceptedAppointmentsList = DoctorAcceptedAppointmentsQuery.isSuccess
    ? DoctorAcceptedAppointmentsQuery.data || []
    : [];
  const CompletedAppointmentsList = DoctorCompletedAppointmentsQuery.isSuccess
    ? DoctorCompletedAppointmentsQuery.data || []
    : [];
  const RejectedAppointmentsList = DoctorRejectedAppointmentsQuery.isSuccess
    ? DoctorRejectedAppointmentsQuery.data || []
    : [];
  const RequestedAppointmentsList = DoctorRequestedAppointmentsQuery.isSuccess
    ? DoctorRequestedAppointmentsQuery.data || []
    : [];

  const totalAppointments = allAppointmentList.length || [];
  const totalAcceptedAppointments = AcceptedAppointmentsList.length || 0;
  const totalRejectedAppointments = RejectedAppointmentsList.length || 0;
  const totalRequestedAppointments = RequestedAppointmentsList.length || 0;
  const totalCompletedAppointments = CompletedAppointmentsList.length || 0;

  return (
    <Container>
      <Row>
        <h1>Your Appointments : {totalAppointments}</h1>
      </Row>
      <Row className="my-2">
        <Col className="col-md-12 my-3">
          <AppointmentList
            Array={convertedList(AcceptedAppointmentsList)}
            Title={"Appointments Pending"}
            Length={totalAcceptedAppointments}
            isHorizontal={true}
          />
        </Col>
        <Col className="col-md-12 my-3">
          <AppointmentList
            Array={convertedList(RequestedAppointmentsList)}
            Title={"Appointment Requests"}
            Lenght={totalRequestedAppointments}
            isHorizontal={true}
          />
        </Col>
        <Col className="col-md-12 my-3">
          <AppointmentList
            Array={convertedList(CompletedAppointmentsList)}
            Title={"Appointmnets Completed"}
            Length={totalCompletedAppointments}
            isHorizontal={true}
          />
        </Col>
        <Col className="col-md-12 my-3">
          <AppointmentList
            Array={convertedList(RejectedAppointmentsList)}
            Title={"Appointmnets Rejected"}
            Lenght={totalRejectedAppointments}
            isHorizontal={true}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewAllAppointments;
