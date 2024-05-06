import { Button } from "react-bootstrap";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="flexGrow">
      <Button
        onClick={signOut}
        className="m-0 py-1 px-2 water-bg ms-3 align-items-center justify-content-center"
      >
        SignOut{" "}
      </Button>
    </div>
  );
};

export default Logout;
