import axios from "../api/axios";
import useAuth from "./useAuthHook";

const useRefreshToken = () => {
  console.log("in use refresh");
  const { auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });

    console.log("generated new access token", auth);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
