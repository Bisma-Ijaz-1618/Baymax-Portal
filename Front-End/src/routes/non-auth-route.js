// auth-route.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Public from "../components/Public";
import Register from "../features/auth/Register";
import RegType from "../features/auth/RegType";
import RegHospital from "../features/auth/RegHospital";
import RegDoctor from "../features/auth/RegDoctor";
import RegPatient from "../features/auth/RegPatient";
import DataList from "../features/data/DataGrid";
import NotFound from "../components/NotFound";
import Login from "../features/auth/Login";

const NonAuthRoute = () => {
  return (
    <Routes>
      <Route path="/register">
        <Route path="hospital" element={<RegHospital />} />
        <Route path="doctor" element={<RegDoctor />} />
        <Route path="patient" element={<RegPatient />} />
        <Route index element={<RegType />} />
      </Route>
      <Route path="/regtype" element={<RegType />} />
      <Route path="/login" element={<Login />} />
      <Route path="/regtype" element={<RegType />} />
      <Route path="/" element={<Layout />}>
        <Route path="data" element={<DataList />} />
        <Route index element={<Public />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NonAuthRoute;
