import React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faUser,
  faEdit,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import Logout from "../../auth/Logout";
function HospitalDashHeader() {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <h3>HOSPITAL DASH BOARD HEADER</h3>
        <Logout />
        <div className="icons-container">
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="bell-dropdown">
              <FontAwesomeIcon icon={faBell} size="lg" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action 1</Dropdown.Item>
              <Dropdown.Item>Action 2</Dropdown.Item>
              <Dropdown.Item>Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="start">
            <Dropdown.Toggle variant="link" id="user-dropdown">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="icon-circle" />
                Edit Account
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faUser} className="icon-circle" />
                Profile
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faCog} className="icon-circle" />
                Settings
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faSignOutAlt} className="icon-circle" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default HospitalDashHeader;
