// auth-route.js
import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../features/auth/Login";
import RequireAuth from "../hooks/requireAuthHook";

import UserRoutes from "./user-routes";
import AdminRoutes from "./admin-routes";
import { AuthProvider } from "../hooks/useAuthHook";
import PersistLogin from "../features/auth/PersistLogin";
const rolesData = {
  Admin: 5150,
  User: 2001,
};

const AuthRoute = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[rolesData.Admin]} />}>
            <Route path="admin/*" element={<AdminRoutes />} />
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
