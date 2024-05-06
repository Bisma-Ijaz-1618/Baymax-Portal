import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery, QueryClient } from "@tanstack/react-query";
const useDoctorApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const allDoctorAppointmentsQuery = useQuery({
    queryFn: () => axiosPrivate.get("Doctors/Appointments/all"),
    onSuccess: (data) => {
      console.log("here is the data", data);
    },
  });
  const Query = useQuery({
    queryFn: () => axiosPrivate.get("Doctors/Appointments/all"),
    onSuccess: (data) => {
      console.log("here is the data", data);
    },
  });
  const getAllAppointments = async () => {
    try {
      const response = await axiosPrivate.get("/Appointments/all");
      return response.data;
    } catch (error) {
      throw new Error("Failed to get appointments");
    }
  };
  const getAppointmentsByUserId = async (userId) => {
    try {
      const response = await axiosPrivate.get(`/Appointments/all/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get all appointments");
    }
  };
  const getDoctorListWithSchedule = async () => {
    try {
      const response = await axiosPrivate.get("/Doctors/doctorSimplifiedList");
      console.log("LISTTTTTTTTTT", response.data);
      console.log("LISTTTTTTTTTT", response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch doctor profiles");
    }
  };
  const getDoctors = async () => {
    try {
      const response = await axiosPrivate.get("/Doctors/allDoctors");
      console.log("Profiles", response.data);
      console.log("PROOOOOOOOOO", response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch doctors");
    }
  };

  const addDoctor = async (doctorData) => {
    try {
      const response = await axiosPrivate.post("/Doctors", doctorData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add doctor");
    }
  };
  const updateDoctor = async (DoctorData) => {
    try {
      const response = await axiosPrivate.patch(
        `/Doctors/updateDoctor/${DoctorData.id}`,
        DoctorData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update Doctor");
    }
  };

  const deleteDoctorProfile = async ({ id }) => {
    try {
      const response = await axiosPrivate.delete(`Doctors/deleteDoctor/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete Doctor");
    }
  };
  const getDoctorProfile = async ({ id }) => {
    try {
      const response = await axiosPrivate.get(`Doctors/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get Doctor");
    }
  };
  // Similar update and delete methods here for doctors
  const addEvent = async (newEvent) => {
    try {
      console.log("add event doctorID", newEvent);
      const response = await axiosPrivate.post(`Doctors/Calendar/addEvent`, {
        newEvent,
      });
      console.log("RESPONSE TO ADD EVENT ", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add event");
    }
  };

  const getEventList = async () => {
    try {
      console.log("get event doctorID");
      const response = await axiosPrivate.get(`Doctors/Calendar/getEventList`);
      console.log("event list?", response.data.events);
      return response.data.events;
    } catch (error) {
      throw new Error("Failed to get event list");
    }
  };

  const deleteEvent = async (event) => {
    try {
      const response = await axiosPrivate.patch(
        `Doctors/Calendar/deleteEvent`,
        {
          event,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete event");
    }
  };

  return {
    getDoctors,
    addDoctor,
    deleteDoctorProfile,
    updateDoctor,
    getDoctorProfile,
    addEvent,
    getEventList,
    deleteEvent,
    getDoctorListWithSchedule,
    allDoctorAppointmentsQuery,
  };
};

export default useDoctorApi;
