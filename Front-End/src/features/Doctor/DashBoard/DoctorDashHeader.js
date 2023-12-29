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

function AdminDashHeader() {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <h3>Doctor DASH BOARD HEADER</h3>
        <div className="icons-container">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="bell-dropdown"
              as={CustomDropdownToggle}
            >
              <FontAwesomeIcon icon={faBell} size="lg" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Action 1</Dropdown.Item>
              <Dropdown.Item>Action 2</Dropdown.Item>
              <Dropdown.Item>Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              id="user-dropdown"
              as={CustomDropdownToggle}
            >
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

function CustomDropdownToggle({ children, onClick }) {
  return (
    <div
      className="dropdown-toggle"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  );
}

export default AdminDashHeader;
