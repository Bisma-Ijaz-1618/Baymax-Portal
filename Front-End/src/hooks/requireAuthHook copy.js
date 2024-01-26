import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "./useAuthHook";

const RequireAuthHook = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();
  if (auth?.roles?.find((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  } else if (auth?.username) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

export default RequireAuthHook;
