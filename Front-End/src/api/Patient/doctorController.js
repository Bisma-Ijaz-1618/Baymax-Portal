import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery, QueryClient } from "@tanstack/react-query";

const useDoctorApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getAllDoctors = useQuery({
    queryKey: ["allDoctors"],
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get("/Doctors/allDoctors");
        return response.data || [];
      } catch (error) {
        throw new Error("Failed to fetch doctors");
      }
    },
    onSuccess: (data) => {
      console.log("allDoctors query data", data);
    },
  });
  const getMyDoctors = useQuery({
    queryKey: ["myDocotrs"],
    retry: 1,
    enabled: false,
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get("/Doctors/allDoctors");
        return response.data || [];
      } catch (error) {
        throw new Error("Failed to fetch doctors");
      }
    },
    onSuccess: (data) => {
      console.log("myDoctors query data", data);
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

  const GetProfile = useQuery({
    queryKey: ["profileData"],
    queryFn: () => axiosPrivate.get("Doctors/MyProfile"),
    onSuccess: (data) => {
      console.log("here is the dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);
    },
  });
  return {
    getAllDoctors,
    getMyDoctors,
  };
};

export default useDoctorApi;
