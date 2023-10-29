import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashLayout from "../features/admin/DashBoard/AdminDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";
import AddUser from "../features/admin/AddUser";
import DataGrid from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import ViewPatients from "../features/admin/PatientSettings/ViewPatientProfiles";
import EditPatient from "../features/admin/PatientSettings/EditPatientProfile";
import EditDoctor from "../features/admin/DoctorSettings/EditDoctorProfile";
import ViewDoctors from "../features/admin/DoctorSettings/ViewDoctorProfiles";
import Test from "../components/Test";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={<AdminDashLayout />}>
        <Route index element={<Welcome />} />
        <Route path="welcome" element={<Welcome />}>
          <Route path="users" element={<UsersList />} />
        </Route>
        <Route path="users" element={<UsersList />} />
        <Route path="viewAllPatients" element={<ViewPatients />} />
        <Route path="addPatient" element={<AddUser userRole="Patient" />} />
        <Route path="editPatientProfile" element={<EditPatient />} />
        <Route path="deletePatientProfile" element={<ViewPatients />} />
        <Route path="test" element={<Test />} />
        <Route path="viewAllDoctors" element={<ViewDoctors />} />
        <Route path="addDoctor" element={<AddUser userRole="Doctor" />} />
        <Route path="editDoctorProfile" element={<EditDoctor />} />
        <Route path="deleteDoctorProfile" element={<ViewDoctors />} />
        {/* <Route path="addAdmin" element={<AddUser userRole="Admin" />} />
        <Route path="viewAllAdmins" element={<ViewAdmins />} />
        <Route path="addAdminProfile" element={<AddAdminProfile />} /> */}
        <Route path="datagrid" element={<DataGrid />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
