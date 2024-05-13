import { useQuery } from "@tanstack/react-query";

import UsersTable from "../../doctor/UsersTable";
import useDoctorApi from "../../../api/doctor";
const Doctors = () => {
  const { getDoctors } = useDoctorApi();

  const DoctorQuery = useQuery({
    queryKey: ["Doctors"],
    queryFn: getDoctors,
  });

  if (DoctorQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (DoctorQuery.isError) {
    return <div>Error: {DoctorQuery.error.message}</div>;
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
        data={DoctorQuery.data}
        userRole={"Doctor"}
      />
    </div>
  );
};

export default Doctors;
