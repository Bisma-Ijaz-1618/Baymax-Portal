import React from "react";
import { Routes, Route } from "react-router-dom";
import PatientDashLayout from "../features/patient/DashBoard/PatientDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";
import DataGrid from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import ViewPatients from "../features/patient/PatientSettings/ViewPatientProfiles";
import ViewDoctors from "../features/patient/DoctorSettings/ViewDoctorProfiles";

const PatientRoutes = () => {
  return (
    <Routes>
      <Route element={<PatientDashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="users" element={<UsersList />} />
        </Route>
        <Route path="users" element={<UsersList />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        {/* <Route path="addPatient" element={<AddUser userRole="Patient" />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="addPatientProfile" element={<AddPatientProfile />} /> */}
        <Route path="datagrid" element={<DataGrid />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PatientRoutes;
