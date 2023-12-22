// auth-route.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

import Login from "../features/auth/Login";
import RequireAuth from "../hooks/requireAuthHook";
import { AuthProvider } from "../hooks/useAuthHook";
import PersistLogin from "../features/auth/PersistLogin";

import UserRoutes from "./user-routes";
import AdminRoutes from "./admin-routes";
import HospitalRoutes from "./hospital-routes";
import DoctorRoutes from "./doctor-routes";
import PatientRoutes from "./patient-routes";
const rolesData = {
  Admin: 5150,
  Doctor: 2003,
  Patient: 2002,
  Hospital: 2004,
  User: 2001,
};

const AuthRoute = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="login" element={<Login />} />
          <Route element={<RequireAuth allowedRoles={[rolesData.Admin]} />}>
            <Route path="admin/*" element={<AdminRoutes />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[rolesData.Hospital]} />}>
            <Route path="hospital/*" element={<HospitalRoutes />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[rolesData.Doctor]} />}>
            <Route path="doctor/*" element={<DoctorRoutes />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[rolesData.Patient]} />}>
            <Route path="patient/*" element={<PatientRoutes />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[rolesData.User]} />}>
            <Route path="user/*" element={<UserRoutes />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default AuthRoute;
