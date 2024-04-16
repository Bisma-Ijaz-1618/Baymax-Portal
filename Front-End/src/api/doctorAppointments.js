import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery, QueryClient } from "@tanstack/react-query";
const useDoctorAppointmentsApi = () => {
  const queryClient = new QueryClient();

  const allDoctorAppointmentsQuery = useQuery({
    queryKey: ["doctorAppointments"],
    retry: 3,
    queryFn: async () => {
      const response = await axiosPrivate.get("Doctors/Appointments/allDoctor");
      return response.data;
    },
    onSuccess: () => {
      DoctorCompletedAppointmentsQuery.refetch();
      DoctorAcceptedAppointmentsQuery.refetch();
      DoctorRequestedAppointmentsQuery.refetch();
      DoctorRejectedAppointmentsQuery.refetch();
    },
  });

  const DoctorAcceptedAppointmentsQuery = useQuery({
    queryKey: ["AcceptedDoctorAppointments"],
    enabled: allDoctorAppointmentsQuery.isSuccess,
    queryFn: () => {
      try {
        console.log("here is the data for booked");
        const acceptedAppointments = allDoctorAppointmentsQuery.data.filter(
          (appointment) => appointment.status === "accepted"
        );
        console.log("here is the data for booked", acceptedAppointments);
        return acceptedAppointments || [];
      } catch (error) {
        console.log("here is the error for booked", error);
      }
    },
  });

  const DoctorRequestedAppointmentsQuery = useQuery({
    queryKey: ["RequestedDoctorAppointments"],
    enabled: allDoctorAppointmentsQuery.isSuccess,
    queryFn: () => {
      try {
        console.log("here is the data for booked");
        const requestedAppointments = allDoctorAppointmentsQuery.data.filter(
          (appointment) => appointment.status === "requested"
        );
        console.log("here is the data for booked", requestedAppointments);
        return requestedAppointments || [];
      } catch (error) {
        console.log("here is the error for booked", error);
      }
    },
  });
  const DoctorCompletedAppointmentsQuery = useQuery({
    queryKey: ["CompletedDoctorAppointments"],
    enabled: allDoctorAppointmentsQuery.isSuccess,
    queryFn: () => {
      try {
        console.log("here is the data for booked");
        const completedAppointments = allDoctorAppointmentsQuery.data.filter(
          (appointment) => appointment.status === "completed"
        );
        console.log("here is the data for booked", completedAppointments);
        return completedAppointments || [];
      } catch (error) {
        console.log("here is the error for booked", error);
      }
    },
  });
  const DoctorRejectedAppointmentsQuery = useQuery({
    queryKey: ["RejectedDoctorAppointments"],
    enabled: allDoctorAppointmentsQuery.isSuccess,
    queryFn: () => {
      try {
        console.log("here is the data for booked");
        const rejectedAppointments = allDoctorAppointmentsQuery.data.filter(
          (appointment) => appointment.status === "rejected"
        );
        console.log("here is the data for booked", rejectedAppointments);
        return rejectedAppointments || [];
      } catch (error) {
        console.log("here is the error for booked", error);
      }
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
  const axiosPrivate = useAxiosPrivate();
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
    addEvent,
    getEventList,
    deleteEvent,
    getDoctorListWithSchedule,
    allDoctorAppointmentsQuery,
    DoctorAcceptedAppointmentsQuery,
    DoctorCompletedAppointmentsQuery,
    DoctorRejectedAppointmentsQuery,
    DoctorRequestedAppointmentsQuery,
  };
};

export default useDoctorAppointmentsApi;
