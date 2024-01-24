import React from "react";
import { Routes, Route } from "react-router-dom";
import DoctorDashLayout from "../features/doctor/DashBoard/DoctorDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";
import DataGrid from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import ViewPatients from "../features/doctor/PatientSettings/ViewPatientProfiles";
import ViewDoctors from "../features/doctor/DoctorSettings/ViewDoctorProfiles";
import ViewSchedule from "../features/doctor/ProfileSettings/Schedule";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route element={<DoctorDashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="users" element={<UsersList />} />
        </Route>
        <Route path="users" element={<UsersList />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="viewSchedule" element={<ViewSchedule />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        {/* <Route path="addDoctor" element={<AddUser userRole="Doctor" />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        <Route path="addDoctorProfile" element={<AddDoctorProfile />} /> */}
        <Route path="datagrid" element={<DataGrid />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DoctorRoutes;
