import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const useUserApi = () => {
  const getAllUsers = async () => {
    try {
      console.log("in all users");
      const response = await axiosPrivate.get("/getActiveUsers");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Users");
    }
  };
  const axiosPrivate = useAxiosPrivate();
  const AllUsersQuery = useQuery({
    queryFn: getAllUsers(),
    queryKey: ["AllUsers"],
    onSuccess: () => {
      console.log("All users fetched");
    },
    onError: (err) => {
      console.log("feetch user Error", err);
    },
  });
  const getUser = async ({ id }) => {
    try {
      console.log("id for get single user", id);
      const response = await axiosPrivate.get(`/Users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch Users");
    }
  };
  const deleteUser = async ({ id }) => {
    try {
      console.log("id for delete single user", id);
      const response = await axiosPrivate.delete(`/Users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete Users");
    }
  };

  const addUser = async (userData) => {
    try {
      const response = await axiosPrivate.post("/Users", userData);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add user");
    }
  };
  const updateUser = async (userData) => {
    console.log("id in update user", userData.id);
    try {
      const response = await axiosPrivate.patch(
        `/Users/updateUser/${userData.id}`,
        userData.formData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update User ${error}`);
    }
  };

  // Similar update and delete methods here for Users

  return {
    AllUsersQuery,
    getUser,
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
  };
};

export default useUserApi;
