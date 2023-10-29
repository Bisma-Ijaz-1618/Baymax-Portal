// auth-route.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Public from "../components/Public";
import Register from "../features/auth/Register";
import DataList from "../features/data/DataGrid";
import NotFound from "../components/NotFound";

const rolesData = {
  Admin: 5150,
  User: 2001,
};

const NonAuthRoute = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="/" element={<Layout />}>
        <Route path="data" element={<DataList />} />
        <Route index element={<Public />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NonAuthRoute;
