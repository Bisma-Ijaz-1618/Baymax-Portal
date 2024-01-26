import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useDoctorApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getDoctors = async () => {
    try {
      const response = await axiosPrivate.get("/Doctors/allDoctors");
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
  const addEvent = async (userId, newEvent) => {
    try {
      console.log("add event doctorID", userId, newEvent);
      const response = await axiosPrivate.post(`Doctors/${userId}/addEvent`, {
        newEvent,
      });
      console.log("RESPONSE TO ADD EVENT ", response.data);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add event");
    }
  };

  const getEventList = async (userId) => {
    try {
      console.log("get event doctorID", userId);
      const response = await axiosPrivate.get(`Doctors/${userId}/getEventList`);
      console.log("event list?", response.data.events);
      return response.data.events;
    } catch (error) {
      throw new Error("Failed to get event list");
    }
  };

  const deleteEvent = async (userId, event) => {
    try {
      const response = await axiosPrivate.patch(
        `Doctors/${userId}/deleteEvent`,
        { event }
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
  };
};

export default useDoctorApi;
