import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useAppointmentApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const getPath = () => {
    if (window.location.pathname.includes("patient")) {
      return "Patients";
    } else if (window.location.pathname.includes("doctor")) {
      return "Doctors";
    } else {
      return "nouser";
    }
  };

  const createAppointment = async (appointmentData) => {
    console.log("in appointment api to create sending", appointmentData);
    try {
      const response = await axiosPrivate.post(
        "Patients/Appointment/new",
        appointmentData
      );
      console.log("in appointment api response", response);
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error.message); // Log the error message
      throw new Error("Failed to create appointment");
    }
  };

  const getAppointmentsByUserId = async () => {
    try {
      const response = await axiosPrivate.get("/Appointments/all");
      return response.data;
    } catch (error) {
      throw new Error("Failed to get appointments");
    }
  };

  const getAllAppointments = async (userId) => {
    try {
      const response = await axiosPrivate.get(`/Appointments/all/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get all appointments");
    }
  };

  const getAppointmentsByStatus = async (status) => {
    try {
      const response = await axiosPrivate.get(`/Appointments/status/${status}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to get appointments by status");
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axiosPrivate.delete("/Appointments/delete", {
        data: { id: appointmentId },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete appointment");
    }
  };

  return {
    createAppointment,
    getAppointmentsByUserId,
    getAllAppointments,
    getAppointmentsByStatus,
    deleteAppointment,
  };
};

export default useAppointmentApi;
