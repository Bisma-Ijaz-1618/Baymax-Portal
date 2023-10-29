import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuthHook";
import { useNavigate, useLocation } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  let isMounted = true;

  const fetchItems = async () => {
    try {
      console.log("token", auth.accessToken);
      console.log("getusers req");
      const response = await axiosPrivate.get("/users/allUsers", {
        signal: controller.signal,
      });
      console.log("after getusers req");
      console.log(response);
      if (response.status !== 200) throw Error("Did not receive expected data");
      const AllUsers = response.data;
      const data = AllUsers.results.results;
      console.log("data::", data);

      setUsers(data);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
      console.log("should go to login now cuzz err", fetchError);
      navigate("/auth/login", { state: { from: location }, replace: true });
    }
  };
  useEffect(() => {
    fetchItems();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const content = (
    <>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {/* Render user information here */}
            <p>Username: {user.username}</p>
            <p>First Name: {user.firstname}</p>
            <p>Last Name: {user.lastname}</p>
            <p>Roles: {user.roles.Admin}</p>
          </li>
        ))}
      </ul>
      <p>{fetchError}</p>
      <p>{isLoading ? "loading" : "not loading"}</p>
    </>
  );
  return content;
};
export default UsersList;
