import { Outlet } from "react-router-dom";
import DashHeader from "./UserDashHeader";
import DashFooter from "./UserDashFooter";

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-container">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};
export default DashLayout;
