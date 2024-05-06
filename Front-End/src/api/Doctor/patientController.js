import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery, QueryClient } from "@tanstack/react-query";

const usePatientApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getAllPatients = useQuery({
    queryKey: ["allPatients"],
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get("/Patients/allPatients");
        return response.data || [];
      } catch (error) {
        throw new Error("Failed to fetch patients");
      }
    },
    onSuccess: (data) => {
      console.log("allPateints query data", data);
    },
  });
  const getMyPatients = useQuery({
    queryKey: ["myPatients"],
    retry: 1,
    enabled: false,
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get("/Patients/allPatients");
        return response.data || [];
      } catch (error) {
        throw new Error("Failed to fetch patients");
      }
    },
    onSuccess: (data) => {
      console.log("myPateints query data", data);
    },
  });

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
  const createAppointment = async (appointmentData) => {
    try {
      const response = await axiosPrivate.post(
        "Patients/Appointment/new",
        appointmentData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to create appointment");
    }
  };
  return {
    getAllPatients,
    getMyPatients,
  };
};

export default usePatientApi;
