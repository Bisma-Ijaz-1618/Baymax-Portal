import React from "react";
import { Routes, Route } from "react-router-dom";
import HospitalDashLayout from "../features/hospital/DashBoard/HospitalDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";
import AddUser from "../features/hospital/AddUser";
import DataGrid from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import ViewPatients from "../features/hospital/PatientSettings/ViewPatientProfiles";
import EditPatient from "../features/hospital/PatientSettings/EditPatientProfile";
import EditDoctor from "../features/hospital/DoctorSettings/EditDoctorProfile";
import ViewDoctors from "../features/hospital/DoctorSettings/ViewDoctorProfiles";
import Test from "../components/Test";
import RegPateint from "../features/auth/RegPatient";
const HospitalRoutes = () => {
  return (
    <Routes>
      <Route element={<HospitalDashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="users" element={<UsersList />} />
        </Route>
        <Route path="users" element={<UsersList />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="addPatient" element={<AddUser userRole="Patient" />} />
        {/* <Route path="addPatient" element={<RegPateint />} /> */}
        <Route path="editPatientProfile" element={<EditPatient />} />
        <Route path="deletePatientProfile" element={<ViewPatients />} />
        <Route path="test" element={<Test />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        <Route path="addDoctor" element={<AddUser userRole="Doctor" />} />
        <Route path="editDoctorProfile" element={<EditDoctor />} />
        <Route path="deleteDoctorProfile" element={<ViewDoctors />} />
        {/* <Route path="addHospital" element={<AddUser userRole="Hospital" />} />
        <Route path="viewAllHospitals" element={<ViewHospitals />} />
        <Route path="addHospitalProfile" element={<AddHospitalProfile />} /> */}
        <Route path="datagrid" element={<DataGrid />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default HospitalRoutes;
