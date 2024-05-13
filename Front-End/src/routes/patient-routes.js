import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientDashLayout from "../features/patient/DashBoard/PatientDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";
import DataGrid from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import ViewPatients from "../features/patient/PatientSettings/ViewPatientProfiles";
import KitConnection from "../features/patient/PatientSettings/kitConnection";
import ViewDoctors from "../features/patient/DoctorSettings/ViewDoctorProfiles";
import SearchSlot from "../features/patient/ProfileSettings/Appointments/SearchSlot";
import BookAppointment from "../features/patient/ProfileSettings/Appointments/BookAppointment";
import ViewAppointments from "../features/patient/ProfileSettings/Appointments/ViewAppointments";
import Invoices from "../features/patient/ProfileSettings/Invoices/Invoices";
import Sensors from "../features/patient/ProfileSettings/BaymaxKit/Sensors";
import RecordHistory from "../features/patient/ProfileSettings/BaymaxKit/RecordHistory";
import Record from "../features/patient/ProfileSettings/BaymaxKit/Record";
import RecordList from "../features/patient/PatientSettings/RecordList";
import DashBoard from "../features/patient/DoctorSettings/Dashboard";
import VideoConferencePatient from "./../components/VideoConference/VideoConferencePatient";
import Messages from "../components/Messages/IndexPatient";
import DoctorProfile from "../components/Profiles/Doctor/View/ViewDoctorProfile";
import GraphContainer from "../features/patient/PatientSettings/GraphContainer";
import AppointmentCall from "../components/VideoConference/AppointmentCallPatient";
import ChatBox from "../components/Messages/ChatBox1";
import { Patient123 } from "../Config/Agora";
const PatientRoutes = () => {
  return (
    <Routes>
      <Route element={<PatientDashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="users" element={<UsersList />} />
        </Route>
        <Route path="users" element={<UsersList />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        <Route path="searchSlot" element={<SearchSlot />} />
        <Route path="bookAppointment" element={<BookAppointment />} />
        <Route path="bookAppointment" element={<BookAppointment />} />
        <Route path="viewAppointments" element={<ViewAppointments />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="sensors" element={<Sensors />} />
        <Route path="recordHistory" element={<RecordHistory />} />
        <Route path="record" element={<Record />} />
        <Route path="recordList" element={<RecordList />} />
        <Route path="messages" element={<Messages />}>
          <Route path=":PeerId/:username" element={<ChatBox />} />
        </Route>
        <Route path="chatRoom" element={<VideoConferencePatient />} />
        <Route path="kitConnection" element={<KitConnection />} />
        {/* <Route path="addPatient" element={<AddUser userRole="Patient" />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="addPatientProfile" element={<AddPatientProfile />} /> */}
        <Route path="datagrid" element={<DataGrid />} />
        <Route path="viewRecord/:recordId" element={<GraphContainer />} />
        <Route path="viewDoctorProfile/:id" element={<DoctorProfile />} />
        <Route path="call/:id" element={<AppointmentCall />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PatientRoutes;
