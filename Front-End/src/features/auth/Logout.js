import { Button } from "react-bootstrap";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const signOut = async () => {
    await logout();
    navigate("/");
  };
  return (
    <div className="flexGrow">
      <Button onClick={signOut}>Sign Out</Button>
    </div>
  );
};

export default Logout;
