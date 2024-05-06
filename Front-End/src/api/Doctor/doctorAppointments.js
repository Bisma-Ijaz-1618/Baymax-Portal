import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
const useDoctorAppointmentsApi = () => {
  const allDoctorAppointmentsQuery = useQuery({
    queryKey: ["doctorAppointments"],
    enabled: true,
    queryFn: async () => {
      const response = await axiosPrivate.get("Doctors/Appointments/allDoctor");

      console.log("IN ALL APPOINTMENTS", response.data);
      return response.data || [];
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
    queryFn: async () => {
      try {
        const acceptedAppointments =
          await allDoctorAppointmentsQuery?.data?.filter(
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
    queryFn: async () => {
      try {
        const requestedAppointments =
          await allDoctorAppointmentsQuery?.data?.filter(
            (appointment) => appointment.status === "requested"
          );
        console.log("here is the data for req", requestedAppointments);
        return requestedAppointments || [];
      } catch (error) {
        console.log("here is the error for req", error);
      }
    },
  });
  const DoctorCompletedAppointmentsQuery = useQuery({
    queryKey: ["CompletedDoctorAppointments"],
    enabled: allDoctorAppointmentsQuery.isSuccess,
    queryFn: async () => {
      try {
        const completedAppointments =
          await allDoctorAppointmentsQuery?.data?.filter(
            (appointment) => appointment.status === "completed"
          );
        console.log("here is the data for comp", completedAppointments);
        return completedAppointments || [];
      } catch (error) {
        console.log("here is the error for comp", error);
      }
    },
  });
  const DoctorRejectedAppointmentsQuery = useQuery({
    queryKey: ["RejectedDoctorAppointments"],
    enabled: allDoctorAppointmentsQuery.isSuccess,
    queryFn: async () => {
      try {
        const rejectedAppointments =
          await allDoctorAppointmentsQuery?.data?.filter(
            (appointment) => appointment.status === "rejected"
          );
        console.log("here is the data for rej", rejectedAppointments);
        return rejectedAppointments || [];
      } catch (error) {
        console.log("here is the error for rej", error);
        return [];
      }
    },
  });

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
  const UpdateAppointmentMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      try {
        const response = await axiosPrivate.put(
          `Doctors/Appointments/update/${id}`,
          formData
        );
        return response.data || [];
      } catch (err) {
        throw new Error("Failed to update event");
      }
    },
  });

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
    UpdateAppointmentMutation,
  };
};

export default useDoctorAppointmentsApi;
