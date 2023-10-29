import useAxiosPrivate from "../hooks/useAxiosPrivate";

const useAdminApi = () => {
  const axiosPrivate = useAxiosPrivate();

  const getAdmins = async () => {
    try {
      const response = await axiosPrivate.get("/admins");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch admins");
    }
  };

  const addAdmin = async (adminData) => {
    try {
      const response = await axiosPrivate.post("/admins", adminData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add admin");
    }
  };

  // Similar update and delete methods here for admins

  return { getAdmins, addAdmin };
};

export default useAdminApi;
