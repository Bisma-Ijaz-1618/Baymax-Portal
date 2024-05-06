import useAxiosPrivate from "../hooks/useAxiosPrivate";
import React from "react";
import { useQuery, QueryClient } from "@tanstack/react-query";
const useDoctorApi = () => {
  const axiosPrivate = useAxiosPrivate();
  const allDoctorsQuery = useQuery({
    queryKey: ["allDoctors"],
    queryFn: async () => {
      const response = await axiosPrivate.get("/Doctors/allDoctors");
      return response.data || [];
    },
    onSuccess: (data) => {
      console.log("here is the data", data);
    },
    onErr: (err) => {
      console.log("here is the data", err);
    },
  });
  return { allDoctorsQuery };
};

export default useDoctorApi;
