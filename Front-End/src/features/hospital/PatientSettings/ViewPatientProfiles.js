import { useQuery } from "@tanstack/react-query";

import UsersTable from "../../doctor/UsersTable";
import usePatientApi from "../../../api/patient";
const Patients = () => {
  const { getPatients } = usePatientApi();

  const PatientQuery = useQuery({
    queryKey: ["Patients"],
    queryFn: getPatients,
  });

  if (PatientQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (PatientQuery.isError) {
    return <div>Error: {PatientQuery.error.message}</div>;
  }
  const headers = ["username", "email", "age", "bloodGroup", "gender"];
  return (
    <div>
      <h1>All Patients</h1>
      <UsersTable
        headers={headers}
        data={PatientQuery.data}
        userRole={"Patient"}
      />
    </div>
  );
};

export default Patients;
