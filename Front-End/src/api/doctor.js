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

  return {
    getDoctors,
    addDoctor,
    deleteDoctorProfile,
    updateDoctor,
    getDoctorProfile,
  };
};

export default useDoctorApi;
