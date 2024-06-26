import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorDashLayout from "../features/doctor/DashBoard/DoctorDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";
import DataGrid from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import ViewPatients from "../features/doctor/PatientSettings/ViewPatientProfiles";
import ViewDoctors from "../features/doctor/DoctorSettings/ViewDoctorProfiles";
import ViewSchedule from "../features/doctor/ProfileSettings/Schedule/Schedule";
import ViewAppointments from "../features/doctor/ProfileSettings/Appointments/ViewAllAppointments";
import Messages from "../components/Messages/IndexDoctor";
import DashBaord from "../features/doctor/DoctorSettings/Dashboard";
import Invoices from "../features/doctor/ProfileSettings/Invoices/Invoices";
// import PateintProfile from "../features/doctor/viewPatientProfile";
import PatientProfile from "../components/Profiles/Patient/View/ViewPatientProfile";
import ChatBox from "../components/Messages/ChatBox1";
import Reviews from "../features/doctor/ProfileSettings/Reviews/Reviews";
import ViewMyProfile from "../features/doctor/ProfileSettings/Profile/ViewMyProfile";
import VideoConferenceDoctor from "./../components/VideoConference/VideoConferenceDoctor";
import AppointmentCall from "../components/VideoConference/AppointmentCallDoctor";
import RecordListPatient from "../components/Profiles/Patient/View/RecordListByPatientId";
import GraphContainer from "../components/Profiles/Patient/View/GraphContainer";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<DoctorDashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="users" element={<UsersList />} />
          <Route path="datagrid" element={<DataGrid />} />
        </Route>
        <Route path="users" element={<UsersList />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="viewSchedule" element={<ViewSchedule />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        <Route path="viewAllAppointments" element={<ViewAppointments />} />
        <Route path="messages" element={<Messages />}>
          <Route path=":peerId/:username" element={<ChatBox />} />{" "}
        </Route>
        <Route path="chatRoom" element={<VideoConferenceDoctor />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="viewPatientProfile/:id" element={<PatientProfile />} />
        <Route path="viewMyProfile" element={<ViewMyProfile />} />
        {/* <Route path="addDoctor" element={<AddUser userRole="Doctor" />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        <Route path="addDoctorProfile" element={<AddDoctorProfile />} /> */}
        <Route path="dashboard" element={<DashBaord />} />
        <Route path="records" element={<GraphContainer />} />
        <Route path="call/:id" element={<AppointmentCall />} />
        <Route path="AllRecords/:id" element={<RecordListPatient />} />
        <Route path="viewRecord/:recordId" element={<GraphContainer />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DoctorRoutes;
