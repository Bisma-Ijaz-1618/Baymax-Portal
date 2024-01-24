import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useAppointmentApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAppointments = async () => {
    try {
      const response = await axiosPrivate.get("/appointments/allAppointments");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch appointments");
    }
  };

  const addAppointment = async (appointmentData) => {
    try {
      const response = await axiosPrivate.post(
        "/appointments/newAppointment",
        appointmentData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to add appointment");
    }
  };

  const updateAppointment = async (appointmentData) => {
    try {
      const response = await axiosPrivate.patch(
        `/appointments/updateAppointment/${appointmentData.id}`,
        appointmentData
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to update appointment");
    }
  };

  const deleteAppointment = async ({ id }) => {
    try {
      const response = await axiosPrivate.delete(
        `appointments/deleteAppointment/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete appointment");
    }
  };

  const getAppointmentById = async ({ id }) => {
    try {
      const response = await axiosPrivate.get(`appointments/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get appointment");
    }
  };

  // Additional methods for getting appointments by user ID (doctor or patient) can be added here

  return {
    getAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    getAppointmentById,
  };
};

export default useAppointmentApi;
