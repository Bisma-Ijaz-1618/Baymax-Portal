import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";
const useDoctorProfileApi = () => {
  const queryClient = new QueryClient();
  const axiosPrivate = useAxiosPrivate();
  const getProfilePicture = useQuery({
    queryKey: ["profilePicture"],
    queryFn: async () => {
      try {
        console.log("in get pic");
        const response = await axiosPrivate.get("Doctors/getProfilePicture", {
          responseType: "arraybuffer",
        });
        const imageData = arrayBufferToBase64(response.data);
        const url = `data:image/jpeg;base64,${imageData}`;
        return url;
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        throw error; // Rethrow the error to be handled by react-query
      }
    },
    onSuccess: (data) => {
      console.log("here is the data of getpic", data);
    },
  });
  const GetProfile = useQuery({
    queryKey: ["profileData"],
    queryFn: () => axiosPrivate.get("Doctors/MyProfile"),
    onSuccess: (data) => {
      console.log("here is the dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);
    },
  });
  const uploadProfilePicture = useMutation(
    async (formData) => {
      await axiosPrivate.post("Doctors/updateProfilePicture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profileData", "profilePicture"]);
        queryClient.refetchQueries(["profileData", "profilePicture"]);
      },
    }
  );

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return { GetProfile, uploadProfilePicture, getProfilePicture };
};

export default useDoctorProfileApi;
