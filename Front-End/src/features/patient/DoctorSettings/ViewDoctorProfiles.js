import { useQuery } from "@tanstack/react-query";

import UsersTable from "../UsersTable";
import useDoctorApi from "../../../api/doctor";
const Doctors = () => {
  const { allDoctorsQuery } = useDoctorApi();

  if (allDoctorsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (allDoctorsQuery.isError) {
    return <div>Error: {allDoctorsQuery.error.message}</div>;
  }
  const headers = [
    "username",
    "email",
    "age",
    "department",
    "gender",
    "workLocation",
  ];
  return (
    <div>
      <h1>All Doctors</h1>
      <UsersTable
        headers={headers}
        data={allDoctorsQuery.data}
        userRole={"Doctor"}
      />
    </div>
  );
};

export default Doctors;
