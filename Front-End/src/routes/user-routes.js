import React from "react";
import { Routes, Route } from "react-router-dom";
import DashLayout from "../components/UserDashLayout";
import Welcome from "../features/auth/Welcome";
import UsersList from "../features/users/UsersList";

const UserRoutes = () => {
  return (
    <Routes>
      <Route element={<DashLayout />}>
        <Route index element={<Welcome />} />
      </Route>
    </Routes>
  );
};

export default UserRoutes;
