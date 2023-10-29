import useAxiosPrivate from "../hooks/useAxiosPrivate";

const usePatientApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getPatients = async () => {
    try {
      const response = await axiosPrivate.get("/Patients/allPatients");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch patients");
    }
  };

  const addPatient = async (patientData) => {
    try {
      const response = await axiosPrivate.post("/Patients", patientData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add patient");
    }
  };

  const updatePatient = async (patientData) => {
    try {
      const response = await axiosPrivate.patch(
        `/Patients/updatePatient/${patientData.id}`,
        patientData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update patient");
    }
  };

  const deletePatientProfile = async ({ id }) => {
    try {
      const response = await axiosPrivate.delete(
        `Patients/deletePatient/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete patient");
    }
  };
  const getPatientProfile = async ({ id }) => {
    try {
      const response = await axiosPrivate.get(`Patients/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get patient");
    }
  };

  return {
    getPatients,
    addPatient,
    updatePatient,
    deletePatientProfile,
    getPatientProfile,
  };
};

export default usePatientApi;
