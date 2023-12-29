import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
const DashFooter = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate("/dash");

  let goHomeButton = null;
  if (pathname !== "/dash") {
    goHomeButton = (
      <Button className="" title="Home" onClick={onGoHomeClicked}>
        <FontAwesomeIcon className="white-bg water-color" icon={faHouse} />
      </Button>
    );
  }

  const content = (
    <footer className="dash-footer">
      {goHomeButton}
      <p>Current User:</p>
      <p>Status:</p>
      <p>DASH FOOTER</p>
    </footer>
  );
  return content;
};
export default DashFooter;
